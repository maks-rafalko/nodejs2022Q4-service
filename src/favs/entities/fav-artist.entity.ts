import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class FavoriteArtist {
  constructor(artist: Artist) {
    this.id = uuidv4();
    this.artist = artist;
  }

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Artist, null, { onDelete: 'CASCADE' })
  artist: Artist;
}
