module.exports = {
  title: 'Aaron的博客',
  description: 'wangcong\'s blog',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    // ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
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
      { text: '个人门户', link: 'http://wangcong.wang' }
    ],
    sidebar: {
      '/blog/': [
        '',     /* /foo/ */
        ['markDown', 'MarkDown基本使用'],
        ['wxApplet', '微信小程序']
      ],
      '/': [
        '',        /* / */
      ]
    }, // 侧边栏配置
    sidebarDepth: 3, // 侧边栏显示2级
    lastUpdated: 'Last Updated',

    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'vuejs/vuepress',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',
  }
};