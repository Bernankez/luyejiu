import { customAlphabet } from "nanoid";

export function shuffle<T = any>(array: T[]) {
  const copy = [...array];
  copy.sort(() => Math.random() - 0.5);
  return copy;
}

export function noop() {}

export function pickRandom<T>(things: T[]) {
  return things[Math.floor(Math.random() * things.length)];
}

export const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12);
