import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { FavoriteTrack } from './entities/fav-track.entity';
import { FavoriteAlbum } from './entities/fav-album.entity';
import { FavoriteArtist } from './entities/fav-artist.entity';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [
    TrackModule,
    AlbumModule,
    ArtistModule,
    TypeOrmModule.forFeature([
      Album,
      Artist,
      FavoriteTrack,
      FavoriteAlbum,
      FavoriteArtist,
      Track,
    ]),
  ],
})
export class FavsModule {}
