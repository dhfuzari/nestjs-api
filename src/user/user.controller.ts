import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateTotalUserDTO } from './dto/update-total.user.dto';
import { UpdatePartialUserDTO } from './dto/update-partial.user.dto';
import { UserService } from './user.service';

import { Throttle } from '@nestjs/throttler';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { ParamIdDecorator } from '../decorators/param-id.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return await this.userService.create(body);
  }

  @Throttle(100, 60)
  @Roles(Role.Admin, Role.User)
  @Get()
  async read() {
    return await this.userService.read();
  }

  @Throttle(100, 60)
  @Get(':id')
  async readOne(@ParamIdDecorator() id: number) {
    return await this.userService.readById(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async updateTotal(
    @ParamIdDecorator() id: number,
    @Body() body: UpdateTotalUserDTO,
  ) {
    return await this.userService.updateTotal(id, body);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async updatePartial(
    @ParamIdDecorator() id: number,
    @Body() body: UpdatePartialUserDTO,
  ) {
    return await this.userService.updatePartial(id, body);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@ParamIdDecorator() id: number) {
    return { success: await this.userService.delete(id) };
  }
}
