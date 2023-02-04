import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from '../database/user.repository';

@Injectable()
export class UserByIdPipe implements PipeTransform<string, Promise<User>> {
  constructor(private readonly userRepository: UserRepository) {}

  async transform(uuid: string): Promise<User> {
    const existingUser = await this.userRepository.findOne(uuid);

    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    return existingUser;
  }
}
