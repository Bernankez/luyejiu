export default defineI18nLocale(async (_locale) => {
  return {
    homepage: {
      introduction: "2023 生日快乐！",
    },
    player: {
      releaseToSwitchPrev: "松手切换上一曲",
      releaseToSwitchNext: "松手切换下一曲",
    },
    header: {
      homepageItem: "主页",
      phonographItem: "留声机",
      aboutItem: "关于",
      bilibiliItem: "鹿野灸b站",
      tiktokItem: "鹿野灸抖音",
      githubItem: "GitHub",
    },
    songListMenu: {
      addNext: "下一首播放",
      copyLink: "复制歌曲链接",
      download: "下载",
    },
    playlistMenu: {
      inputPlaceholder: "歌手、歌曲以及更多内容",
    },
    song: {
      myFavorite: "我喜欢",
    },
    welcome: "欢迎",
  };
});
