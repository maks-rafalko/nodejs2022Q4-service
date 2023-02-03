import { Artist } from '../artist/entities/artist.entity';
import { User } from '../user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

interface Storage {
  users: User[];
  artists: Artist[];
}

const storage = {
  users: [
    {
      id: uuidv4(),
      login: 'admin!',
      password: 'admin',
      version: 1,
      createdAt: 1610000000000,
      updatedAt: 1610000000000,
    },
  ],
  artists: [
    {
      id: uuidv4(),
      name: 'The Beatles !!',
      grammy: true,
    },
  ],
};

export { storage, Storage };
