import { ForbiddenException, Injectable } from '@nestjs/common';
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
    return await this.usersRepository.findOne(uuid);
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersRepository.findOne(uuid);

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
    return await this.usersRepository.remove(uuid);
  }
}
