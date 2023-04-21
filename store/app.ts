export const useAppStore = defineStore("app", () => {
  const showHeader = ref(true);
  const showPlayerBar = ref(true);
  const headerHeight = ref("4rem");
  const playerBarHeight = ref("71px");
  const paddingTop = computed(() => showHeader.value ? headerHeight.value : "0");
  const paddingBottom = computed(() => showPlayerBar.value ? playerBarHeight.value : "0");

  return {
    showHeader,
    showPlayerBar,
    headerHeight,
    playerBarHeight,
    paddingTop,
    paddingBottom,
  };
});
