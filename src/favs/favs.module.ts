import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { DatabaseModule } from '../database/database.module';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [DatabaseModule, TrackModule, AlbumModule, ArtistModule],
})
export class FavsModule {}
