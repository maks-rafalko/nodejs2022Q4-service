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
    if (!storage.favs.tracks.includes(track.id)) {
      storage.favs.tracks.push(track.id);
    }
  }

  async removeTrack(removedTrackId: string) {
    const index = storage.favs.tracks.findIndex(
      (uuid: string) => uuid === removedTrackId,
    );

    if (index !== -1) {
      storage.favs.tracks.splice(index, 1);
    }
  }

  async addAlbum(album: Album) {
    if (!storage.favs.albums.includes(album.id)) {
      storage.favs.albums.push(album.id);
    }
  }

  async removeAlbum(removedAlbumId: string) {
    const index = storage.favs.albums.findIndex(
      (uuid: string) => uuid === removedAlbumId,
    );

    if (index !== -1) {
      storage.favs.albums.splice(index, 1);
    }
  }

  async addArtist(artist: Artist) {
    if (!storage.favs.artists.includes(artist.id)) {
      storage.favs.artists.push(artist.id);
    }
  }

  async removeArtist(removedArtistId: string) {
    const index = storage.favs.artists.findIndex(
      (uuid: string) => uuid === removedArtistId,
    );

    if (index !== -1) {
      storage.favs.artists.splice(index, 1);
    }
  }
}

export { FavRepository };
