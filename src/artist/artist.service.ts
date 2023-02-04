import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from '../database/artist.repository';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private artistRepository: ArtistRepository) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistRepository.create(createArtistDto);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.findAll();
  }

  async findOne(uuid: string): Promise<Artist> {
    return await this.artistRepository.findOne(uuid);
  }

  async update(uuid: string, updateArtistDto: UpdateArtistDto) {
    const existingArtist = await this.artistRepository.findOne(uuid);

    existingArtist.name = updateArtistDto.name;
    existingArtist.grammy = updateArtistDto.grammy;

    await this.artistRepository.update(uuid, existingArtist);

    return existingArtist;
  }

  async remove(uuid: string): Promise<void> {
    await this.artistRepository.remove(uuid);
  }
}
