import type { Song } from "~/types/song";

export function getAllSongs(): Song[] {
  return [
    {
      name: "大貔貅",
      id: "dapixiu",
      originSinger: "unknown",
      singer: "鹿野灸",
      duration: 300,
    },
    {
      name: "小摩托",
      id: "xiaomotuo",
      originSinger: "unknown",
      singer: "鹿野灸",
      duration: 300,
    },
    {
      name: "山妖",
      id: "shanyao",
      originSinger: "unknown",
      singer: "鹿野灸",
      duration: 300,
    },
  ];
}

export function getSongById(id: string) {
  const songs = getAllSongs();
  return songs.find(song => song.id === id);
}
