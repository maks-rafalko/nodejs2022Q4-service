import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from '../database/track.repository';
import { Track } from './entities/track.entity';
import { FavRepository } from '../database/fav.repository';

@Injectable()
export class TrackService {
  constructor(
    private trackRepository: TrackRepository,
    private favRepository: FavRepository,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.trackRepository.create(createTrackDto);
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.findAll();
  }

  async findOne(uuid: string): Promise<Track> {
    return await this.trackRepository.findOne(uuid);
  }

  async update(uuid: string, updateTrackDto: UpdateTrackDto) {
    const existingTrack = await this.trackRepository.findOne(uuid);

    existingTrack.name = updateTrackDto.name;
    existingTrack.artistId = updateTrackDto.artistId;
    existingTrack.albumId = updateTrackDto.albumId;
    existingTrack.duration = updateTrackDto.duration;

    await this.trackRepository.update(uuid, existingTrack);

    return existingTrack;
  }

  async remove(uuid: string): Promise<void> {
    await this.trackRepository.remove(uuid);

    await this.removeTrackFromFavorites(uuid);
  }

  private async removeTrackFromFavorites(trackUuid: string): Promise<void> {
    await this.favRepository.removeTrack(trackUuid);
  }
}
