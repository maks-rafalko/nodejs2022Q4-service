import { Controller, Get, Post, Param, ParseUUIDPipe } from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async getFavorites() {
    return await this.favsService.getFavorites();
  }

  @Post('track/:uuid')
  async addTrack(@Param('uuid', ParseUUIDPipe) uuid: string) {
    await this.favsService.addTrack(uuid);
  }

  @Post('album/:uuid')
  async addAlbum(@Param('uuid', ParseUUIDPipe) uuid: string) {
    await this.favsService.addAlbum(uuid);
  }

  @Post('artist/:uuid')
  async addArtist(@Param('uuid', ParseUUIDPipe) uuid: string) {
    await this.favsService.addArtist(uuid);
  }
}
