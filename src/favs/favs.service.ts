import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FavRepository } from '../database/fav.repository';
import { FavoritesResponse } from './favs-response.interface';
import { ArtistRepository } from '../database/artist.repository';
import { AlbumRepository } from '../database/album.repository';
import { TrackRepository } from '../database/track.repository';

// todo cors

@Injectable()
export class FavsService {
  constructor(
    private favRepository: FavRepository,
    private artistRepository: ArtistRepository,
    private albumRepository: AlbumRepository,
    private trackRepository: TrackRepository,
  ) {}

  async getFavorites(): Promise<FavoritesResponse> {
    const favoritesIds = await this.favRepository.getFavorites();

    const response: FavoritesResponse = {
      artists: [],
      albums: [],
      tracks: [],
    };

    response.artists = await this.artistRepository.getArtistsByIds(
      favoritesIds.artists,
    );

    response.albums = await this.albumRepository.getAlbumsByIds(
      favoritesIds.albums,
    );

    response.tracks = await this.trackRepository.getTracksByIds(
      favoritesIds.tracks,
    );

    return response;
  }

  async addTrack(uuid: string) {
    const existingTrack = await this.trackRepository.findOne(uuid);

    if (!existingTrack) {
      throw new UnprocessableEntityException('Track not found.');
    }

    await this.favRepository.addTrack(existingTrack);
  }

  async removeTrack(uuid: string) {
    const existingTrack = await this.trackRepository.findOne(uuid);

    if (!existingTrack) {
      throw new UnprocessableEntityException('Track not found.');
    }

    await this.favRepository.removeTrack(uuid);
  }

  async addAlbum(uuid: string) {
    const existingAlbum = await this.albumRepository.findOne(uuid);

    if (!existingAlbum) {
      throw new UnprocessableEntityException('Album not found.');
    }

    await this.favRepository.addAlbum(existingAlbum);
  }

  async removeAlbum(uuid: string) {
    const existingAlbum = await this.albumRepository.findOne(uuid);

    if (!existingAlbum) {
      throw new UnprocessableEntityException('Album not found.');
    }

    await this.favRepository.removeAlbum(uuid);
  }

  async addArtist(uuid: string) {
    const existingArtist = await this.artistRepository.findOne(uuid);

    if (!existingArtist) {
      throw new UnprocessableEntityException('Artist not found.');
    }

    await this.favRepository.addArtist(existingArtist);
  }

  async removeArtist(uuid: string) {
    const existingArtist = await this.artistRepository.findOne(uuid);

    if (!existingArtist) {
      throw new UnprocessableEntityException('Artist not found.');
    }

    await this.favRepository.removeArtist(existingArtist.id);
  }
}
