import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTotalUserDTO } from './dto/update-total.user.dto';
import { UpdatePartialUserDTO } from './dto/update-partial.user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password }: CreateUserDTO) {
    return await this.prisma.users.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  async read() {
    return await this.prisma.users.findMany();
  }

  async readById(id: number) {
    return await this.prisma.users.findUnique({ where: { id } });
  }

  async updateTotal(id: number, data: UpdateTotalUserDTO) {
    return this.prisma.users.update({ where: { id }, data: { ...data } });
  }

  async updatePartial(id: number, data: UpdatePartialUserDTO) {
    return this.prisma.users.update({ where: { id }, data: { ...data } });
  }
}
