## eship客户系统国际化开发说明及规范

### 国际化说明
* 客户中心系统国际化采用 `vue-i18n` 完成
* 提取对应文本为语言文件字段并嵌入对应字段
* 提取文本需要规范化整理，便于后续维护
* 首页 `home` 已经韩语化，格式可以参考

### 获取代码
* 为避免开发人员错误提交代码到其它分支建议重新克隆项目到本地单独文件夹，仅作为翻译开发使用(建议)
* 克隆客户端代码到本地
```sh
    git clone http://192.168.8.169:8088/eship/vue-customer-center.git
```
* 拉取分支 `developerEn` 代码
```sh
    git checkout -b developerEn origin/developerEn
```
* 如果不想重新拉取项目，想要一个项目开发可直接拉取分支（不建议）
* 进入本地客户中心系统代码目录下执行
```sh
    git checkout -b developerEn origin/developerEn
```
* 查看当前分支及切换分支命令
```sh
    // 查看本地所有分支
    git branch -a
    
    // 切换到对应分支
    git checkout 分支名称
```

### 目录结构
* 语言文件在 `src > assets > locales > zh` 目录
* 语言文件按照路由页面分类，一个页面对应一个js文件
* 页面文件已经建立，找到对应js文件进行提取和嵌入
* 其他目录不需要新增，提取嵌入完成后由前端整合成其他语言
![name](../.vuepress/public/images/note_eshipI18n_01.png '描述')
![name](../.vuepress/public/images/note_eshipI18n_02.png '描述')

### 书写规范及命名规范
* 语言js文件层级至多3层，建议两层
* 按照模块化命名及分层，一个部分一个层级为基准
* 首页标题模块 `pageTile` 
    * 其中 `pageTile` 算一级命名，名称必须为驼峰且有意义
    * 其中 `tab1` `tab2` `tab3` 为二级命名，此时没有子级可以按类别及序号命名
```javascript
// 注意翻译的时候只需更改引号内内容即可
// 使用写法路径 $t('home.pageTile.tab1')
export default {
    pageTile: {
        tab1: '首页',
        tab2: '用户中心',
        tab3: '操作台'
    }
}
```
* 首页余额模块 `balance`
    * 其中 `balance` 算一级命名，`title` 为当前模块的标题
    * 其中 `btn1` `btn2` 为当前模块按钮命名
```javascript
// 注意翻译的时候只需更改引号内内容即可
// 使用写法路径 $t('home.pageTile.tab1')
// 使用写法路径 $t('home.balance.title')
export default {
    pageTile: {
        tab1: '首页',
        tab2: '用户中心',
        tab3: '操作台'
    },
    balance: {
        title: '当前账户余额',
        title2: '当前未付金额',
        btn1: '账单明细',
        btn2: '账户充值',
        totalConsumption: '总消费',
        monthBill: '本月消费',
        coupon: '优惠券'
    }
}
```
* 有时候内容过多，需增加二级模块,例如 `createSingleOrder.js`
    * 这时候会有三级字段，那么对应的二级标题也必须驼峰且有意义
    * 建议能缩减就不要用三级字段，这样应用到代码中时会有四级，显得太长。
    * 比如这里可以缩减为下面内容
    * 当然，有时候实在没法合并也可以这样写，但最多限制三级字段
```javascript
// 注意翻译的时候只需更改引号内内容即可
// 使用写法路径 $t('createSingleOrder.title')
// 使用写法路径 $t('createSingleOrder.addressInfo.title')
// 使用写法路径 $t('createSingleOrder.addressInfo.deliveryAddress.title')
export default {
    title: '单件下单'
    addressInfo: {
        title: '地址信息',
        deliveryAddress: {
            title: '收货人信息',
            name: '收货人',
            company: '公司',
            country: '国家',
            ...
        },
        senderAddress: {
            title: '发件人信息',
            name: '发件人',
            company: '公司',
            country: '国家',
            ...
        }
    },
    takeAwayType: {
        title: '提货方式'
    }
}

export default {
    title: '单件下单'
    addressInfo: {
        title: '地址信息',
        deliveryAddressTitle: '收货人信息',
        senderAddressTitle: '发件人信息',
        name: '发件人',
        company: '公司',
        country: '国家',
        ...
    },
    takeAwayType: {
        title: '提货方式'
    }
}
```

### i18n在vue及vuex中的使用方法
* 例如 `login.loginTitle` 对应中文为 `'登录'`
* 在页面外部js中使用需要引入 `i18n`
```javascript
    import i18n from './i18n'
    
    // 使用
    let locale = i18n._vm.locale
```
* 在vue文件的html中使用
```vue
    <template>
        <div>
            <span>{{ $t('login.loginTitle') }}</span>
            // <span>登录</span>
        </div>
    </template>
```
* 在vue文件的script中使用,需要增加 `this`,然后直接替换中文字符串
```javascript
    export default {
        data () {
            return {
              random: this.$t('login.loginTitle')
              // random: '登录'
            };
        },
        methods: {
            handleIconClick () {
                let title = this.$t('login.loginTitle') + '呀'
                // let title = '登录' + '呀'
            }
        }
    }
```
* 在vue文件的vuex的 `actions.js` 中使用 需要引入
```javascript
    import { Notification } from 'element-ui'
    import i18n from '../../lib/i18n'
    export default {
        async registA ({state, commit, dispatch}, params) {
            let res = await regist(params);
            if (res.flag) {
              router.replace({path: "/login"});
              Notification({ title: i18n.t('common.tipsTitle'), message: i18n.t('common.success'), type: 'success' });
            } else {
              Notification({ title: i18n.t('common.tipsTitle'), message: res.msg, type: 'error' });
            }
        },
    }
```

### 结语
* 因为多人开发存在差异，有问题及时交流。
* 开发必须规范，命名必须有意义，便于维护。