import { artist } from "../dao/artist";

export class ArtistService {
  private artist: typeof artist;

  constructor() {
    this.artist = artist;
  }
}
