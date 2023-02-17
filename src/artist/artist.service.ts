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

    // await this.removeRelationsFromTracks(uuid);
    // await this.removeRelationsFromAlbums(uuid);
    // await this.removeArtistFromFavorites(uuid);
  }

  // private async removeRelationsFromTracks(artistUuid: string): Promise<void> {
  //   const tacks = await this.trackRepository.findByArtistId(artistUuid);
  //
  //   for (const track of tacks) {
  //     track.artistId = null;
  //     await this.trackRepository.update(track.id, track);
  //   }
  // }
  //
  // private async removeRelationsFromAlbums(artistUuid: string): Promise<void> {
  //   const albums = await this.albumRepository.findByArtistId(artistUuid);
  //
  //   for (const album of albums) {
  //     album.artistId = null;
  //     await this.albumRepository.update(album.id, album);
  //   }
  // }
  //
  // private async removeArtistFromFavorites(artistUuid: string): Promise<void> {
  //   await this.favRepository.removeArtist(artistUuid);
  // }
}
