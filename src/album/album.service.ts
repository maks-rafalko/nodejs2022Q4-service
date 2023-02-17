import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { TrackRepository } from '../track/track.repository';
import { AlbumRepository } from './album.repository';
import { ArtistRepository } from '../artist/artist.repository';

@Injectable()
export class AlbumService {
  constructor(
    private albumRepository: AlbumRepository,
    private trackRepository: TrackRepository,
    private artistRepository: ArtistRepository,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const existingArtist =
      createAlbumDto.artistId === null
        ? null
        : await this.artistRepository.findOneBy({
            id: createAlbumDto.artistId,
          });

    await this.assertArtistExistsIfPassed(
      createAlbumDto.artistId,
      existingArtist,
    );

    return await this.albumRepository.save(
      new Album(createAlbumDto.name, createAlbumDto.year, existingArtist),
    );
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async findOne(uuid: string): Promise<Album> {
    return await this.albumRepository.findOneBy({ id: uuid });
  }

  async update(uuid: string, updateAlbumDto: UpdateAlbumDto) {
    const existingAlbum = await this.albumRepository.findOneBy({ id: uuid });

    const existingArtist = await this.artistRepository.findOneBy({
      id: updateAlbumDto.artistId,
    });

    await this.assertArtistExistsIfPassed(
      updateAlbumDto.artistId,
      existingArtist,
    );

    existingAlbum.name = updateAlbumDto.name;
    existingAlbum.year = updateAlbumDto.year;
    existingAlbum.artist = existingArtist;

    await this.albumRepository.save(existingAlbum);

    return existingAlbum;
  }

  async remove(uuid: string): Promise<void> {
    await this.albumRepository.delete(uuid);
  }

  private async assertArtistExistsIfPassed(
    artistId: string | null,
    existingArtist: Artist | null,
  ): Promise<void> {
    if (artistId === null) {
      return;
    }

    if (!existingArtist) {
      throw new BadRequestException('Artist not found');
    }
  }
}
