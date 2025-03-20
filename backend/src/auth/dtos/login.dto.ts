import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({ example: 'user@example.com', description: 'User email address' })
	email: string;


	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'StrongPassword123!', description: 'User password' })

	password: string;
}