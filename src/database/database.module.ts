import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ArtistRepository } from './artist.repository';
import { TrackRepository } from './track.repository';
import { AlbumRepository } from './album.repository';
import { FavRepository } from './fav.repository';

@Module({
  providers: [
    UserRepository,
    ArtistRepository,
    TrackRepository,
    AlbumRepository,
    FavRepository,
  ],
  exports: [
    UserRepository,
    ArtistRepository,
    TrackRepository,
    AlbumRepository,
    FavRepository,
  ],
})
export class DatabaseModule {}
