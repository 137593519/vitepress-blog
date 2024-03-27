import { DefaultTheme } from 'vitepress';
export const sidebar: DefaultTheme.Sidebar = {
  // '/column/travel/': [
  //   {
      
  //     text: '大江南北游记',
  //     link: '/column/web/001项目踩坑指南',
  //     items: [
  //       {
  //         text: '栈-深拷贝和浅拷贝',
  //         link: '/column/web/002文章测试'
  //       },
  //       {
  //         text: '队列-事件循环',
  //         link: '/column/web/003文章测试'
  //       }
  //     ]
  //   },
  // ],
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