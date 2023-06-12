export default defineI18nLocale(async (_locale) => {
  return {
    homepage: {
      introduction: "A ten-year-old boy VUP transformed by clouds!",
    },
    player: {
      releaseToSwitchPrev: "Switch to previous",
      releaseToSwitchNext: "Switch to next",
    },
    header: {
      homepageItem: "homepage",
      phonographItem: "phonograph",
      aboutItem: "about",
      bilibiliItem: "visit Bilibili",
      tiktokItem: "visit TikTok",
      githubItem: "GitHub",
    },
    songListMenu: {
      addNext: "Add to next",
      copyLink: "Copy link",
      download: "Download",
    },
    playlistMenu: {
      inputPlaceholder: "Artist, song, and more",
    },
    song: {
      myFavorite: "My favorite",
    },
    welcome: "Welcome",
  };
});
