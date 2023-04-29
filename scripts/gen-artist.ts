import { run } from "./run";
import { ArtistModel } from "~/server/models/artist";

export async function createArtist() {
  await ArtistModel.ensureIndexes();
  const artist = await ArtistModel.create({
    name: "鹿野灸",
  });
  return artist;
}

run([createArtist]);
