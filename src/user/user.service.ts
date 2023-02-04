import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '../database/user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(uuid: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne(uuid);

    if (!existingUser) {
      throw new NotFoundException(`User with id ${uuid} not found`);
    }

    return existingUser;
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersRepository.findOne(uuid);

    if (!existingUser) {
      throw new NotFoundException(`User with id ${uuid} not found`);
    }

    if (updateUserDto.oldPassword !== existingUser.password) {
      throw new ForbiddenException('Old password is incorrect');
    }

    existingUser.password = updateUserDto.newPassword;
    existingUser.version = existingUser.version + 1;
    existingUser.updatedAt = Date.now();

    await this.usersRepository.update(uuid, existingUser);

    return existingUser;
  }

  async remove(uuid: string) {
    // todo move to controller as param converter
    const existingUser = await this.usersRepository.findOne(uuid);

    if (!existingUser) {
      throw new NotFoundException(`User with id ${uuid} not found`);
    }

    return await this.usersRepository.remove(uuid);
  }
}
