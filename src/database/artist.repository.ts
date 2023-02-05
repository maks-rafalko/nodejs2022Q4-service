import { Artist } from '../artist/entities/artist.entity';
import { storage } from './storage.db';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';

class ArtistRepository {
  async findOne(id: string): Promise<Artist | undefined> {
    return storage.artists.find((artist: Artist) => artist.id === id);
  }

  async findAll(): Promise<Artist[]> {
    return storage.artists;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = new Artist(createArtistDto.name, createArtistDto.grammy);

    storage.artists.push(newArtist);

    return newArtist;
  }

  async update(id: string, artist: Artist): Promise<void> {
    const index = storage.artists.findIndex(
      (artist: Artist) => artist.id === id,
    );

    if (index !== -1) {
      storage.artists[index] = artist;
    }
  }

  async remove(id: string): Promise<void> {
    const index = storage.artists.findIndex(
      (artist: Artist) => artist.id === id,
    );

    if (index !== -1) {
      storage.artists.splice(index, 1);
    }
  }

  async getArtistsByIds(artists: string[]) {
    return storage.artists.filter((artist: Artist) =>
      artists.includes(artist.id),
    );
  }
}

export { ArtistRepository };
