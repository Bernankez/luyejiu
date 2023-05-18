import type { InjectionKey } from "nuxt/dist/app/compat/capi";

export const OnItemClickKey: InjectionKey<(value?: string | number) => void> = Symbol("on-item-click");

export const CloseContentKey: InjectionKey<() => void> = Symbol("close-content");
