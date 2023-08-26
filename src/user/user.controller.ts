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
import { ParamIdDecorator } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Throttle } from '@nestjs/throttler';

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
    return await this.userService.delete(id);
  }
}
