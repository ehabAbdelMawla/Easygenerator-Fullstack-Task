import { InputText } from 'primereact/inputtext'
import React from 'react'
import { FieldValues } from 'react-hook-form'
import { EmailInputProps } from 'utils/types'

export default function EmailInput<T extends FieldValues>({ register, errors, label, inputKey }: EmailInputProps<T>) {
    return (
        <div className="form-control" >
            <span className="p-float-label">
                <InputText
                    dir="auto"
                    id={String(inputKey)}
                    {...register}
                />
                <label htmlFor={String(inputKey)}>{label}</label>
            </span>
            <span className={`error-msg ${errors[inputKey] ? 'visible' : 'hidden'}`}>
                {errors[inputKey]?.message?.toString()}
            </span>
        </div>
    )
}
