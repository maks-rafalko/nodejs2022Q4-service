import { Album } from './album/entities/album.entity';
import { Artist } from './artist/entities/artist.entity';
import { Fav } from './favs/entities/fav.entity';
import { Track } from './track/entities/track.entity';
import { User } from './user/entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { FavoriteTrack } from './favs/entities/fav-track.entity';
import { FavoriteAlbum } from './favs/entities/fav-album.entity';
import { FavoriteArtist } from './favs/entities/fav-artist.entity';

const config: TypeOrmModuleOptions & DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    Album,
    Artist,
    Fav,
    Track,
    User,
    FavoriteTrack,
    FavoriteAlbum,
    FavoriteArtist,
  ],
};

export { config };
