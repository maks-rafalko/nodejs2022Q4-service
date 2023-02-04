import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './entities/artist.entity';
import { ArtistService } from './artist.service';

@Injectable()
export class ArtistByIdPipe implements PipeTransform<string, Promise<Artist>> {
  constructor(private readonly artistService: ArtistService) {}

  async transform(uuid: string): Promise<Artist> {
    const existingArtist = await this.artistService.findOne(uuid);

    if (!existingArtist) {
      throw new NotFoundException('Artist not found.');
    }

    return existingArtist;
  }
}
