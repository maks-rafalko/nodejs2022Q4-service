import { User } from '../user/entities/user.entity';
import { storage } from './storage.db';

class UserRepository {
  async findOne(id: string): Promise<User | undefined> {
    return storage.users.find((user: User) => user.id === id);
  }

  async findAll(): Promise<User[]> {
    return storage.users;
  }

  async update(id: string, user: User): Promise<void> {
    const index = storage.users.findIndex((user: User) => user.id === id);

    if (index !== -1) {
      storage.users[index] = user;
    }
  }

  async remove(id: string): Promise<void> {
    const index = storage.users.findIndex((user: User) => user.id === id);

    if (index !== -1) {
      storage.users.splice(index, 1);
    }
  }
}

export { UserRepository };
