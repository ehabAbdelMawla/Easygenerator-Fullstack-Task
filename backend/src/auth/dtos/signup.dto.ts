import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from "class-validator";
import { MINIMUM_USER_NAME_LENGHT, MINIMUM_USER_PASSWORD_LENGHT } from "src/common/constants";

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MINIMUM_USER_NAME_LENGHT)
  @ApiProperty({ example: 'user name', description: 'User Name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MINIMUM_USER_PASSWORD_LENGHT)
  @ApiProperty({ example: 'StrongPassword123!', description: 'User password' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, {
    message:
      'Password must contain at least one letter, one number, and one special character.',
  })
  password: string;
}