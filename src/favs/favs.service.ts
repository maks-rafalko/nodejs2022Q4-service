import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FavoritesResponse } from './favs-response.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackRepository } from '../track/track.repository';
import { AlbumRepository } from '../album/album.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { FavoriteTrack } from './entities/fav-track.entity';
import { FavoriteAlbum } from './entities/fav-album.entity';
import { FavoriteArtist } from './entities/fav-artist.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavoriteTrack)
    private favoriteTrackRepository: Repository<FavoriteTrack>,
    @InjectRepository(FavoriteAlbum)
    private favoriteAlbumRepository: Repository<FavoriteAlbum>,
    @InjectRepository(FavoriteArtist)
    private favoriteArtistRepository: Repository<FavoriteArtist>,
    private albumRepository: AlbumRepository,
    private trackRepository: TrackRepository,
    private artistRepository: ArtistRepository,
  ) {}

  async getFavorites(): Promise<FavoritesResponse> {
    return {
      artists: await this.artistRepository.getFavoriteArtists(),
      albums: await this.albumRepository.getFavoriteAlbums(),
      tracks: await this.trackRepository.getFavoriteTracks(),
    };
  }

  async addTrack(uuid: string) {
    const existingTrack = await this.trackRepository.findOneBy({ id: uuid });

    if (!existingTrack) {
      throw new UnprocessableEntityException('Track not found.');
    }

    await this.favoriteTrackRepository.save(new FavoriteTrack(existingTrack));
  }

  async removeTrack(uuid: string) {
    const existingTrack = await this.trackRepository.findOneBy({ id: uuid });

    if (!existingTrack) {
      throw new UnprocessableEntityException('Track not found.');
    }

    await this.favoriteTrackRepository.delete({ track: { id: uuid } });
  }

  async addAlbum(uuid: string) {
    const existingAlbum = await this.albumRepository.findOneBy({ id: uuid });

    if (!existingAlbum) {
      throw new UnprocessableEntityException('Album not found.');
    }

    await this.favoriteAlbumRepository.save(new FavoriteAlbum(existingAlbum));
  }

  async removeAlbum(uuid: string) {
    const existingAlbum = await this.albumRepository.findOneBy({ id: uuid });

    if (!existingAlbum) {
      throw new UnprocessableEntityException('Album not found.');
    }

    await this.favoriteAlbumRepository.delete({ album: { id: uuid } });
  }

  async addArtist(uuid: string) {
    const existingArtist = await this.artistRepository.findOneBy({ id: uuid });

    if (!existingArtist) {
      throw new UnprocessableEntityException('Artist not found.');
    }

    await this.favoriteArtistRepository.save(
      new FavoriteArtist(existingArtist),
    );
  }

  async removeArtist(uuid: string) {
    const existingArtist = await this.artistRepository.findOneBy({ id: uuid });

    if (!existingArtist) {
      throw new UnprocessableEntityException('Artist not found.');
    }

    await this.favoriteArtistRepository.delete({ artist: { id: uuid } });
  }
}
