import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class FavoriteArtist {
  constructor(artist: Artist) {
    this.artist = artist;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Artist, null, { onDelete: 'CASCADE' })
  artist: Artist;
}
