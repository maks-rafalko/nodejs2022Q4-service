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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { ArtistByIdPipe } from './artist-by-id.pipe';
import { StatusCodes } from 'http-status-codes';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  async findAll(): Promise<Artist[]> {
    throw new Error('Test error');
    return await this.artistService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid', ParseUUIDPipe, ArtistByIdPipe) artist: Artist) {
    return artist;
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe, ArtistByIdPipe) artist: Artist,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return await this.artistService.update(artist.id, updateArtistDto);
  }

  @Delete(':uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(
    @Param('uuid', ParseUUIDPipe, ArtistByIdPipe) artist: Artist,
  ): Promise<void> {
    await this.artistService.remove(artist.id);
  }
}
