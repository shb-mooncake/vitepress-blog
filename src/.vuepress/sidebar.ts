import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "性能优化",
      icon: "book",
      prefix: "SEO/",
      link: "SEO/",
      children: "structure",
    },
    {
      text: "设计模式",
      icon: "book",
      prefix: "algorithm/",
      link: "algorithm/",
      children: "structure",
    },
    // "intro",
    // "slides",
  ],
});
