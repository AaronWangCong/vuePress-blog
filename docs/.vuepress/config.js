module.exports = {
  title: 'WC技术博文',
  description: 'wangcong\'s blog',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: `/logo.jpg` }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  host: 'blog.wangcong.wang',
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
        ['', '一、前言'],
        ['JavaScript', '二、JavaScript'],
        ['Jquery', '三、JQuery'],
        ['H5C3', '四、HTML、CSS'],
        ['animation', '五、动画'],
        ['wxApplet', '六、mpVue小程序'],
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