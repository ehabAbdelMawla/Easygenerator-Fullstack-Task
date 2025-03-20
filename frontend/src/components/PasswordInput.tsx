import React from 'react'
import { PasswordInputProps } from '../utils/types'
import { Controller, FieldValues } from 'react-hook-form'
import { Password } from 'primereact/password'


export default function PasswordInput<T extends FieldValues>({ control, errors, label, inputKey, rules }: PasswordInputProps<T>) {
    return (
        <div className="form-control" >
            <span className="p-float-label">
                <Controller
                    name={inputKey}
                    control={control}
                    rules={rules}
                    render={({ field }) => (
                        <Password
                            inputId={field.name}
                            {...field}
                            minLength={8}
                            toggleMask
                            feedback={false}
                        />
                    )}
                />
                <label htmlFor={String(inputKey)}>{label}</label>
            </span>
            <span className={`error-msg ${errors[inputKey] ? "visible" : "hidden"}`}>
                {errors[inputKey]?.message?.toString()}
            </span>
        </div>
    );
}