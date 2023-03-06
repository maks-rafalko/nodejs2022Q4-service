import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { TrackRepository } from './track.repository';
import { AlbumRepository } from '../album/album.repository';
import { ArtistRepository } from '../artist/artist.repository';

@Injectable()
export class TrackService {
  constructor(
    private albumRepository: AlbumRepository,
    private trackRepository: TrackRepository,
    private artistRepository: ArtistRepository,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const existingArtist =
      createTrackDto.artistId === null
        ? null
        : await this.artistRepository.findOneBy({
            id: createTrackDto.artistId,
          });

    const existingAlbum =
      createTrackDto.albumId === null
        ? null
        : await this.albumRepository.findOneBy({ id: createTrackDto.albumId });

    await this.assertArtistExistsIfPassed(
      createTrackDto.artistId,
      existingArtist,
    );
    await this.assertAlbumExistsIfPassed(createTrackDto.albumId, existingAlbum);

    return await this.trackRepository.save(
      new Track(
        createTrackDto.name,
        existingArtist,
        existingAlbum,
        createTrackDto.duration,
      ),
    );
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async findOne(uuid: string): Promise<Track> {
    return await this.trackRepository.findOneBy({ id: uuid });
  }

  async update(uuid: string, updateTrackDto: UpdateTrackDto) {
    const existingTrack = await this.trackRepository.findOneBy({ id: uuid });

    const existingArtist =
      updateTrackDto.artistId === null
        ? null
        : await this.artistRepository.findOneBy({
            id: updateTrackDto.artistId,
          });

    const existingAlbum =
      updateTrackDto.albumId === null
        ? null
        : await this.albumRepository.findOneBy({ id: updateTrackDto.albumId });

    await this.assertArtistExistsIfPassed(
      updateTrackDto.artistId,
      existingArtist,
    );
    await this.assertAlbumExistsIfPassed(updateTrackDto.albumId, existingAlbum);

    existingTrack.name = updateTrackDto.name;
    existingTrack.artist = existingArtist;
    existingTrack.album = existingAlbum;
    existingTrack.duration = updateTrackDto.duration;

    await this.trackRepository.update(uuid, existingTrack);

    return existingTrack;
  }

  async remove(uuid: string): Promise<void> {
    await this.trackRepository.delete(uuid);
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

  private async assertAlbumExistsIfPassed(
    albumId: string | null,
    existingAlbum: Album | null,
  ): Promise<void> {
    if (albumId === null) {
      return;
    }

    if (!existingAlbum) {
      throw new BadRequestException('Album not found');
    }
  }
}
