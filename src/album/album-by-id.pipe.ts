import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './entities/album.entity';
import { AlbumService } from './album.service';

@Injectable()
export class AlbumByIdPipe implements PipeTransform<string, Promise<Album>> {
  constructor(private readonly albumService: AlbumService) {}

  async transform(uuid: string): Promise<Album> {
    const existingAlbum = await this.albumService.findOne(uuid);

    if (!existingAlbum) {
      throw new NotFoundException('Album not found.');
    }

    return existingAlbum;
  }
}
