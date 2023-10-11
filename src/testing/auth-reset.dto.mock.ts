import { AuthResetDTO } from '../auth/dto/auth-reset.dto';
import { resetToken } from './reset-token.mock';

export const authResetDTOMock: AuthResetDTO = {
  password: '123456',
  token: resetToken,
};
