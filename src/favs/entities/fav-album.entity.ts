import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Album } from '../../album/entities/album.entity';

@Entity()
export class FavoriteAlbum {
  constructor(album: Album) {
    this.id = uuidv4();
    this.album = album;
  }

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Album, null, { onDelete: 'CASCADE' })
  album: Album;
}
