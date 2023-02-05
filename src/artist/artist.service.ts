import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from '../database/artist.repository';
import { Artist } from './entities/artist.entity';
import { TrackRepository } from '../database/track.repository';
import { FavRepository } from '../database/fav.repository';

@Injectable()
export class ArtistService {
  constructor(
    private artistRepository: ArtistRepository,
    private trackRepository: TrackRepository,
    private favRepository: FavRepository,
  ) {}

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

    await this.removeRelationsFromTracks(uuid);

    await this.removeArtistFromFavorites(uuid);
  }

  private async removeRelationsFromTracks(artistUuid: string): Promise<void> {
    const tacks = await this.trackRepository.findByArtistId(artistUuid);

    for (const track of tacks) {
      track.artistId = null;
      await this.trackRepository.update(track.id, track);
    }
  }

  private async removeArtistFromFavorites(artistUuid: string): Promise<void> {
    // todo check we can't add same artist/album/track more than once
    await this.favRepository.removeArtist(artistUuid);
  }
}
