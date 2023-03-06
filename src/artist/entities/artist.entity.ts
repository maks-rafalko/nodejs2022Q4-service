import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  constructor(name: string, grammy: boolean) {
    this.name = name;
    this.grammy = grammy;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;
}
