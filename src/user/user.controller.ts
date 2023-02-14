import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { StatusCodes } from 'http-status-codes';
import { UserByIdPipe } from './user-by-id.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid', ParseUUIDPipe, UserByIdPipe) user: User): Promise<User> {
    return user;
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe, UserByIdPipe) user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(user.id, updateUserDto);
  }

  @Delete(':uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('uuid', ParseUUIDPipe, UserByIdPipe) user: User) {
    return await this.userService.remove(user);
  }
}
