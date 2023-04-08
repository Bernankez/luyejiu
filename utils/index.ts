function shuffle<T = any>(array: T[]) {
  const copy = [...array];
  copy.sort(() => Math.random() - 0.5);
  return copy;
}
