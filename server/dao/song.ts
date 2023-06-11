import { SongModel } from "../models";
import type { SongClass } from "../models/song";
import { BaseDao } from "./base";

export class SongDao extends BaseDao<SongClass> {}

export const song = new SongDao(SongModel);
