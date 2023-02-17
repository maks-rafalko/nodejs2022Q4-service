import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../album/entities/album.entity';

@Entity()
export class FavoriteAlbum {
  constructor(album: Album) {
    this.album = album;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Album, null, { onDelete: 'CASCADE' })
  album: Album;
}
