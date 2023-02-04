import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode, Put, ParseUUIDPipe
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { StatusCodes } from 'http-status-codes';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return await this.userService.findOne(uuid);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param('uuid', ParseUUIDPipe) uuid: string,) {
    return this.userService.remove(uuid);
  }
}
