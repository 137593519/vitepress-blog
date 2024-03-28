import { DefaultTheme } from 'vitepress';
export const sidebar: DefaultTheme.Sidebar = {
  '/column/growing/': [
    {
      
      text: '个人成长',
      items: [
        // {
        //   text: '南北游记',
        //   link: '/column/travel/',
        // },
        {
          text: '所思·所想',
          link: '/column/growing/001我的前半生'
        }
      ]
    },
  ],
  '/column/web/': [
    {
      text: '项目踩坑指南',
      link: '/column/web/001项目踩坑指南',
      items: [
        {
          text: '栈-深拷贝和浅拷贝',
          link: '/column/web/002文章测试'
        },
        {
          text: '队列-事件循环',
          link: '/column/web/003文章测试'
        }
      ]
    },
  ]
};