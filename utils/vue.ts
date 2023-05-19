import type { Slot, VNode, VNodeChild } from "vue";
import { Comment, Fragment, createTextVNode } from "vue";

export function createSlot<T extends Slot<any>>(slot?: T, name?: string) {
  const slotRef = ref<ComponentPublicInstance | HTMLElement>();

  const slotVNode = computed(() => slotToVNode(slot, name));

  const CustomSlot = defineComponent(() => {
    return () => h(slotVNode.value, { ref: slotRef });
  });

  return makeDestructurable(
    { CustomSlot, slotRef } as const,
    [CustomSlot, slotRef] as const,
  );
}

const textVNodeType = createTextVNode("").type;

export function slotToVNode<T extends Slot<any>>(slot?: T, name?: string) {
  const slotName = `slot${name ? `[${name}]` : ""}`;
  if (!slot) {
    consola.warn(`${slotName} should not be empty`);
    return h("span");
  }
  const slots = flatten(slot());
  if (slots.length > 1) {
    consola.warn(`${slotName} should only have one exactly child`);
  }
  const defaultSlot = slots[0];
  if (defaultSlot.type === textVNodeType) {
    return h("span", defaultSlot);
  }
  return defaultSlot;
}

// o(n) flatten
export function flatten(
  vNodes: VNodeChild[],
  filterCommentNode = true,
  result: VNode[] = [],
): VNode[] {
  vNodes.forEach((vNode) => {
    if (vNode === null) { return; }
    if (typeof vNode !== "object") {
      if (typeof vNode === "string" || typeof vNode === "number") {
        result.push(createTextVNode(String(vNode)));
      }
      return;
    }
    if (Array.isArray(vNode)) {
      flatten(vNode, filterCommentNode, result);
      return;
    }
    if (vNode.type === Fragment) {
      if (vNode.children === null) { return; }
      if (Array.isArray(vNode.children)) {
        flatten(vNode.children, filterCommentNode, result);
      }
      // rawSlot
    } else if (vNode.type !== Comment) {
      result.push(vNode);
    }
  });
  return result;
}
