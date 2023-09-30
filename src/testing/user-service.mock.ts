import { UserService } from '../user/user.service';
import { userEntityList } from './user-entity-list.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    userExists: jest.fn().mockResolvedValue(true),
    create: jest.fn().mockResolvedValue(userEntityList[0]),
    read: jest.fn().mockResolvedValue(userEntityList),
    readById: jest.fn().mockResolvedValue(userEntityList[0]),
    updateTotal: jest.fn().mockResolvedValue(userEntityList[0]),
    updatePartial: jest.fn().mockResolvedValue(userEntityList[0]),
    delete: jest.fn().mockResolvedValue(true),
  },
};
