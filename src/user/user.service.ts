import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTotalUserDTO } from './dto/update-total.user.dto';
import { UpdatePartialUserDTO } from './dto/update-partial.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async userExists(id) {
    if (
      !(await this.prismaService.users.count({
        where: { id },
      }))
    ) {
      throw new NotFoundException(`User ${id} does not exists`);
    }
  }

  async create(data: CreateUserDTO) {
    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    return await this.prismaService.users.create({ data });
  }

  async read() {
    return await this.prismaService.users.findMany();
  }

  async readById(id: number) {
    await this.userExists(id);

    return await this.prismaService.users.findUnique({ where: { id } });
  }

  async updateTotal(
    id: number,
    { email, name, password, birthdate, role }: UpdateTotalUserDTO,
  ) {
    await this.userExists(id);

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    return this.prismaService.users.update({
      where: { id },
      data: { email, name, password, birthdate, role },
    });
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

    return this.prismaService.users.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.userExists(id);

    return this.prismaService.users.delete({ where: { id } });
  }
}
