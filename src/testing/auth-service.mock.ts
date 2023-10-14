import { AuthService } from '../auth/auth.service';
import { accessToken } from './access-token.mock';
import { jwtPayload } from './jwt-payload.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockReturnValue({ accessToken: accessToken }),
    checkToken: jest.fn().mockReturnValue(jwtPayload),
    isValidtoken: jest.fn().mockReturnValue(true),
    login: jest.fn().mockResolvedValue({ accessToken: accessToken }),
    forget: jest.fn().mockResolvedValue({ success: true }),
    reset: jest.fn().mockResolvedValue({ accessToken: accessToken }),
    register: jest.fn().mockResolvedValue({ accessToken: accessToken }),
  },
};
