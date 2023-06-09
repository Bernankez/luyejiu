import { ArtistService } from "~/server/service/artist";

export async function addArtist() {
  const artistService = new ArtistService();
  const res = await artistService.create({
    name: "鹿野灸",
    avatarPath: "http://bucket.luyejiu.live/%E9%B9%BF%E9%87%8E%E7%81%B8/%E9%B9%BF%E9%87%8E%E7%81%B8.jpg",
    disabled: false,
  });
  return res;
}

export async function findArtists() {
  const artistService = new ArtistService();
  const res = await artistService.find();
  return res;
}
