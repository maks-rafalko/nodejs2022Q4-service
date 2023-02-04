import { v4 as uuidv4 } from 'uuid';

export class Album {
  constructor(name: string, year: number, artistId: string | null) {
    this.id = uuidv4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
