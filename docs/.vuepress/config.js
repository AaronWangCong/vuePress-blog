module.exports = {
  title: 'AWC技术博文',
  keywords: 'AWC,AWC技术博文,Aaron,AaronWangCong,wangcong,前端汪聪,vue,nuxt,node,ngnix,pm2,服务端渲染',
  description: 'AWC技术博文是汪聪个人门户网站的一个独立子站，包括html、CSS、vue、nuxt、javascript、小程序、pm2等技术知识，致力于开源一份简洁标准的前端技术博文网站。',
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
        ['WorldPress', '十、WorldPress'],
        ['SEO', '十一、SEO搜索引擎'],
        ['optimization', '十二、网站优化'],
        ['markDown', '十三、MarkDown'],
        ['Linux', '十四、Linux'],
        ['deploy', '十五、部署'],
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
    serviceWorker: {
      updatePopup: true, // Boolean | Object, 默认值是 undefined.
      // 如果设置为 true, 默认的文本配置将是: 
      updatePopup: { 
         message: "有新内容更新，是否刷新", 
         buttonText: "刷新" 
      }
    }
  },
  plugins: {
    '@vssue/vuepress-plugin-vssue': {
      // 设置 `platform` 而不是 `api`
      platform: 'github',

      // 其他的 Vssue 配置
      owner: 'AaronWangCong',
      repo: 'vuePress-blog',
      //clientId: '6c7c0041f7e0b5868d89',
      //clientSecret: 'fad6af6bb3a5dc07e7f82df3757a37ff7fd7b777',

      clientId: '24eec55e1c31822a7ed1',
      clientSecret: 'a4c27e5795f780ca67484da3f24cf0de9740dfd7',
    },
  },
};