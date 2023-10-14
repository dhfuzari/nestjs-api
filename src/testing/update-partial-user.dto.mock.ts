import { Role } from '../enums/role.enum';
import { UpdatePartialUserDTO } from '../user/dto/update-partial.user.dto';

export const updatePartialUserDtoMock: UpdatePartialUserDTO = {
  birthdate: new Date('2000-01-01'),
  email: 'jhon.doe@yahoo.com',
  name: 'Jhon Doe',
  password: '123456',
  role: Role.User,
};
