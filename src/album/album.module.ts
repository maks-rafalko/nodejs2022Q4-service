import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from '../track/track.module';
import { DatabaseModule } from '../database/database.module';
import { AlbumByIdPipe } from './album-by-id.pipe';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumByIdPipe],
  imports: [TrackModule, DatabaseModule],
  exports: [AlbumService, AlbumByIdPipe],
})
export class AlbumModule {}
