import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from '../database/artist.repository';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
  imports: [TrackModule],
})
export class ArtistModule {}
