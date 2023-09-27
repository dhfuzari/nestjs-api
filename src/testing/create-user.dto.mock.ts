import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create.user.dto';

export const createUserDtoMock: CreateUserDTO = {
  birthdate: new Date('2000-01-01'),
  email: 'jhon.doe@icloud.com',
  name: 'Jhon Doe',
  password: '123456',
  role: Role.User,
};
