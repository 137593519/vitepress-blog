import { DefaultTheme } from "vitepress";
export const sidebar: DefaultTheme.Sidebar = {
  "/column/growing/": [
    {
      text: "个人成长",
      items: [
        // {
        //   text: '南北游记',
        //   link: '/column/travel/',
        // },
        {
          text: "所思·所想",
          link: "/column/growing/001我的前半生",
        },
      ],
    },
  ],
  "/column/travel/": [
    {
      text: "城市印象",
      items: [
        {
          text: "武汉",
          link: "/column/travel/wuhan",
        },
        {
          text: "长沙",
          link: "/column/travel/changsha",
        },
      ],
    },
  ],
  "/column/web/": [
    {
      text: "大前端demo与案例",
      items: [
        {
          text: "项目踩坑指南",
          link: "/column/web/001项目踩坑指南",
        },
        {
          text: "大文件分片上传-断点续传",
          link: "/column/web/002大文件分片上传-断点续传",
        },
        {
          text: "热力图",
          link: "/column/web/003热力图",
        },
        {
          text: '虚拟列表',
          link: '/column/web/004虚拟列表'
        }
      ],
    },
  ],
};
