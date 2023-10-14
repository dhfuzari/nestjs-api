import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

import { userRepositoryMock } from '../testing/user-repository.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { createUserDtoMock } from '../testing/create-user.dto.mock';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updateTotalUserDtoMock } from '../testing/update-total-user.dto.mock';
import { updatePartialUserDtoMock } from '../testing/update-partial-user.dto.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    it('create user', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);
      const result = await userService.create(createUserDtoMock);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    it('list all users', async () => {
      const result = await userService.read();
      expect(result).toEqual(userEntityList);
    });

    it('get user by id', async () => {
      const result = await userService.readById(1);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update user', () => {
    it('update total', async () => {
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValueOnce(updateTotalUserDtoMock);
      const result = await userService.updateTotal(1, updateTotalUserDtoMock);
      expect(result).toEqual(updateTotalUserDtoMock);
    });

    it('update partial', async () => {
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValueOnce(updatePartialUserDtoMock);
      const result = await userService.updatePartial(1, {
        email: 'jhon.doe@yahoo.com',
      });
      expect(result).toEqual(updatePartialUserDtoMock);
    });
  });

  describe('Delete', () => {
    it('delete user', async () => {
      const result = await userService.delete(1);

      expect(result).toEqual(true);
    });
  });
});
