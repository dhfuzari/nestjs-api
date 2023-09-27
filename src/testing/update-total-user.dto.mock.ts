import { Role } from '../enums/role.enum';
import { UpdateTotalUserDTO } from '../user/dto/update-total.user.dto';

export const updateTotalUserDtoMock: UpdateTotalUserDTO = {
  birthdate: new Date('2000-10-10'),
  email: 'jhon.doe@yahoo.com',
  name: 'Jhon Doe',
  password: '1234567',
  role: Role.User,
};
