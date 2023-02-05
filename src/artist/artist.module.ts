import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '../track/track.module';
import { DatabaseModule } from '../database/database.module';
import { ArtistByIdPipe } from './artist-by-id.pipe';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistByIdPipe],
  imports: [TrackModule, DatabaseModule],
  exports: [ArtistService, ArtistByIdPipe],
})
export class ArtistModule {}
