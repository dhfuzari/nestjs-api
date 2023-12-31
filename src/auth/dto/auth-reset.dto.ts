import { IsJWT, IsStrongPassword } from 'class-validator';

export class AuthResetDTO {
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  password: string;

  @IsJWT()
  token: string;
}
