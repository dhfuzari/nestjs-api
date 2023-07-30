import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return await { ...body };
  }

  @Get()
  async read() {
    return await { users: [] };
  }

  @Get(':id')
  async readOne(@Param() param) {
    return await { user: { ...param } };
  }

  @Put(':id')
  async update(@Param() param, @Body() body) {
    return {
      method: 'PUT',
      body,
      param,
    };
  }

  @Patch(':id')
  async updatePartial(@Param() param, @Body() body) {
    return {
      method: 'PATCH',
      body,
      param,
    };
  }

  @Delete(':id')
  async delete(@Param() param) {
    return {
      ...param,
    };
  }
}
