import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';

import { Button } from 'primereact/button';
import EmailInput from '../components/EmailInput';
import { BASE_URL, EmailValidationRegex, ErrorMessages } from '../utils/constants';
import PasswordInput from '../components/PasswordInput';
import axios, { AxiosError } from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { SignInFormData } from '../utils/types';

export default function SignIn() {
    const navigate = useNavigate()
    const auth = useAuth();
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({ defaultValues: { email: '', password: '' } });



    const submitAction = useCallback(async (data: SignInFormData) => {
        if (isLoading) return;
        setLoading(true)
        setError('')
        try {
            const response = await axios.post(`${BASE_URL}/auth/signin`, data)
            navigate('/home')
            auth?.login(response.data)
        } catch (error: any) {
            console.log({ error })
            if (error instanceof AxiosError) {
                setError(error.message)
            } else {
                setError('An unexpected error occurred!')
            }

        } finally {
            setLoading(false)
        }
    }, [isLoading, error]);

    return (
        <article className="signin-page">
            <img src='/assets/auth.png' />
            <form onSubmit={handleSubmit(submitAction)}>
                <EmailInput<SignInFormData> label='email' inputKey='email' errors={errors} register={register('email', {
                    required: ErrorMessages.EMAIL_IS_REQUIRED,
                    pattern: {
                        value: EmailValidationRegex,
                        message: ErrorMessages.INVALID_EMAIL,
                    },
                })} />

                <PasswordInput<SignInFormData> errors={errors} control={control} label='password' inputKey='password' rules={{ required: "Password is required." }
                } />

                <span className={`error-msg global ${error ? 'visible' : 'hidden'}`}>
                    {error?.toString()}
                </span>
                <div className="btn-container" >
                    <Button loading={isLoading} disabled={isLoading}>
                        Sign In
                    </Button>
                </div>
            </form>
            <p className='navigation-container'>
                don't have account? <Link to={'/signup'}>sign up</Link>
            </p>
        </article>
    );

}