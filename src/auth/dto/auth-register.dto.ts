import { IsDateString, IsOptional, IsString } from 'class-validator';
import { AuthLoginDTO } from './auth-login.dto';

export class AuthRegisterDTO extends AuthLoginDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  birthdate: string;
}
