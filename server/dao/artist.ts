import { ArtistModel } from "../models";
import type { ArtistClass } from "../models/artist";
import { BaseDao } from "./base";

export class ArtistDao extends BaseDao<ArtistClass> {}

export const artist = new ArtistDao(ArtistModel);
