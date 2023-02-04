import { Artist } from '../artist/entities/artist.entity';
import { User } from '../user/entities/user.entity';

interface Storage {
  users: User[];
  artists: Artist[];
}

const storage = {
  users: [new User('admin', 'admin')],
  artists: [],
};

export { storage, Storage };
