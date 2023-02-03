import { Artist } from '../artist/entities/artist.entity';
import { storage } from './storage.db';

class ArtistRepository {
  async findAll(): Promise<Artist[]> {
    return storage.artists;
  }
}

export { ArtistRepository };
