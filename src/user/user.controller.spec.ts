import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../testing/user-service.mock';
import { AuthGuard } from '../guards/auth.guard';
import { authGuardMock } from '../testing/auth-guard.mock';
import { RoleGuard } from '../guards/role.guard';
import { UserService } from './user.service';
import { createUserDtoMock } from '../testing/create-user.dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { updatePartialUserDtoMock } from '../testing/update-partial-user.dto.mock';
import { updateTotalUserDtoMock } from '../testing/update-total-user.dto.mock';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RoleGuard)
      .useValue(authGuardMock)
      .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('User controller methods', () => {
    it('create method', async () => {
      const result = await controller.create(createUserDtoMock);
      expect(result).toEqual(userEntityList[0]);
    });

    it('read all method', async () => {
      const result = await controller.read();
      expect(result).toEqual(userEntityList);
    });

    it('read by id method', async () => {
      const result = await controller.readOne(1);
      expect(result).toEqual(userEntityList[0]);
    });

    it('update partial method', async () => {
      const result = await controller.updatePartial(
        1,
        updatePartialUserDtoMock,
      );
      expect(result).toEqual(userEntityList[0]);
    });

    it('update total method', async () => {
      const result = await controller.updateTotal(1, updateTotalUserDtoMock);
      expect(result).toEqual(userEntityList[0]);
    });

    it('delete method', async () => {
      const result = await controller.delete(1);
      expect(result).toEqual({ success: true });
    });
  });

  describe('User controller guards', () => {
    it('should have guards applieds', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);
      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });
});
