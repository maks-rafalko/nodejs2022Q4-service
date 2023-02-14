import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(new User(createUserDto.login, createUserDto.password));
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(uuid: string): Promise<User> {
    return await this.usersRepository.findOneBy({id: uuid});
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersRepository.findOneBy({id: uuid});

    if (updateUserDto.oldPassword !== existingUser.password) {
      throw new ForbiddenException('Old password is incorrect');
    }

    existingUser.password = updateUserDto.newPassword;
    existingUser.version = existingUser.version + 1;

    // todo change to save in all places
    await this.usersRepository.save(existingUser);

    return existingUser;
  }

  async remove(user: User) {
    return await this.usersRepository.remove(user);
  }
}
