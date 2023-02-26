import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';

const HASH_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hash(createUserDto.password, HASH_ROUNDS);

    return this.usersRepository.save(
      new User(createUserDto.login, hashedPassword),
    );
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(uuid: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id: uuid });
  }

  async findOneByLogin(login: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ login: login });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersRepository.findOneBy({ id: uuid });

    const passwordsMatch = await compare(
      updateUserDto.oldPassword,
      existingUser.password,
    );

    if (!passwordsMatch) {
      throw new ForbiddenException('Old password is incorrect');
    }

    existingUser.password = await hash(updateUserDto.newPassword, HASH_ROUNDS);
    existingUser.version = existingUser.version + 1;

    await this.usersRepository.save(existingUser);

    return existingUser;
  }

  async remove(user: User) {
    return await this.usersRepository.remove(user);
  }
}
