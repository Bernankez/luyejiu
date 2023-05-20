import { defineConfig, presetIcons, presetUno, presetWebFonts, transformerDirectives } from "unocss";
import { amber, deepOrange, gray, primary, red, yellow } from "./styles/color";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      provider: "google",
      fonts: {
        happy: "ZCOOL KuaiLe",
      },
    }),
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      primary,
      gray,
      amber,
      yellow,
      red,
      deepOrange,
    },
  },
  preflights: [
    {
      getCSS: () => `
          * {
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            -webkit-tap-highlight-color:transparent;
          }

          html, body, #__nuxt {
            height: 100%;
            width: 100%;
          }

          body {
            min-height: 100%;
            display: flex;
            overflow-x: hidden;
          }
        `,
    },
  ],
});
