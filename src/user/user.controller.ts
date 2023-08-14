import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateTotalUserDTO } from './dto/update-total.user.dto';
import { UpdatePartialUserDTO } from './dto/update-partial.user.dto';
import { UserService } from './user.service';
import { ParamIdDecorator } from 'src/decorators/param-id.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    return await this.userService.create(body);
  }

  @Get()
  async read() {
    return await this.userService.read();
  }

  @Get(':id')
  async readOne(@ParamIdDecorator() id: number) {
    return await this.userService.readById(id);
  }

  @Put(':id')
  async updateTotal(
    @ParamIdDecorator() id: number,
    @Body() body: UpdateTotalUserDTO,
  ) {
    return await this.userService.updateTotal(id, body);
  }

  @Patch(':id')
  async updatePartial(
    @ParamIdDecorator() id: number,
    @Body() body: UpdatePartialUserDTO,
  ) {
    return await this.userService.updatePartial(id, body);
  }

  @Delete(':id')
  async delete(@ParamIdDecorator() id: number) {
    return await this.userService.delete(id);
  }
}
