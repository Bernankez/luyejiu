import { ArtistModel } from "../server/models";
import { run } from "./run";

export async function createArtist() {
  await ArtistModel.ensureIndexes();
  const artist = await ArtistModel.create({
    name: "鹿野灸",
  });
  return artist;
}

run([createArtist]);
