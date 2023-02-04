import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumRepository } from '../database/album.repository';

@Injectable()
export class AlbumService {
  constructor(private albumRepository: AlbumRepository) {}

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
  }
}
