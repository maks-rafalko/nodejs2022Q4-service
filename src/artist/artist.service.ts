import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from '../database/artist.repository';

@Injectable()
export class ArtistService {
  constructor(private artistRepository: ArtistRepository) {}

  create(createArtistDto: CreateArtistDto) {
    return 'This action adds a new artist';
  }

  async findAll() {
    return await this.artistRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
