# 小程序
::: tip
  微信小程序是腾讯开放平台的一款快应用，快速开发，快速应用。有业务就有需求，需要快速进入开发，有前路人照亮道路，不用盲目开路，这里是根据简书一斤代码大佬的博客而来，先从小程序原生项目介绍 。
:::
## mpvue小程序
  *前段时间，美团开源了 `mpvue` 这个项目，`mpvue` 是一款基于 ` vue.js` 的开发框架，使用vue的模式去开发项目将会自动编译成微信小程序所需要的项目文件。这使得我们又多了一种用来开发小程序的框架选项。由于mpvue框架是完全基于Vue框架的（重写了其` runtime` 和` compiler` ），因此在用法上面是高度和Vue一致的（某些功能由于受限于小程序环境本身的原因而不能使用），这给使用过Vue开发Web应用的前端开发者提供了极低的切换门槛来开发小程序。*
### 1、小程序目录文件介绍
  ![name](../.vuepress/public/images/mpvue01.png '描述')
### 2、小程序开发准备
  微信公众平台注册小程序：[https://mp.weixin.qq.com/](https://mp.weixin.qq.com/)
### 3、本地开发环境搭建
  * node.js 请戳[Node 安装](../blog/Linux.md#Node安装)
  * `vue-cli` 是一个vue专用的项目脚手架工具，可以用于方便的创建vue项目骨架代码，包括我们要讲到的mpvue的项目代码。我们可以通过安装node.js后里面包含的npm工具来安装vue-cli，在命令行输入如下命令：
    ```sh
      npm install vue-cli -g
    ```
    ```sh
      vue

      // 成功的话会输出如下内容：
      // Usage: vue <command> [options]
      //
      // Options:
      //
      //    -V, --version  output the version number
      //    -h, --help     output usage information
      //
      // Commands:
      //
      //    init           generate a new project from a template
      //    list           list available official templates
      //    build          prototype a new project
      //    create         (for v3 warning only)
      //    help [cmd]     display help for [cmd]
    ```
  * 微信开发者工具
    * 这个工具是开发、调试和模拟运行微信小程序的最核心的工具了，所以必须安装。
      *下载地址：[直达](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)*
  * Visual Studio Code + Vetur

    *Visual Studio Code（简称vscode）是现在非常流行的一个轻量级代码编辑器，拥有非常多好用的辅助开发插件，在我的文章中我都会使用这个编辑器来编辑代码。当然，好用的代码编辑器有很多，比如Sublime Text、WebStorm等，同样可以达到我们的开发目的，你也尽管用你自己最喜欢的代码编辑器来写代码就行了。*
    下载地址：[https://code.visualstudio.com](https://code.visualstudio.com)
    安装完vscode后，在它的插件管理器中，查找` Vetur` 并安装，然后重启一下vscode后，插件即生效:
    ![name](../.vuepress/public/images/mpvue02.png '描述')
### 4、快速开始创建
  * 这里使用vue-cli脚手架搭建目录
    ```sh
      vue init mpvue/mpvue-quickstart myDelivery
    ```
    ![name](../.vuepress/public/images/mpvue03.png '描述')
    ![name](../.vuepress/public/images/mpvue04.png '描述')
  * 创建命令可以全部默认一路回车即可，创建完成后进入项目目录
  * 在目录内打开命令行工具，输入` cnpm i`  或者 ` npm i` 安装依赖
    ```sh
      cnpm i
    ```
  * 安装完依赖后再输入` npm run dev` 运行项目,会自动生成 `dist` 文件夹，这个就是小程序的真正运行代码.
  * 然后把下载好的微信开发者工具打开，打开mydelivery目录
    ![name](../.vuepress/public/images/mpvue05.png '描述')
    ![name](../.vuepress/public/images/mpvue06.png '描述')
    ![name](../.vuepress/public/images/mpvue07.png '描述')
  * 这样微信小程序就运行在了开发工具中。但是我们不使用它自带的编辑器，因为我们是使用mpvue开发，所以使用vscode或者其他开发工具打开项目文件。
    ![name](../.vuepress/public/images/mpvue08.png '描述')
  * 记得在微信开发者工具的菜单》设置 》编辑设置 中，将“保存时自动编译小程序”勾选上，这样当mpvue的代码自动编译完成后，模拟器才会自动刷新界面。
    ![name](../.vuepress/public/images/mpvue09.png '描述')
### 5、业务开发
  * 我们整理目录结构成适合自己的开发方式，这里继续沿用vue+vuex开发模式
  * 其中` project.config.json` 文件是用于管理微信开发者工具的小程序项目的配置文件，其中记录了小程序的appid、代码主目录、以及编译选项等等信息，在微信开发者工具中导入小程序项目的时候主要是通过该配置文件读取和写入配置信息。
  * 程序入口,微信原生开发入口有三个重要文件
    * app.json
    * app.js
    * index.vue
  * app.json
    * app.json是小程序的全局配置文件，其包含了小程序的页面文件路径配置、窗口的全局样式信息、底部选项卡式菜单栏的配置，以及一些小程序网络超时的配置等等。
    * 在mpvue项目文件中对应的文件就是src/main.js，我们可以在这里进行配置。
      ```json
        {
        "pages": [
          "pages/index/main",
          "pages/logs/main",
          "pages/counter/main",
          "pages/moviesDetail/main",
          "pages/citySelect/main",
          "pages/search/main"
        ],
        "window": {
          "backgroundTextStyle": "light",
          "navigationBarBackgroundColor": "#fff",
          "navigationBarTitleText": "WeChat",
          "navigationBarTextStyle": "black"
        },
        "tabBar": {
          "color": "#999",
          "backgroundColor": "#fafafa",
          "selectedColor": "#333",
          "borderStyle": "white",

          "list": [{
            "text": "首页",
            "pagePath": "pages/index/main",
            "iconPath": "static/tabs/home.png",
            "selectedIconPath": "static/tabs/home-active.png"
          }, {
            "text": "订单",
            "pagePath": "pages/logs/main",
            "iconPath": "static/tabs/orders.png",
            "selectedIconPath": "static/tabs/orders-active.png"
          }],
          "position": "bottom"
        }
      }
      ```
  * app.js
    * ` app.js` 中包含了小程序的各种原生生命周期方法，如onLaunch、onShow等等。而在mpvue中，它使用了一个简单的Vue组件` App.vue` 来实现等价的功能。我们在这个App.vue组件中可以编写小程序的生命周期方法（通常使用Vue的生命周期方法，但也兼容原生的生命周期方法），也可以在其中加入小程序的全局样式（等价于原生方式下的` app.wxss` 
      ```vue
        <script>
        export default {
          created () {
            // 调用API从本地缓存中获取数据
            /*
            * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
            * 微信：mpvue === wx, mpvuePlatform === 'wx'
            * 头条：mpvue === tt, mpvuePlatform === 'tt'
            * 百度：mpvue === swan, mpvuePlatform === 'swan'
            * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
            */

            let logs
            if (mpvuePlatform === 'my') {
              logs = mpvue.getStorageSync({key: 'logs'}).data || []
              logs.unshift(Date.now())
              mpvue.setStorageSync({
                key: 'logs',
                data: logs
              })
            } else {
              logs = mpvue.getStorageSync('logs') || []
              logs.unshift(Date.now())
              mpvue.setStorageSync('logs', logs)
            }
          },
          log () {
            console.log(`log at:${Date.now()}`)
          }
        }
        </script>

        <style>
        .container {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 200rpx 0;
          box-sizing: border-box;
        }
        body{
          background-color: #eeeeee;
        }
        /* this rule will be remove */
        * {
          transition: width 2s;
          -moz-transition: width 2s;
          -webkit-transition: width 2s;
          -o-transition: width 2s;
        }
        </style>
      ```
    * 接着，这个App.vue组件被src/main.js引入并被设置了一个mpType的属性值，其值为app。这个值是为了与后面要讲的小程序页面组件所区分开来，因为小程序页面组件和这个App.vue组件的写法和引入方式是一致的，为了区分两者，需要设置mpType值。引入这个App.vue组件后，会用它作为参数来创建一个Vue的实例，并调用$mount()方法加载。下面是这个过程的关键代码行
      ```javascript
        import Vue from 'vue'
        import App from './App'
        import { openWin, redirectTo, backBeaforWin } from './utils/common'
        import store from './store'
        import './scss/common.scss'

        // 把通用方法挂载到Vue原型上
        Vue.prototype.$openWin = openWin
        Vue.prototype.$redirectTo = redirectTo
        Vue.prototype.$backBeaforWin = backBeaforWin
        Vue.prototype.$store = store

        Vue.config.productionTip = false
        App.mpType = 'app'

        const app = new Vue(App)
        app.$mount()
      ```
  * 首页及其他页面
    * 每个小程序都至少需要一个页面，而每个页面都需要占用一个目录，包含两个必须文件，一个用于实现主体的` .vue` 文件和一个将这个页面生成Vue实例并加载的` main.js` 文件。后面的所有mpvue页面都需要包含这两个文件。另外一个` main.json` 属于配置文件，配置页面相关熟悉及引入ui组件。
    * main.js
      ```javascript
        import Vue from 'vue'
        import App from './index'

        // add this to handle exception
        Vue.config.errorHandler = function (err) {
          if (console && console.error) {
            console.error(err)
          }
        }

        const app = new Vue(App)
        app.$mount()
      ```
    * main.json
      ```json
        {
          "navigationBarTitleText": "汪聪的电影推荐",
          "usingComponents": {
            "i-badge": "../../../static/iview/badge/index",
            "i-input": "../../../static/iview/input/index",
            "i-icon": "../../../static/iview/icon/index",
            "i-sticky": "../../../static/iview/sticky/index",
            "i-sticky-item": "../../../static/iview/sticky-item/index",
            "i-notice-bar": "../../../static/iview/notice-bar/index"
          }
        }
      ```
    * index.vue
      ```vue
        <template>
          <div class="counter-warp">
            <p>Vuex counter：{{ count }}</p>
            <p>
              <button @click="increment">+</button>
              <button @click="decrement">-</button>
            </p>
          </div>
        </template>

        <script>
        // Use Vuex
        import store from './store'

        export default {
          computed: {
            count () {
              return store.state.count
            }
          },
          methods: {
            increment () {
              store.commit('increment')
            },
            decrement () {
              store.commit('decrement')
            }
          }
        }
        </script>

        <style>
        .counter-warp {
          text-align: center;
          margin-top: 100px;
        }
        .home {
          display: inline-block;
          margin: 100px auto;
          padding: 5px 10px;
          color: blue;
          border: 1px solid blue;
        }
        </style>
      ```
### 6、微信原生API的使用
  * 开发微信小程序对应的就离不开使用微定义的api进行开发，这里使用获取用户授权及用户信息为例。
    ```javascript
      wx.getSetting({
        success(res) {
          console.log(res.authSetting)
          // res.authSetting = {
          //   "scope.userInfo": true,
          //   "scope.userLocation": true
          // }
        }
      })
    ```
  * 首先判断用户是否授权，使用`wx.getSetting`，而在mpvue中我们需要这么处理。在vue中methods内定义一个函数`getSetting`，其中调用微信的api，然后在生命周期`onShow`中进行调用。这样当用户访问就会执行微信api判断是否已经授权。
    ```vue
      export default {
        methods: {
          getSetting() {
            wx.getSetting({
              success(res) {
                if (res.authSetting["scope.userInfo"]) {
                  that.loginVisible = false
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  wx.getUserInfo({
                    success: function(e) {
                      console.log("已授权获取用户信息", e);
                      that.setUserInfo(e);
                      wx.login({
                        success(res) {
                          if (res.code) {
                            console.log("获取登录凭证", res.code);
                            that.loginForm.city = e.userInfo.city
                            that.loginForm.code = res.code
                            that.loginForm.nickName = e.userInfo.nickName
                            console.log('用户资料语言', e.userInfo.language, '默认语言', that.$i18n.locale)
                            if (e.userInfo.language === 'zh_CN' || e.userInfo.language === 'en') {
                              that.setLanguage(e.userInfo.language)
                              that.$i18n.locale = e.userInfo.language
                            } else {
                              console.log('其他语言，默认使用en')
                              that.setLanguage('en')
                              that.$i18n.locale = 'en'
                            }
                            // 发起网络请求
                            that.loginWx({
                              city: e.userInfo.city,
                              code: res.code,
                              nickName: e.userInfo.nickName
                            });
                          } else {
                            console.log("登录失败！" + res.errMsg);
                          }
                        }
                      });
                    }
                  });
                } else {
                  that.loginVisible = true
                }
              }
            });
          }
        },
        onShow() {
          this.getSetting()
        }
      }
    ```
  * ` wx.authorize` 会调用弹窗进行授权，如果授权就不会弹窗并且执行` wx.getUserInfo` 请求用户信息。如果没有授权就会调用` wx.authorize` 跳出授权页面。
  * *根据最新api显示，getUserInfo将不会弹窗授权窗口，需要开发人员进行引导设置。官方建立使用button点击授权。*
    ```vue
      <template>
        <button class='bottom' type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo" @click="getUserInfoClick">
            授权登录
        </button>
      </template>
    ```
    * 如果没有授权，需要引导用户进行点击授权，将会调用` bindGetUserInfo` 事件,授权成功后可以调用` wx.login` 获取到code 用户登录凭证（有效期五分钟）

<Vssue title="Vssue Demo" />
  
