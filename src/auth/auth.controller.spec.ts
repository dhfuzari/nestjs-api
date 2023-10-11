import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../guards/auth.guard';
import { authGuardMock } from '../testing/auth-guard.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { AuthService } from './auth.service';
import { FileService } from '../file/file.service';
import { authServiceMock } from '../testing/auth-service.mock';
import { fileServiceMock } from '../testing/file-service.mock';
import { AuthController } from './auth.controller';
import { authLoginDTOMock } from '../testing/auth-login.dto.mock';
import { accessToken } from '../testing/access-token.mock';
import { AuthRegisterDTOMock } from '../testing/auth-register.dto.mock';
import { authForgetDTOMock } from '../testing/auth-forget.dto.mock';
import { authResetDTOMock } from '../testing/auth-reset.dto.mock';
import { getPhotoMock } from '../testing/get-photo.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    fileService = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
    expect(fileService).toBeDefined();
  });

  describe('Auth controller methods', () => {
    it('login method', async () => {
      const result = await controller.login(authLoginDTOMock);
      expect(result).toEqual({ accessToken: accessToken });
    });

    it('register method', async () => {
      const result = await controller.register(AuthRegisterDTOMock);
      expect(result).toEqual({ accessToken: accessToken });
    });

    it('forget method', async () => {
      const result = await controller.forget(authForgetDTOMock);
      expect(result).toEqual({ success: true });
    });

    it('reset method', async () => {
      const result = await controller.reset(authResetDTOMock);
      expect(result).toEqual({ accessToken: accessToken });
    });

    it('me method', async () => {
      const result = await controller.me(userEntityList[0]);
      expect(result).toEqual(userEntityList[0]);
    });

    it('uploadPhoto method', async () => {
      const photo = await getPhotoMock();
      const result = await controller.uploadPhoto(userEntityList[0], photo);
      expect(result).toEqual(photo);
    });
  });
});
