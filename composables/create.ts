import type { AnyFn } from "@vueuse/core";
import type { EffectScope } from "vue";

export function createPersistentSharedComposable<Fn extends AnyFn>(composable: Fn) {
  let subscribers = 0;
  let state: ReturnType<Fn> | undefined;
  let scope: EffectScope | undefined;

  const dispose = () => {
    subscribers -= 1;
    if (subscribers < 0) {
      subscribers = 0;
    }
  };

  const stop = () => {
    if (scope) {
      scope.stop();
      state = undefined;
      scope = undefined;
      subscribers = 0;
    }
  };

  const fn = <Fn>((...args) => {
    subscribers += 1;
    if (!state) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }
    tryOnScopeDispose(dispose);
    return state;
  });

  return {
    composable: fn,
    stop,
  };
}
