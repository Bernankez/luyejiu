export const useAppStore = defineStore("app", {
  state: () => ({
    // in most cases, pages should handle padding-top itself
    contentPaddingTop: false,
    headerHeight: "4rem",
    contentPaddingBottom: true,
    playerBarHeight: "71px",
  }),
});
