import { Artist } from '../artist/entities/artist.entity';
import { User } from '../user/entities/user.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Fav } from '../favs/entities/fav.entity';

interface Storage {
  users: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  favs: Fav;
}

const storage: Storage = {
  users: [],
  artists: [],
  albums: [],
  tracks: [],
  favs: new Fav(),
};

export { storage };
