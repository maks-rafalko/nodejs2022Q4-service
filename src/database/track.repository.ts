import { Track } from '../track/entities/track.entity';
import { storage } from './storage.db';
import { CreateTrackDto } from '../track/dto/create-track.dto';

class TrackRepository {
  async findOne(id: string): Promise<Track | undefined> {
    return storage.tracks.find((track: Track) => track.id === id);
  }

  async findAll(): Promise<Track[]> {
    return storage.tracks;
  }

  async findByArtistId(artistId: string): Promise<Track[]> {
    return storage.tracks.filter((track: Track) => track.artistId === artistId);
  }

  async findByAlbumId(albumId: string): Promise<Track[]> {
    return storage.tracks.filter((track: Track) => track.albumId === albumId);
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = new Track(
      createTrackDto.name,
      createTrackDto.artistId,
      createTrackDto.albumId,
      createTrackDto.duration,
    );

    storage.tracks.push(newTrack);

    return newTrack;
  }

  async update(id: string, track: Track): Promise<void> {
    const index = storage.tracks.findIndex((track: Track) => track.id === id);

    if (index !== -1) {
      storage.tracks[index] = track;
    }
  }

  async remove(id: string): Promise<void> {
    const index = storage.tracks.findIndex((track: Track) => track.id === id);

    if (index !== -1) {
      storage.tracks.splice(index, 1);
    }
  }

  async getTracksByIds(tracks: string[]) {
    return storage.tracks.filter((track: Track) => tracks.includes(track.id));
  }
}

export { TrackRepository };
