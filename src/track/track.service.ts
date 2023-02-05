import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from '../database/track.repository';
import { Track } from './entities/track.entity';
import { FavRepository } from '../database/fav.repository';
import { ArtistRepository } from '../database/artist.repository';
import { AlbumRepository } from '../database/album.repository';

@Injectable()
export class TrackService {
  constructor(
    private trackRepository: TrackRepository,
    private favRepository: FavRepository,
    private artistRepository: ArtistRepository,
    private albumRepository: AlbumRepository,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    await this.assertArtistExistsIfPassed(createTrackDto.artistId);
    await this.assertAlbumExistsIfPassed(createTrackDto.albumId);

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

    await this.assertArtistExistsIfPassed(updateTrackDto.artistId);
    await this.assertAlbumExistsIfPassed(updateTrackDto.albumId);

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

  private async assertArtistExistsIfPassed(
    artistId: string | null,
  ): Promise<void> {
    if (artistId === null) {
      return;
    }

    const existingArtistId = await this.artistRepository.findOne(artistId);

    if (!existingArtistId) {
      throw new BadRequestException('Artist not found');
    }
  }

  private async assertAlbumExistsIfPassed(
    albumId: string | null,
  ): Promise<void> {
    if (albumId === null) {
      return;
    }

    const existingArtistId = await this.albumRepository.findOne(albumId);

    if (!existingArtistId) {
      throw new BadRequestException('Album not found');
    }
  }
}
