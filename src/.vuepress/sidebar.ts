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
      text: "算法",
      icon: "book",
      prefix: "algorithm/",
      link: "algorithm/",
      children: "structure",
    },
    // {
    //   text: "文章",
    //   icon: "laptop-code",
    //   prefix: "posts/",
    //   children: "structure",
    // },
    // "intro",
    // "slides",
  ],
});
