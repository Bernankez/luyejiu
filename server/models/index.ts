import { getModelForClass } from "@typegoose/typegoose";
import { ArtistClass } from "./artist";
import { SongClass } from "./song";

export const ArtistModel = getModelForClass(ArtistClass);
export const SongModel = getModelForClass(SongClass);
