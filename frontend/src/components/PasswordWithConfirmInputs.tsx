
import React, { useEffect } from 'react'
import { ErrorMessages, PasswordValidationRegex } from '../utils/constants';
import PasswordInput from './PasswordInput';
import { PasswordWithConfirmInputsProps } from '../utils/types';
import { FieldValues } from 'react-hook-form';

export default function PasswordWithConfirmInputs<T extends FieldValues>({ trigger, watch, dirtyFields, control, errors, passwordInputKey, confirmPasswordInputKey }: PasswordWithConfirmInputsProps<T>) {
    useEffect(() => {
        dirtyFields[confirmPasswordInputKey] && trigger(confirmPasswordInputKey);
    }, [watch(passwordInputKey)]);

    return (
        <>
            <PasswordInput<T>
                label="Password"
                inputKey={passwordInputKey}
                control={control}
                errors={errors}
                rules={{
                    required: ErrorMessages.PASSWORD_IS_REQUIRED, pattern: {
                        value: PasswordValidationRegex,
                        message: ErrorMessages.PASSWORD_HINT
                    }
                }
                }
            />
            < PasswordInput<T>
                label="Confirm Password"
                inputKey={confirmPasswordInputKey}
                control={control}
                errors={errors}
                rules={{
                    required: ErrorMessages.CONFIRM_PASSWORD_IS_REQUIRED,
                    validate: (value: string) => value === watch(passwordInputKey) || ErrorMessages.PASSWORDS_DOES_NOT_MATCH
                }}
            />
        </>
    );
}
