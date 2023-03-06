import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '../../track/entities/track.entity';

@Entity()
export class FavoriteTrack {
  constructor(track: Track) {
    this.track = track;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Track, null, { onDelete: 'CASCADE', eager: true })
  track: Track;
}
