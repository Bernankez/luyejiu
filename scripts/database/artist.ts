import consola from "consola";
import { ArtistService } from "~/server/service/artist";

export async function addArtist() {
  const artistService = new ArtistService();
  await artistService.create({
    name: "鹿野灸",
    avatarPath: "",
    disabled: false,
  });
}

export async function findArtists() {
  const artistService = new ArtistService();
  const res = await artistService.find();
  consola.success(res);
}
