import { findArtists } from "./artist";
import { run } from "./run";
import { findSongs, findSongsByIds } from "./song";

// run([addArtist, addSong]);

run([findSongs, findArtists, findSongsByIds]);
