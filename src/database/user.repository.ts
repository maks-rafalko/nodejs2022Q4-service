import { User } from '../user/entities/user.entity';
import { storage } from './storage.db';
import { CreateUserDto } from '../user/dto/create-user.dto';

class UserRepository {
  async findAll(): Promise<User[]> {
    return storage.users;
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new User(user.login, user.password);

    storage.users.push(newUser);

    return newUser;
  }

  async remove(id: string): Promise<void> {
    const index = storage.users.findIndex((user: User) => user.id === id);

    if (index !== -1) {
      storage.users.splice(index, 1);
    }
  }
}

export { UserRepository };
