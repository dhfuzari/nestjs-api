import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    email: 'jhon.doe@icloud.com',
    name: 'Jhon Doe',
    birthdate: new Date('2000-01-01'),
    id: 1,
    password: '---',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'jhon.doe2@icloud.com',
    name: 'Jhon Doe 2',
    birthdate: new Date('2000-01-01'),
    id: 2,
    password: '---',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'jhon.doe3@icloud.com',
    name: 'Jhon Doe 3',
    birthdate: new Date('2000-01-01'),
    id: 3,
    password: '---',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
