# Vue.js
::: tip
  `Vue.js` 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与[现代化的工具](https://cn.vuejs.org/v2/guide/single-file-components.html)以及各种[支持类库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
:::

## 起步
### 1、安装
  * [Vue.js官方文档](https://cn.vuejs.org)
  * 对于制作原型或学习，你可以这样使用最新版本：

    ```html
      <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    ```
  * 在用 Vue 构建大型应用时推荐使用 NPM 安装。NPM 能很好地和诸如 [webpack](https://webpack.js.org/) 或 [Browserify](http://browserify.org/) 模块打包器配合使用。同时 Vue也提供配套工具来开发[**单文件组件**](https://cn.vuejs.org/v2/guide/single-file-components.html)。
    ```sh
      # 最新稳定版
      $ npm install vue
    ```

### 2、vue-cli构建
  * Vue 提供了一个[官方的 CLI](https://github.com/vuejs/vue-cli)，为单页面应用 (SPA) 快速搭建繁杂的脚手架。它为现代前端工作流提供了 batteries-included 的构建设置。只需要几分钟的时间就可以运行起来并带有热重载、保存时 lint 校验，以及生产环境可用的构建版本。更多详情可查阅 [Vue CLI 的文档](https://cli.vuejs.org/)。
  * Vue-cli(3.x)
    * 如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，你需要先通过 `npm uninstall vue-cli -g` 或 `yarn global remove vue-cli` 卸载它。
    ```sh
      # 官方新版vue-cli3.x
      npm install -g @vue/cli
      # OR
      yarn global add @vue/cli

      # 查看是否安装成功
      vue --version
      # 创建项目
      vue create hello-world
    ```
  * Vue-cli(2.x)
    * Vue CLI 3 和旧版使用了相同的 vue 命令，所以 Vue CLI 2 (vue-cli) 被覆盖了。如果你仍然需要使用旧版本的 `vue init` 功能，你可以全局安装一个桥接工具:
    ```sh
      npm install -g @vue/cli-init
      # 安装完后 就还可以使用 vue init 命令
      vue init webpack my_project
    ```

### 3、http请求封装
  * 好的请求封装能更好的适应业务的需求及编程的规范，网上封装很多，但都感觉杂乱（也可能是我菜）。这里先放上正在用的封装请求,主要由 `http` 和 `api` 两部分组成。是大佬[前端大户](https://www.lzzj.online/)封装.
    * http.js
    ```javascript
      import axios from 'axios'
      import qs from 'qs' // 需要qs支持 npm install qs


      export default (url = '', data = {}, type = 'GET', contentType) => {
        return new Promise((resolve, reject) => {
          let requestConfig = {
            method: type,
            url: url,
            headers: {
              'Accept': 'application/json',
              'Content-Type': contentType ? contentType : 'application/json'
            },
            timeout: 10000
          };

          switch (type.toUpperCase()) {
            case "GET":
              requestConfig.params = data;
              requestConfig.paramsSerializer = params => {
                return qs.stringify(params, { indices: false })
              };
              break;
            case "DELETE":
              requestConfig.params = data;
              break;
            case "POST":
              requestConfig.data = data;
              break;
            case "PUT":
              requestConfig.data = data;
              break;
          }

          if ((type === 'POST' || type === 'PUT') && contentType !== 'multipart/form-data') {
            requestConfig.data = contentType ? qs.stringify(data) : JSON.stringify(data);
          }

          axios(requestConfig).then((resp) => {
            resolve(resp.data);
          }).catch((err) => {
            reject(err);
          })
        });
      }
    ```

    * api.js
    ```javascript
      import http from './http'

      export const urlPrefix = "/sales/v1"

      /**
      *    示例
      */
      export const test1 = (data) => http(`${urlPrefix}/getInfo/${data.id}`, data, 'POST');  // post

      export const test2 = (data) => http(`${urlPrefix}/getInfo`, data, 'GET');  // get

      export const test3 = (data) => http(`${urlPrefix}/getInfo`, data, 'POST', 'multipart/form-data');  // formdata

    ```
  * 封装使用
    * actions.js (Vuex的使用请点击[**好用的Vuex**](../blog/Vue.md#vuex)直达)
    ```javascript
      // 在vuex中引入或者在页面组件中引入（建议请求都使用vuex管理）
      import { test1, test2, test3 } from '../../lib/api'

      export default {
        async test1A({dispatch, state, commit},params) {
          let obj = await test1(params);
          if(obj.flag) {
            commit('test1M',obj) // 传入vuex的mutations中进行数据处理
          }
        }
      }

    ```
### 4、Vuex
  * Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 [devtools extension](https://github.com/vuejs/vue-devtools)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。
  * 不多讲，[vuex文档](https://vuex.vuejs.org)
  * 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。Vuex 和单纯的全局对象有以下两点不同：
    1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
    2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
  * 安装
    * npm或yarn安装
    ```sh
      # npm 安装
      npm install vuex --save

      # Yarn 安装
      yarn add vuex
    ```
    * 在线引用
    ```html
      <script src="https://cdnjs.cloudflare.com/ajax/libs/vuex/3.0.1/vuex.js"></script>
    ```
  * vue中使用
    * vuex目录结构
    ```javascript
      ---src
        ---assets
        ---router
        ---store
            ---common
              ---index.js          // 对应页面入口文件，定义页面变量及暴露其他方法文件
              ---actions.js        // 对应页面请求方法.js
              ---mutations.js      // 对应页面请数据处理方法.js
              ---getters.js        // 对应页面数据处理共享，也就是计算属性存储
            ---login
              ---index.js
              ---actions.js
              ---mutations.js
              ---getters.js
            ---index.js             // vuex模块化入口文件，暴露出其他模块
    ```
    * main.js
    ```javascript
      import store from './store'
      new Vue({
        el: '#app',
        router,
        store,  // store
        components: { App },
        template: '<App/>'
      })
    ```
    * store/index.js
    ```javascript
      import Vue from 'vue';
      import Vuex from 'vuex';

      import common from "./common"
      import login from "./login"

      Vue.use(Vuex)
      const store = new Vuex.Store({
        modules : {
          common, //  公用模块
          login //  登录模块
        }
      })
      export default store;
    ```
    * store/common/index.js
    ```javascript
      import actions from './actions.js';
      import mutations from './mutations.js';
      import getters from './getters.js';

      const state = {
        // 定义了一个搜索对象
        searchForm: {
          name: ''
        }
        msgInfo: '', //..这里定义了一个返回结果
        num: 0, // 定义一个常量
      }
      export default {
      namespaced: true,
        state,
        getters,
        actions,
        mutations
      }
    ```
    * store/common/actions.js
    ```javascript
      // 从api.js中引入需要的请求api
      import { test1, test2, test3 } from '../../lib/api'

      export default {
        // 定义方法异步请求
        async test1A({dispatch, state, commit},params) {
          let obj = await test1(params);
          if(obj.flag) {
            commit('test1M',obj) // 传入vuex的mutations中进行数据处理
          }
        }
      }
    ```
    * store/common/mutations.js
    ```javascript
      export default {
        // 定义方法处理返回数据
        test1M(state,data) {
          // 给store中的变量赋值（加入返回的是我们需要的msg）
          state.msgInfo = data.msg
        }
      }
    ```
    * store/common/getters.js
    ```javascript
      export default {
        num(state) {
          // 给store中的变量赋值（加入返回的是我们需要的msg）
          return  state.num + 1
        }
      }
    ```
    * 在index.vue中调用
    ```vue
      <template>
        <div class="index-wrap">
        {{ num }}
        {{ msgInfo }}
        </div>
      </template>
      <script>
        import { mapState, mapActions, mapMutations, mapGetters } from 'vuex' //页面引入vuex
        export default {
          name: '',
          components: {
          },
          props:{
          },
          data() {
            return {
            }
          },
          computed: {
            ...mapState({
              msgInfo: state => state.common.msgInfo  //  从store中拿到字段
            }),
            ...mapGetters('common',{
              num: num, //  拿到num会变为1
            })
          },
          created() {
            this.test1A() //  传值与否根据业务进行，页面加载调用这个方法就会拿到后台返回的数据
          },
          mounted() {
            console.log(this.msgInfo) //  打印出字段
          },
          methods: {
            ...mapActions('common',['test1A']), //拿到请求方法
            ...mapMutions('common',['']), //也可在页面直接调用mutions中的方法处理数据,这里不多说
          }
        }
      </script>
      <style lang="scss">
      </style>
    ```
### 5、Sass在vue中的使用
  * 安装
    * sass的使用需要 `sass-loader` 以及 `node-sass` 的支持
    ```sh
      npm  install sass-loader --save-dev
      npm install node-sass --sava-dev
    ```
    * 在build文件夹下的webpack.base.conf.js的rules里面添加配置
    ```javascript
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ```
  * 使用
    * 使用scss时候在所在的style样式标签上添加lang=”scss”即可应用对应的语法，否则报错
    ```vue
      <style lang="scss">
        $color:red;
        div {color:$color;}
      </style>
    ```
    * 但是为了编码规范，最好进行单独引入使用,**一定要注意引入路径的正确性**
    ```vue
      <style lang="scss">
        @import "@assets/account/login.scss"; //注意检查路径
      </style>
    ```
## 全局组件封装
  *业务中需求比较明显的就是需要有一个全局的loading加载效果，虽然vuex+组件可以达到效果，但是每次使用引入方法也是很不方便的。所以有了vue全局组件的使用，这里以最常见的loading为例子。*
### 1、新建组件文件
  * `components` 下面新建 `Loading` 文件夹,新建  `loading.vue` 以及 `index.js` 文件
  * `loading.vue`, 
    * 创建自定义业务组件
    ```vue
      <template>
        <div class="loading-wrap" id="loading-wrap" v-if="visible">
          <i class="el-icon-loading"></i>   // loading图标
          <p>{{ content }}</p>              // loading下的content文字
        </div>
      </template>
      <script>
        export default {
          name: '',
          components: {
          },
          props:{
          },
          data() {
            return {
              content: '',
              visible: true,
            }
          },
          computed: {
          },
          created() {
            console.log('loading', this.visible,this.content)
          },
          mounted() {
          },
          methods: {
          }
        }
      </script>
      <style lang="scss">
      .loading-wrap{
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        overflow: hidden;
        i{
          color: #fff;
          font-weight: bold;
          font-size: 40px;
        }
        p{
          font-size: 14px;
          color: #fff;
          margin-top: 20px;
        }
      }
      </style>
    ```
  * `index.js`
    * 引入 `loading.vue` 业务组件
    ```javascript
      import Vue from 'vue'
      import Loading from './loading.vue'

      const LoadingBox = Vue.extend(Loading)

      Loading.install = function (options) {
        if (options === undefined || options === null) {
          options = {
            content: ''
          }
        } else if (typeof options === 'string' || typeof options === 'number') {
          options = {
            content: options
          }
        } else if(typeof options === 'boolean') {
          options = {
            content: '',
            visible: options
          }
        }
        if(!options.visible) {
          let parent = document.querySelector('body');
          let child = document.querySelector('#loading-wrap');
          child && parent.removeChild(child);
        }

        let instance = new LoadingBox({
          data: options
        }).$mount()

        let existLoading = document.querySelector("#loading-wrap");
        existLoading && document.body.removeChild(existLoading);

        document.body.appendChild(instance.$el)

        // Vue.nextTick(() => {
        //   instance.visible = true
        // })
      }

      export default Loading
    ```
### 2、在main.js注入
  * `main.js`
    ```javascript
      import Loading from './components/Loading'
      Vue.prototype.$my_loading = Loading.install;
    ```
### 3、使用
  * 页面中使用
    ```javascript
      // 打开loading
      this.$my_loading({content:'正在下单，请稍后...'})
      // 或者
      this.$my_loading(true)


      // 关闭
      this.$my_loading(false)
    ```
  * vuex中使用
    ```javascript
      // 打开loading
      this._vm.$my_loading({content:'正在下单，请稍后...'})
      // 或者
      this.$my_loading(true)


      // 关闭
      this._vm.$my_loading(false)
    ```
  * 第三方js中使用
    ```javascript
      import Vue from 'vue'

      // 打开loading
      Vue.prototype.$my_loading({content:'正在下单，请稍后...'})
      // 或者
      this.$my_loading(true)


      // 关闭
      Vue.prototype.$my_loading(false)
    ```
## select中change事件拿到其他值
  ### 1、业务需求
  * 有时候前台数据或者后台接口需要回传选中的其他字段，v-modal只能拿到一个值，并不能满足。
  ### 2、实现
  ```vue
    <template>
      <el-select v-model="testInfo.id" filterable clearable placeholder="请选择派送商" size="mini" @change="selectChange">
        <el-option v-for="item in list" :key="item.id"   :label="item.showName" :value="item.id">
          <span>{{item.showName}}</span>
        </el-option>
      </el-select>
    </template>
    <script>
      export default {
        methods: {
          selectChange(val) {
            let obj= this.list.find(i =>i.id === val)
            // obj.showName   obj就是对应id的对象，这里可以拿到对象的任何值
          }
        }
      }
    </script>
  ```
## vue刷新页面方式
  ### 1、router方式
  * 这种方法页面会一瞬间的白屏，体验不是很好，虽然只是一行代码的事
  ```vue
    this.$router.go(0)
  ```
  
  ### 2、location方式
  * 这种也是一样，画面一闪，效果总不是很好
  ```vue
    this.$router.go(0)
  ```
  ### 3、跳转空白页再跳回原页面
  * 在需要页面刷新的地方写上：`this.$router.push('/emptyPage')`，跳转到一个空白页。在emptyPage.vue里beforeRouteEnter 钩子里控制页面跳转，从而达到刷新的效果
  * 这种画面虽不会一闪，但是能看见路由快速变化。
  ```vue
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$router.replace(from.path)
      })
    }
  ```
  ### 4、控制`<router-view>`的显示隐藏
  * 默认`<router-view v-if="isRouterAlive" />`isRouterAlive肯定是true，在需要刷新的时候把这个值设为false，接着再重新设为true：
  ```vue
    <template>
      <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
        </div>
    </template>

    <script>
      export default{
        provide() {
          return{
            reload: this.reload
          }
        },
        data () {
          return {
            isRouterAlive:true  
          }
        },
        methods: {
          reload() {
            this.isRouterAlive = false
            let that = this
            this.$nextTick(() => {
              that.isRouterAlive = true
            })
          }
        }
      }
    </script>
  ```
  * 使用
  ```vue
    <script>
      export default{
        inject: ['reload'],
        data () {
          return {
          }
        },
        methods: {
          // 直接调用
        }
      }
    </script>
  ```
## Eslint代码格式化
  ### 1、vue代码片段
  ```vue
    "<template>",
    "	<div class=\" \">",
    "	</div>",
    "</template>",
    "<script>",
    "export default {",
    "	name: '',",
    "	components: {},",
    "	props: {},",
    "	data () {",
    "		return {}",
    "	},",
    "	computed: {},",
    "	created () {},",
    "	mounted () {},",
    "	methods: {}",
    "}",
    "</script>",
    "<style lang=\"scss\">",
    "</style>"
  ```

## vue自定义组件的v-modal
  * 一个组件上的 `v-model` 默认会利用名为 `value` 的 `prop` 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件可能会将 `value` 特性用于不同的目的。
  * `model` 选项可以用来避免这样的冲突
  ### 1、子组件A.vue
  ```vue
    <template>
      <div>
        <input :value="value" @change="inputChange">
      </div>
    </template>

    <script>
    export default {
      props: {
        value: {
          type: String,
          required: false
        }
      },
      model: {
        prop: 'value', // 注意，是prop
        event: 'valueChange'
      },
      data () {
        return {
        };
      },
      mounted () {
      },
      methods: {
        inputChange () {
          this.$emit('valueChange', this.value)
        }
      }
    };
    </script>
  ```
  ### 2、父组件B.vue
  ```vue
    <template>
      <div>
        <B v-modal="inputVal" />
        <el-button type="danger" @click="getVal">拿到值</el-button>
      </div>
    </template>

    <script>
    import B from '../components/B.vue'
    export default {
      data () {
        return {
          inputVal: ''
        };
      },
      components: {
        B
      },
      mounted () {
      },
      methods: {
        getVal () {
          console.log(this.inputVal)  // 可同步拿到值
        }
      }
    };
    </script>
  ```
## vue富文本编辑器
  ### 1、vue-quill-editor安装
  ```sh
    npm install vue-quill-editor -S
    npm install quill -S
  ```
  ### 2、vue-quill-editor引入
  * 在main.js中进行引入
  ```javascript
    import Vue from 'vue'
    import VueQuillEditor from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
      
    Vue.use(VueQuillEditor)
  ```
  ### 3、vue-quill-editor组件
  * 这里使用了v-modal自定义组件
  ```vue
    <template>
      <div class="productEditQuill-wrap">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
          @change="onEditorChange($event)">
        </quill-editor>
      </div>
    </template>
    <script>
    export default {
      name: "",
      components: {},
      props: {
        contentVal: {
          type: String,
          required: false,
          default: ``
        },
        editorOption: {
          type: Object,
          required: false,
          default: () => {}
        }
      },
      model: {
        prop: 'contentVal', // 注意，是prop
        event: 'valueChange'
      },
      data () {
        return {
          content: ``
        };
      },
      computed: {
        editor () {
          return this.$refs.myQuillEditor.quill;
        }
      },
      created () {},
      mounted () {},
      methods: {
        onEditorReady (editor) {
          // 准备编辑器
        },
        onEditorBlur () {
          this.$emit('valueChange', this.content)
        }, // 失去焦点事件
        onEditorFocus () {
          this.$emit('valueChange', this.content)
        }, // 获得焦点事件
        onEditorChange () {
          this.$emit('valueChange', this.content)
        } // 内容改变事件
      }
    };
    </script>
    <style lang="scss">
    </style>
  ```
  ### 4、vue-quill-editor使用
  ```vue
    <template>
      <div>
        <productEditQuill v-model="editContent" />
      </div>
    </template>
    <script>
      import productEditQuill from '../components/productEdit/productEditQuill'
      export default {
        components: {
          productEditQuill
        },
        data () {
          return {
            editContent: ``
          }
        }
      }
    </script>
  ```
# 既然大侠光临，不如留一手评论

<Vssue title="Vssue Demo" />
