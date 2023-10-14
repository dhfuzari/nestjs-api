import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { AuthLoginDTO } from './auth-login.dto';
import { Role } from '../../enums/role.enum';

export class AuthRegisterDTO extends AuthLoginDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @IsOptional()
  @IsEnum(Role)
  role?: number;
}
