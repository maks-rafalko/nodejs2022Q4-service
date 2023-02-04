import { Artist } from '../artist/entities/artist.entity';
import { User } from '../user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

interface Storage {
  users: User[];
  artists: Artist[];
}

const storage = {
  users: [new User('admin', 'admin')],
  artists: [],
};

export { storage, Storage };
