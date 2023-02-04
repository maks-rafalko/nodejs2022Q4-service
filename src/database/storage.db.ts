import { Artist } from '../artist/entities/artist.entity';
import { User } from '../user/entities/user.entity';
import { Album } from '../album/entities/album.entity';

interface Storage {
  users: User[];
  artists: Artist[];
  albums: Album[];
}

const storage = {
  users: [],
  artists: [],
  albums: [],
};

export { storage, Storage };
