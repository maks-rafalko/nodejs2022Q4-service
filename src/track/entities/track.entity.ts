import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Expose, Transform } from 'class-transformer';
import { Album } from '../../album/entities/album.entity';

@Entity()
export class Track {
  constructor(
    name: string,
    artist: Artist | null,
    album: Album | null,
    duration: number,
  ) {
    this.name = name;
    this.artist = artist;
    this.album = album;
    this.duration = duration;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, null, { onDelete: 'SET NULL' })
  @Expose({ name: 'artistId' })
  @Transform(({ value }) => (value ? value.id : null))
  artist: Artist | null;

  @ManyToOne(() => Album, null, { onDelete: 'SET NULL' })
  @Expose({ name: 'albumId' })
  @Transform(({ value }) => (value ? value.id : null))
  album: Album | null;

  @Column()
  duration: number;
}
