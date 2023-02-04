import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumByIdPipe } from './album-by-id.pipe';
import { StatusCodes } from 'http-status-codes';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  async findAll(): Promise<Album[]> {
    return await this.albumService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid', ParseUUIDPipe, AlbumByIdPipe) album: Album) {
    return album;
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe, AlbumByIdPipe) album: Album,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(album.id, updateAlbumDto);
  }

  @Delete(':uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(
    @Param('uuid', ParseUUIDPipe, AlbumByIdPipe) album: Album,
  ): Promise<void> {
    await this.albumService.remove(album.id);
  }
}
