import { Exclude, Transform } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.version = 1;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column('varchar', { nullable: true, default: null, length: 500 })
  refreshToken: string | null;

  @Column()
  version: number;

  @CreateDateColumn()
  @Transform(({ value }) => value.getTime())
  createdAt: Date;

  @UpdateDateColumn()
  @Transform(({ value }) => value.getTime())
  updatedAt: Date;
}
