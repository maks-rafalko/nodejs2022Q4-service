import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '../track/track.module';
import { ArtistByIdPipe } from './artist-by-id.pipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../album/entities/album.entity';
import { Artist } from './entities/artist.entity';
import { Fav } from '../favs/entities/fav.entity';
import { Track } from '../track/entities/track.entity';
import { ArtistRepository } from './artist.repository';
import { AlbumModule } from '../album/album.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistByIdPipe, ArtistRepository],
  imports: [
    TrackModule,
    AlbumModule,
    TypeOrmModule.forFeature([Album, Artist, Fav, Track]),
  ],
  exports: [ArtistService, ArtistByIdPipe, ArtistRepository],
})
export class ArtistModule {}
