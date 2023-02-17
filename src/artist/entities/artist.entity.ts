import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Artist {
  constructor(name: string, grammy: boolean) {
    this.id = uuidv4();
    this.name = name;
    this.grammy = grammy;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;
}
