import { UseFormRegisterReturn, FieldErrors, Control, UseFormWatch, UseFormTrigger, RegisterOptions, FieldValues, Path } from "react-hook-form";

interface BaseInputProps<T extends FieldValues> {
    label: string;
    inputKey: Path<T>;
    errors: FieldErrors<T>;
}

export interface EmailInputProps<T extends FieldValues> extends BaseInputProps<T> {
    register: UseFormRegisterReturn;
}


export interface PasswordInputProps<T extends FieldValues> extends BaseInputProps<T> {
    control: Control<T>;
    rules: RegisterOptions<T>;
}

export interface PasswordWithConfirmInputsProps<T extends FieldValues> {
    errors: FieldErrors<T>;
    control: Control<T>;
    watch: UseFormWatch<T>;
    trigger: UseFormTrigger<T>;
    dirtyFields: Partial<{ [key: string]: boolean }>
    passwordInputKey: Path<T>;
    confirmPasswordInputKey: Path<T>
}



export interface SignInFormData {
    email: string;
    password: string
}


export interface SignUpFormData extends SignInFormData {
    name: string;
    confirmPassword: string
}