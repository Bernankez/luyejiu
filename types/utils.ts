export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Stable<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
