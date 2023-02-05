import { storage } from './storage.db';
import { Fav } from '../favs/entities/fav.entity';
import { Track } from '../track/entities/track.entity';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';

class FavRepository {
  async getFavorites(): Promise<Fav> {
    return storage.favs;
  }

  async addTrack(track: Track) {
    storage.favs.tracks.push(track.id);
  }

  async addAlbum(album: Album) {
    storage.favs.albums.push(album.id);
  }

  async addArtist(artist: Artist) {
    storage.favs.artists.push(artist.id);
  }
}

export { FavRepository };
