import EmailInput from '../components/EmailInput';
import { Button } from 'primereact/button';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { BASE_URL, EmailValidationRegex, ErrorMessages } from '../utils/constants';
import PasswordWithConfirmInputs from '../components/PasswordWithConfirmInputs';
import { InputText } from 'primereact/inputtext';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { SignUpFormData } from '../utils/types';

export default function SignUp() {
    const auth = useAuth();
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const {
        register,
        control,
        handleSubmit,
        watch,
        trigger,
        formState: { errors, dirtyFields },
    } = useForm<SignUpFormData>({ defaultValues: { name: '', email: '', password: '', confirmPassword: '' } });



    const submitAction = useCallback(async (data: SignUpFormData) => {
        if (isLoading) return;
        setLoading(true)
        setError('')
        try {
            const response = await axios.post(`${BASE_URL}/auth/signup`, data)
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
        <article className="signup-page">
            <img src='/assets/auth.png' />
            <form onSubmit={handleSubmit(submitAction)}>
                <EmailInput label='email' inputKey='email' errors={errors} register={register('email', {
                    required: ErrorMessages.EMAIL_IS_REQUIRED,
                    pattern: {
                        value: EmailValidationRegex,
                        message: ErrorMessages.INVALID_EMAIL,
                    },
                })} />
                <div className="form-control" >

                    <span className="p-float-label">
                        <InputText
                            dir="auto"
                            id={'name'}
                            {...register('name', {
                                required: ErrorMessages.NAME_IS_REQUIRED,
                                minLength: 3
                            })}
                        />

                        <label htmlFor={'name'}>name</label>
                    </span>
                    <span className={`error-msg ${errors.name ? 'visible' : 'hidden'}`}>
                        {errors.name?.message?.toString()}
                    </span>
                </div>

                <PasswordWithConfirmInputs<SignUpFormData>
                    trigger={trigger}
                    watch={watch}
                    control={control}
                    errors={errors}
                    dirtyFields={dirtyFields}
                    passwordInputKey={'password'} 
                    confirmPasswordInputKey={'confirmPassword'} />

                <span className={`error-msg global ${error ? 'visible' : 'hidden'}`}>
                    {error?.toString()}
                </span>
                <div className="btn-container" >
                    <Button loading={isLoading} disabled={isLoading}>
                        Sign Up
                    </Button>
                </div>
            </form>
            <p className='navigation-container'>
                already have account? <Link to={'/signin'}>sign in</Link>
            </p>

        </article>)
}
