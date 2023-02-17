import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Track } from '../../track/entities/track.entity';

@Entity()
export class FavoriteTrack {
  constructor(track: Track) {
    this.id = uuidv4();
    this.track = track;
  }

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Track, null, { onDelete: 'CASCADE', eager: true })
  track: Track;
}
