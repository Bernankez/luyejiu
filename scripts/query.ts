import consola from "consola";
import { ArtistModel, SongModel } from "../server/models";
import { run } from "./run";

async function queryArtistSongs() {
  // const artist = await ArtistModel.findOne({ name: "鹿野灸" });
  const artist = await ArtistModel.find({ name: "鹿野灸" }).populate("songs");
  consola.success(artist);
  // console.log(artist[0]);
  const songs = await SongModel.find().populate("artists.artist");
  // const songs1 = await SongModel.findOne();
  // songs1?.toObject();
  consola.success(songs);
  consola.success(songs[0].toObject().artists[0]);
}

run([queryArtistSongs]);
