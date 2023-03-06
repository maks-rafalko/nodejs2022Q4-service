import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { TrackRepository } from '../track/track.repository';
import { AlbumRepository } from '../album/album.repository';
import { ArtistRepository } from './artist.repository';

@Injectable()
export class ArtistService {
  constructor(
    private albumRepository: AlbumRepository,
    private trackRepository: TrackRepository,
    private artistRepository: ArtistRepository,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistRepository.save(
      new Artist(createArtistDto.name, createArtistDto.grammy),
    );
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async findOne(uuid: string): Promise<Artist> {
    return await this.artistRepository.findOneBy({ id: uuid });
  }

  async update(uuid: string, updateArtistDto: UpdateArtistDto) {
    const existingArtist = await this.artistRepository.findOneBy({ id: uuid });

    existingArtist.name = updateArtistDto.name;
    existingArtist.grammy = updateArtistDto.grammy;

    await this.artistRepository.update(uuid, existingArtist);

    return existingArtist;
  }

  async remove(uuid: string): Promise<void> {
    await this.artistRepository.delete(uuid);
  }
}
