export const BASE_URL = 'http://localhost:5555'

export const EmailValidationRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

export const PasswordValidationRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/

export const ErrorMessages = {
    EMAIL_IS_REQUIRED: 'Email is required',
    INVALID_EMAIL: 'Invalid email address',
    PASSWORD_IS_REQUIRED: 'Password is required',
    CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
    PASSWORD_HINT: 'Password should have at least one letter,number and special character',
    PASSWORDS_DOES_NOT_MATCH: 'Passwords does not match',
    NAME_IS_REQUIRED:'Name is required.'
}