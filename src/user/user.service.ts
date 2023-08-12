import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTotalUserDTO } from './dto/update-total.user.dto';
import { UpdatePartialUserDTO } from './dto/update-partial.user.dto';

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
    return await this.prismaService.users.create({ data });
  }

  async read() {
    return await this.prismaService.users.findMany();
  }

  async readById(id: number) {
    await this.userExists(id);

    return await this.prismaService.users.findUnique({ where: { id } });
  }

  async updateTotal(id: number, data: UpdateTotalUserDTO) {
    await this.userExists(id);

    return this.prismaService.users.update({
      where: { id },
      data: { ...data },
    });
  }

  async updatePartial(id: number, data: UpdatePartialUserDTO) {
    await this.userExists(id);

    return this.prismaService.users.update({
      where: { id },
      data: { ...data },
    });
  }

  async delete(id: number) {
    await this.userExists(id);

    return this.prismaService.users.delete({ where: { id } });
  }
}
