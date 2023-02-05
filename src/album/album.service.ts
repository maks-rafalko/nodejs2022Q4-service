import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumRepository } from '../database/album.repository';
import { TrackRepository } from '../database/track.repository';
import { FavRepository } from '../database/fav.repository';
import { ArtistRepository } from '../database/artist.repository';

@Injectable()
export class AlbumService {
  constructor(
    private albumRepository: AlbumRepository,
    private trackRepository: TrackRepository,
    private favRepository: FavRepository,
    private artistRepository: ArtistRepository,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    await this.assertArtistExistsIfPassed(createAlbumDto.artistId);

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

    await this.assertArtistExistsIfPassed(updateAlbumDto.artistId);

    existingAlbum.name = updateAlbumDto.name;
    existingAlbum.year = updateAlbumDto.year;
    existingAlbum.artistId = updateAlbumDto.artistId;

    await this.albumRepository.update(uuid, existingAlbum);

    return existingAlbum;
  }

  async remove(uuid: string): Promise<void> {
    await this.albumRepository.remove(uuid);

    await this.removeRelationsFromTracks(uuid);

    await this.removeAlbumFromFavorites(uuid);
  }

  private async removeRelationsFromTracks(uuid: string): Promise<void> {
    const tacks = await this.trackRepository.findByAlbumId(uuid);

    for (const track of tacks) {
      track.albumId = null;
      await this.trackRepository.update(track.id, track);
    }
  }

  private async removeAlbumFromFavorites(
    removedAlbumId: string,
  ): Promise<void> {
    await this.favRepository.removeAlbum(removedAlbumId);
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
}
