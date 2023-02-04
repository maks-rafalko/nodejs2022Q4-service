import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackByIdPipe implements PipeTransform<string, Promise<Track>> {
  constructor(private readonly trackService: TrackService) {}

  async transform(uuid: string): Promise<Track> {
    const existingTrack = await this.trackService.findOne(uuid);

    if (!existingTrack) {
      throw new NotFoundException('Track not found.');
    }

    return existingTrack;
  }
}
