import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { mailerServiceMock } from '../testing/mailer-service.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { accessToken } from '../testing/access-token.mock';
import { jwtPayload } from '../testing/jwt-payload.mock';
import { resetToken } from '../testing/reset-token.mock';
import { AuthRegisterDTOMock } from '../testing/auth-register.dto.mock';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('AuthService tokens', () => {
    it('should create token', async () => {
      const result = await authService.createToken(userEntityList[0]);
      expect(result).toEqual({
        accessToken,
      });
    });

    it('should check token', async () => {
      const result = await authService.checkToken(accessToken);
      expect(result).toEqual(jwtPayload);
    });

    it('should verify if token is valid', async () => {
      const result = await authService.isValidtoken(accessToken);
      expect(result).toEqual(true);
    });
  });

  describe('AuthService authentication', () => {
    it('should login user', async () => {
      const bcryptCompare = jest.fn().mockResolvedValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      const result = await authService.login('jhon.doe@icloud.com', '123456');
      expect(result).toEqual({ accessToken });
    });

    it('should send an email to user', async () => {
      const result = await authService.forget('jhon.doe@icloud.com');
      expect(result).toEqual({ success: true });
    });

    it('should reset password', async () => {
      const result = await authService.reset('123456', resetToken);
      expect(result).toEqual({ accessToken });
    });

    it('should register new user', async () => {
      const result = await authService.register(AuthRegisterDTOMock);
      expect(result).toEqual({ accessToken });
    });
  });
});
