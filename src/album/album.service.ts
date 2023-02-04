import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumRepository } from '../database/album.repository';
import { TrackRepository } from '../database/track.repository';

@Injectable()
export class AlbumService {
  constructor(
    private albumRepository: AlbumRepository,
    private trackRepository: TrackRepository,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumRepository.create(createAlbumDto);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepository.findAll();
  }

  async findOne(uuid: string): Promise<Album> {
    return await this.albumRepository.findOne(uuid);
  }

  async update(uuid: string, updateAlbumDto: UpdateAlbumDto) {
    const existingAlbum = await this.albumRepository.findOne(uuid);

    existingAlbum.name = updateAlbumDto.name;
    existingAlbum.year = updateAlbumDto.year;
    existingAlbum.artistId = updateAlbumDto.artistId;

    await this.albumRepository.update(uuid, existingAlbum);

    return existingAlbum;
  }

  async remove(uuid: string): Promise<void> {
    await this.albumRepository.remove(uuid);

    // remove "foreign keys" - links to tracks
    const tacks = await this.trackRepository.findByAlbumId(uuid);

    for (const track of tacks) {
      track.albumId = null;
      await this.trackRepository.update(track.id, track);
    }
  }
}
