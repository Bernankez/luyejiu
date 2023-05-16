import type { ComponentPublicInstance } from "vue";

export type MaybeElement<T> = T | ComponentPublicInstance | null | undefined;

export function unwrapElement<T>(element: MaybeElement<T>) {
  return ((element as Exclude<MaybeElement<T>, T>)?.$el ?? element) as Exclude<
    MaybeElement<T>,
    ComponentPublicInstance
  >;
}
