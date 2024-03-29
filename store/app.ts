export const useAppStore = defineStore("app", () => {
  const showHeader = ref(true);
  const showPlayerBar = ref(false);
  const headerHeight = ref("4rem");
  const playerBarHeight = ref("71px");
  const lockScroll = ref(false);
  // 0px for calc css
  const paddingTop = computed(() => showHeader.value ? headerHeight.value : "0px");
  const paddingBottom = computed(() => showPlayerBar.value ? playerBarHeight.value : "0px");

  return {
    showHeader,
    showPlayerBar,
    headerHeight,
    playerBarHeight,
    lockScroll,
    paddingTop,
    paddingBottom,
  };
});
