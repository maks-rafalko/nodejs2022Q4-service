import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackRepository extends Repository<Track> {
  constructor(private dataSource: DataSource) {
    super(Track, dataSource.createEntityManager());
  }

  async getFavoriteTracks(): Promise<Track[]> {
    return this.createQueryBuilder('track')
      .select('track')
      .leftJoinAndSelect('track.album', 'album')
      .leftJoinAndSelect('track.artist', 'artist')
      .innerJoin('favorite_track', 'favorites', 'favorites.trackId = track.id')
      .getMany();
  }
}
