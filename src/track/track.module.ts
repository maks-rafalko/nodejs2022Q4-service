import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DatabaseModule } from '../database/database.module';
import { TrackByIdPipe } from './track-by-id.pipe';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackByIdPipe, TrackService],
  imports: [DatabaseModule],
  exports: [TrackByIdPipe, TrackService],
})
export class TrackModule {}
