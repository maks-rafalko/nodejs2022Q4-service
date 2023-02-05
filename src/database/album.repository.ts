import { Album } from '../album/entities/album.entity';
import { storage } from './storage.db';
import { CreateAlbumDto } from '../album/dto/create-album.dto';
import { Track } from '../track/entities/track.entity';

class AlbumRepository {
  async findOne(id: string): Promise<Album | undefined> {
    return storage.albums.find((album: Album) => album.id === id);
  }

  async findAll(): Promise<Album[]> {
    return storage.albums;
  }

  async create(CreateAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = new Album(
      CreateAlbumDto.name,
      CreateAlbumDto.year,
      CreateAlbumDto.artistId,
    );

    storage.albums.push(newAlbum);

    return newAlbum;
  }

  async update(id: string, album: Album): Promise<void> {
    const index = storage.albums.findIndex((album: Album) => album.id === id);

    if (index !== -1) {
      storage.albums[index] = album;
    }
  }

  async remove(id: string): Promise<void> {
    const index = storage.albums.findIndex((album: Album) => album.id === id);

    if (index !== -1) {
      storage.albums.splice(index, 1);
    }
  }

  async getAlbumsByIds(albums: string[]) {
    return storage.albums.filter((album: Album) => albums.includes(album.id));
  }

  async findByArtistId(artistId: string): Promise<Album[]> {
    return storage.albums.filter((track: Track) => track.artistId === artistId);
  }
}

export { AlbumRepository };
