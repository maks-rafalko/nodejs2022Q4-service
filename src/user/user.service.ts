import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '../database/user.repository';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersRepository.findOne(id);

    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateUserDto.oldPassword !== existingUser.password) {
      throw new ForbiddenException('Old password is incorrect');
    }

    existingUser.password = updateUserDto.newPassword;
    existingUser.version = existingUser.version + 1;
    existingUser.updatedAt = Date.now();

    await this.usersRepository.update(id, existingUser);

    return existingUser;
  }

  async remove(id: string) {
    return await this.usersRepository.remove(id);
  }
}
