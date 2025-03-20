import { LoginDto } from "../dtos/login.dto";
import { SignupDto } from "../dtos/signup.dto";
import { AuthResponse } from "../types/auth.response";

export interface AuthServiceInterface {
    signUp(signupDto: SignupDto): Promise<AuthResponse>;
    signIn(loginDto: LoginDto): Promise<AuthResponse>;
}