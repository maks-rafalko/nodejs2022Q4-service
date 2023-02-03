import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ArtistRepository } from './artist.repository';

@Module({
  providers: [UserRepository, ArtistRepository],
  exports: [UserRepository, ArtistRepository],
})
export class DatabaseModule {}
