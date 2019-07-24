module.exports = {
  title: 'WCA技术博文',
  keyswords: 'WCA,WCA技术博文,Aaron,AaronWangCong,wangcong,前端汪聪,vue,nuxt,node,ngnix,pm2,服务端渲染',
  description: 'WCA技术博文是汪聪个人门户网站的一个独立子站，包括html、CSS、vue、nuxt、javascript、小程序、pm2等技术知识，致力于开源一份简洁标准的前端技术博文网站。',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: `/photo.jpg` }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  host: 'doc.wangcong.com',
  port: 1315,
  serviceWorker: true, // 是否开启 PWA
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav:[ // 导航栏配置
      { text: 'Home', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '个人门户', link: 'http://home.wangcong.wang' }
    ],
    sidebar: {
      '/blog/': [
        ['', '一、前言及目录'],
        ['JavaScript', '二、JavaScript'],
        ['Jquery', '三、JQuery'],
        ['H5C3', '四、HTML、CSS'],
        ['animation', '五、动画'],
        ['wxApplet', '六、小程序'],
        ['Vue', '七、Vue.js'],
        ['Nuxt', '八、Nuxt.js'],
        ['Node', '九、Node.js'],
        ['SEO', '十、SEO搜索引擎'],
        ['optimization', '十一、网站优化'],
        ['markDown', '十二、MarkDown'],
        ['Linux', '十三、Linux'],
      ],
      '/': [
        '',        /* / */
      ]
    }, // 侧边栏配置
    sidebarDepth: 3, // 侧边栏显示2级
    lastUpdated: '最后更新',

    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'https://github.com/AaronWangCong/vuePress-blog.git',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',
  }
};