import type { InjectionKey } from "vue";

export const onActiveKey: InjectionKey<(el: HTMLElement) => void> = Symbol("on-active");
