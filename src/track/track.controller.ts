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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackByIdPipe } from './track-by-id.pipe';
import { StatusCodes } from 'http-status-codes';
import { Track } from './entities/track.entity';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  async findAll(): Promise<Track[]> {
    return await this.trackService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid', ParseUUIDPipe, TrackByIdPipe) track: Track) {
    return track;
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe, TrackByIdPipe) track: Track,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return await this.trackService.update(track.id, updateTrackDto);
  }

  @Delete(':uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(
    @Param('uuid', ParseUUIDPipe, TrackByIdPipe) track: Track,
  ): Promise<void> {
    await this.trackService.remove(track.id);
  }
}
