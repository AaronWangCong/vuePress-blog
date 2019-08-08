# Deploy部署
## webhooks实现自动部署
* 部署上线一般有两种方式，第一种是本地打包再用工具上传，第二种是服务器端获取代码进行打包。不管是直接上传文件还是运行脚本都需要去进行操作
* Webhooks允许在发生特定事件时通知外部服务。 当指定的事件发生时，我们将向您提供的每个URL发送POST请求。通过这个post请求，我们就能实现自动拉取仓库中的代码，更新到本地，最终实现自动化更新。
### 1、webhooks建立
  * 首先进入github对应仓库---settings---webhooks---新建
  * 这里需要填写服务器接收地址及 `secret` 密钥
  ![name](../.vuepress/public/images/deploy01.png '描述')
### 2、webhooks接受服务搭建
  * 这里采用 `node.js` 搭建服务
  * 首先安装webhook需要的依赖
  ```sh
    npm i github-webhook-handler -S
  ```
  * 新建 `auto_build.sh` 执行操作
  ```sh
    #! /bin/bash

    cd /vuePress-blog
    git pull
  ```
  * 新建 `index.js` 入口文件，接收消息并运行 `auto_build.sh`
  ```javascript
    var http = require('http');
    var spawn = require('child_process').spawn;
    var createHandler = require('github-webhook-handler');

    // 下面填写的myscrect跟github webhooks配置一样，下一步会说；path是我们访问的路径
    var handler = createHandler({ path: '/auto_build', secret: '****' });

    http.createServer(function (req, res) {
      handler(req, res, function (err) {
        res.statusCode = 404;
        res.end('no such location');
      })
    }).listen(6666);

    handler.on('error', function (err) {
      console.error('Error:', err.message)
    });

    // 监听到push事件的时候执行我们的自动化脚本
    handler.on('push', function (event) {
      console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);

      rumCommand('sh', ['./auto_build.sh'], function( txt ){
        console.log(txt);
      });
    });

    function rumCommand( cmd, args, callback ){
      var child = spawn( cmd, args );
    }

    // 由于我们不需要监听issues，所以下面代码注释掉
    //  handler.on('issues', function (event) {
    //    console.log('Received an issue event for %s action=%s: #%d %s',
    //      event.payload.repository.name,
    //      event.payload.action,
    //      event.payload.issue.number,
    //      event.payload.issue.title)
    //});
  ```
  * 使用 `nginx` 代理，个人使用nginx代理，看自身服务器配置
  * 使用 `pm2` 运行node服务，因为个人使用pm2管理进程，也可用node启动
  ```sh
    pm2 start index.js
  ```
### 3、更新代码到github仓库，查看webhooks日志是否发送成功
  * 查看推送日志，会启动脚本进行拉取远程仓库代码，网站实时更新。
  * 只需本地推送代码到远程仓库即可。
