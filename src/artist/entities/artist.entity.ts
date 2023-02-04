import { v4 as uuidv4 } from 'uuid';

export class Artist {
  constructor(name: string, grammy: boolean) {
    this.id = uuidv4();
    this.name = name;
    this.grammy = grammy;
  }

  id: string;
  name: string;
  grammy: boolean;
}
