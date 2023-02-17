import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackByIdPipe } from './track-by-id.pipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Fav } from '../favs/entities/fav.entity';
import { Track } from './entities/track.entity';
import { TrackRepository } from './track.repository';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackByIdPipe, TrackRepository],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
    TypeOrmModule.forFeature([Album, Artist, Fav, Track]),
  ],
  exports: [TrackByIdPipe, TrackService, TrackRepository],
})
export class TrackModule {}
