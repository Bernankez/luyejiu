export default defineI18nLocale(async (_context, _locale) => {
  return {
    player: {
      releaseToSwitchPrev: "Switch to previous",
      releaseToSwitchNext: "Switch to next",
    },
    header: {
      homepageItem: "homepage",
      phonographItem: "phonograph",
      aboutItem: "about",
      bilibiliItem: "visit Bilibili",
      githubItem: "GitHub",
    },
    song: {
      myFavorite: "My favorite",
    },
    welcome: "Welcome",
  };
});
