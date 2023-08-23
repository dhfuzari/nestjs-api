import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  password: string;
}
