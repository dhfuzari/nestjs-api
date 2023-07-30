import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateTotalUserDTO } from './dto/update-total.user.dto';
import { UpdatePartialUserDTO } from './dto/update-partial.user.dto';

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
  async update(@Param() param, @Body() body: UpdateTotalUserDTO) {
    return {
      method: 'PUT',
      body,
      param,
    };
  }

  @Patch(':id')
  async updatePartial(@Param() param, @Body() body: UpdatePartialUserDTO) {
    return {
      method: 'PATCH',
      body,
      param,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
    };
  }
}
