import { defineConfig } from 'vitepress'
import {  sidebar, nav } from './relaConf';
import {  } from "./theme";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "晓风残月のblog",
  description: "A VitePress Site",
  themeConfig: {
    logo:{ 
      src: '/avatar.jpg', 
      alt: 'logo',
      style: {
        'border-radius': '50%',
      },
    },
    
    // logo:'/avatar.jpg',

    // https://vitepress.dev/reference/default-theme-config
    nav: nav,
    sidebar: sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    outline: {
      level: [2, 6],
      label: '目录'
    }
  }
})
