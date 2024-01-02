import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/vitepress-blog/",
  
  lang: "zh-CN",
  title: "moonandcake",
  description: "",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
