import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from '../database/user.repository';
import { UserService } from './user.service';

@Injectable()
export class UserByIdPipe implements PipeTransform<string, Promise<User>> {
  constructor(private readonly userService: UserService) {}

  async transform(uuid: string): Promise<User> {
    const existingUser = await this.userService.findOne(uuid);

    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    return existingUser;
  }
}
