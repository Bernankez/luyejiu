import { defineConfig, presetIcons, presetUno, transformerDirectives } from "unocss";
import { amber, deepOrange, gray, primary, red, yellow } from "./styles/color";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
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
});
