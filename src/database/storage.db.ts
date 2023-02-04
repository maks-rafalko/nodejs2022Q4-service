import { Artist } from '../artist/entities/artist.entity';
import { User } from '../user/entities/user.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';

interface Storage {
  users: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

const storage = {
  users: [],
  artists: [],
  albums: [],
  tracks: [],
};

export { storage, Storage };
