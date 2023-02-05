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

  async removeTrack(removedTrack: Track) {
    const index = storage.favs.tracks.findIndex(
      (uuid: string) => uuid === removedTrack.id,
    );

    if (index !== -1) {
      storage.favs.tracks.splice(index, 1);
    }
  }

  async addAlbum(album: Album) {
    storage.favs.albums.push(album.id);
  }

  async removeAlbum(removedAlbum: Album) {
    const index = storage.favs.albums.findIndex(
      (uuid: string) => uuid === removedAlbum.id,
    );

    if (index !== -1) {
      storage.favs.albums.splice(index, 1);
    }
  }

  async addArtist(artist: Artist) {
    storage.favs.artists.push(artist.id);
  }

  async removeArtist(removedArtist: Artist) {
    const index = storage.favs.artists.findIndex(
      (uuid: string) => uuid === removedArtist.id,
    );

    if (index !== -1) {
      storage.favs.artists.splice(index, 1);
    }
  }
}

export { FavRepository };
