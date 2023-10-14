import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateTotalUserDTO } from './dto/update-total.user.dto';
import { UpdatePartialUserDTO } from './dto/update-partial.user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async userExists(id: number) {
    if (
      !(await this.userRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`User ${id} does not exists`);
    }
  }

  async create(data: CreateUserDTO) {
    if (
      await this.userRepository.exist({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new BadRequestException('Este e-mail já está sendo utilizado');
    }

    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    const user = await this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  async read() {
    const users = await this.userRepository.find();

    return users;
  }

  async readById(id: number) {
    await this.userExists(id);

    return await this.userRepository.findOneBy({ id });
  }

  async updateTotal(
    id: number,
    { email, name, password, birthdate, role }: UpdateTotalUserDTO,
  ) {
    await this.userExists(id);

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    await this.userRepository.update(id, {
      email,
      name,
      password,
      birthdate,
      role,
    });

    return this.readById(id);
  }

  async updatePartial(
    id: number,
    { email, name, password, birthdate, role }: UpdatePartialUserDTO,
  ) {
    await this.userExists(id);

    const data: any = {};

    if (birthdate) {
      data.birthdate = new Date(birthdate);
    }

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);

      data.password = password;
    }

    if (role) {
      data.role = role;
    }

    await this.userRepository.update(id, data);

    return this.readById(id);
  }

  async delete(id: number) {
    await this.userExists(id);
    await this.userRepository.delete(id);

    return true;
  }
}
