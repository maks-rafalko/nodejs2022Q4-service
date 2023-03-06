import {
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { StatusCodes } from 'http-status-codes';

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

  @Delete('track/:uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrack(@Param('uuid', ParseUUIDPipe) uuid: string) {
    await this.favsService.removeTrack(uuid);
  }

  @Post('album/:uuid')
  async addAlbum(@Param('uuid', ParseUUIDPipe) uuid: string) {
    await this.favsService.addAlbum(uuid);
  }

  @Delete('album/:uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbum(@Param('uuid', ParseUUIDPipe) uuid: string) {
    await this.favsService.removeAlbum(uuid);
  }

  @Post('artist/:uuid')
  async addArtist(@Param('uuid', ParseUUIDPipe) uuid: string) {
    await this.favsService.addArtist(uuid);
  }

  @Delete('artist/:uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtist(@Param('uuid', ParseUUIDPipe) uuid: string) {
    await this.favsService.removeArtist(uuid);
  }
}
