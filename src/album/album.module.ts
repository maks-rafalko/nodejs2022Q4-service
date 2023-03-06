import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from '../track/track.module';
import { AlbumByIdPipe } from './album-by-id.pipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Fav } from '../favs/entities/fav.entity';
import { Track } from '../track/entities/track.entity';
import { AlbumRepository } from './album.repository';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumByIdPipe, AlbumRepository],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    TypeOrmModule.forFeature([Album, Artist, Fav, Track]),
  ],
  exports: [AlbumService, AlbumByIdPipe, AlbumRepository],
})
export class AlbumModule {}
