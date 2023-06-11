export default defineI18nLocale(async (_locale) => {
  return {
    homepage: {
      introduction: "2023 Happy Birthday!",
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
