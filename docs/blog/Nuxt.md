# Nuxt.js
::: tip
  `Nuxt.js` 是一个用于创建Vue.js应用程序的框架。其目标是帮助Vue开发人员以快速，简单和有条理的方式利用顶尖技术和功能。
  * SEO与服务器端渲染（SSR）
  * 预渲染
  * pm2项目部署
:::
## 起步
### 1、快速创建项目
  * nuxt.js官方文档[nuxt.js安装](https://zh.nuxtjs.org/guide/installation/)。
  * 为了快速入门，Nuxt.js团队创建了脚手架工具 [create-nuxt-app](https://github.com/nuxt/create-nuxt-app)。
  * 确保安装了npx（npx在NPM版本5.2.0默认安装了）：
    ```sh
      npx create-nuxt-app nuxtDemo
      or
      yarn create nuxt-app nuxtDemo
    ```
  * 它会让你进行一些选择:(这里我大多选择默认，其他的请去官网查看)
  * 1.在集成的服务器端框架之间进行选择:
    * None (Nuxt默认服务器)   <----
    * Express
    * Hapi
    * Feathers
    * Micro
    * Adonis (WIP)
  * 2、选择您喜欢的UI框架:
    * None (无)
    * [Bootstrap](https://github.com/bootstrap-vue/bootstrap-vue)
    * [Vuetify](https://github.com/vuetifyjs/vuetify)
    * [Bulma](https://github.com/jgthms/bulma)
    * [Tailwind](https://github.com/tailwindcss/tailwindcss)
    * [Element UI](https://github.com/ElemeFE/element)              <----
    * [Ant Design Vue](https://github.com/vueComponent/ant-design-vue)
    * [Buefy](https://buefy.org/)
  * 3、选择你想要的Nuxt模式 `(Universal or SPA)`
  * 4、添加 `axios module` 以轻松地将HTTP请求发送到您的应用程序中。
  * 5、添加 `EsLint` 以在保存时代码规范和错误检查您的代码。
  * 6、添加 `Prettier` 以在保存时格式化/美化您的代码。
  * 当运行完时，它将安装所有依赖项，因此下一步是启动项目:
  ```sh
    cd nuxtDemo
    npm run dev

    //  应用现在运行在 http://localhost:3000 上运行。
  ```
  ::: warning
  注意：Nuxt.js 会监听 `pages` 目录中的文件更改，因此在添加新页面时无需重新启动应用程序。
  :::
### 2、打包部署
  * 服务器部署 `nuxt build` 后 `nuxt start`
  * 静态站点部署  `nuxt generate`
  * 你可以将这些命令添加至 package.json：
    ```javascript
      "scripts": {
        "dev": "nuxt",
        "build": "nuxt build",
        "start": "nuxt start",
        "generate": "nuxt generate"
      }
    ```
  * 本地打包，执行 `npm run build` 打包，上传如下文件到服务器对应目录
    * .nuxt
    * nuxt.config.js
    * static
    * package.json
  * `package.json` 说明, `dev` 中是本地启动端口， `start` 是服务器启动端口
    ```javascript
      {
        "name": "home-sendatek",
        "version": "1.0.0",
        "description": "My phenomenal Nuxt.js project",
        "author": "wangcong",
        "private": true,
        "scripts": {
          "dev": "nuxt --port 3006",
          "build": "nuxt build",
          "start": "nuxt start --port 3006",
          "generate": "nuxt generate"
        },
        "dependencies": {
          "cross-env": "^5.2.0",
          "element-ui": "^2.4.11",
          "iview": "^3.4.2",
          "nuxt": "^2.0.0",
          "nuxt-fullpage.js": "^0.0.3",
          "vant": "^2.0.2",
          "vue-i18n": "^7.8.1"
        },
        "devDependencies": {
          "nodemon": "^1.18.9",
          "@nuxtjs/axios": "^5.3.6",
          "@nuxtjs/proxy": "^1.3.1",
          "node-sass": "^4.10.0",
          "sass-loader": "^7.1.0",
          "vue-style-loader": "^4.1.2"
        }
      }
    ```
### 3、pm2服务器守护
  * `pm2` linux环境安装请看Linux目录或者戳 [pm2安装](../blog/Linux.md#PM2进程守护安装)直达。
  * `cd` 到linux项目根目录下运行
  ```sh
    pm2 start npm --name 'nuxtDemo' -- run start
  ```
  * 执行 `pm2 list` 查看项目是否成功，注意观察 `restart` 项中数字是否增加，增加表示项目自动重启了，证明没有启动成功。
  ![name](../.vuepress/public/images/nuxt01.png '描述')
    *当然，也可以输入 `curl 127.0.0.1:项目端口` 访问是否成功，但是最直观排除pm2是否启动成功的还是创建完成后执行一次或者两次 `pm2 list` 查看项目有没有自动重启。*
  * 如果项目在自动重启或者状态为 `error` or `stopped` 证明项目启动失败，执行 `pm2 stop id` 或 `pm2 stop appname` 停止项目。
    ```sh
      pm2 list   // 查看pm2启动项目list
      pm2 restart ip/appname  // 重启某个项目
      pm2 del ip/appname  // 删除项目
      pm2 stop ip/appname  // 停止项目
      pm2 show ip/appname  // 查看某个项目详细
    ```
### 4、ngnix代理访问
  * ngnix安装环境请看Linux目录或者戳 [ngnix安装](../blog/Linux.md#Nginx安装)直达。
  * 确保nuxt项目运行成功，ngnix只是进行代理访问
  * ngnix配置，加入项目启动端口为 `3006`,访问 `sendatek.wangcong.wang` 就会被代理到3006端口，也就是项目启动端口
    ```conf
      #负载均衡服务器
      upstream home-sendatek{
        server 127.0.0.1:3006 weight=5 max_fails=2 fail_timeout=600s;
      }


      ## home-sendatek
      server {
          listen       80;
          server_name sendatek.wangcong.wang;
      
        location / {
                proxy_pass http://home-sendatek;
            }
        # return 301 https://$host$request_uri;   # 对http协议访问网站的请求重定向到https协议下
        # rewrite ^(.*)$ https://new.wangcong.wang; 
      }
    ```
## 第三方js执行
### 1、Window 或 Document 对象未定义？
  *这是因为一些只兼容客户端的脚本被打包进了服务端的执行脚本中去。 对于只适合在客户端运行的脚本，需要通过使用 `process.client` 变量来判断导入。*
  ```javascript
    if (process.client) {
      require('external_library')
    }
  ```
# 既然大侠光临，不如留一手评论

<Vssue title="Vssue Demo" />
  
