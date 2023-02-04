import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from '../database/album.repository';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  imports: [TrackModule],
})
export class AlbumModule {}
