import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Expose, Transform } from 'class-transformer';

@Entity()
export class Album {
  constructor(name: string, year: number, artist: Artist | null) {
    this.id = uuidv4();
    this.name = name;
    this.year = year;
    this.artist = artist;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, null, { onDelete: 'SET NULL' })
  @Expose({ name: 'artistId' })
  @Transform(({ value }) => (value ? value.id : null))
  artist: Artist | null;
}
