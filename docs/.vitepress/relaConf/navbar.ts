import { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.NavItem[] = [
  {
    text: '首页',
    link: '/'
  },
  {
    text: '个人成长',
    items: [
      {
        text: '大江南北游记',
        link: '/column/travel/'
      },
      {
        text: '城市印象',
        link: '/column/travel/wuhan'
      },
      {
        text: '所思·所想',
        link: '/column/growing/001我的前半生'
      }
    ]
  },
  {
    text: '大前端',
    items: [
      {
        text: '项目踩坑指南',
        link: '/column/web/001项目踩坑指南'
      },
      {
        text: '大文件分片上传-断点续传',
        link: '/column/web/002大文件分片上传-断点续传'
      },
      {
        text: '热力图',
        link: '/column/web/003热力图'
      }
    ]
  },
  // {
  //   text: '关于我',
  //   items: [
  //     { text: 'Github', link: 'https://github.com/Jacqueline712' },
  //     {
  //       text: '掘金',
  //       link: 'https://juejin.cn/user/3131845139247960/posts'
  //     },
  //     {
  //       text: '飞书社区',
  //       link: 'https://pzfqk98jn1.feishu.cn/wiki/space/7193915595975491587?ccm_open_type=lark_wiki_spaceLink'
  //     },
  //     {
  //       text: '知乎',
  //       link: 'https://www.zhihu.com/people/zheng-zi-ji-67-89/posts'
  //     }
  //   ]
  // }
];