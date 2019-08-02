# Node
::: tip
  对于一个前端工程师来说不仅仅要会前端的内容，后端的技术也需要熟练掌握。今天我就要通过一个案例来描述一下前端是如何和后端进行数据交互的。
:::
## 搭建一个node服务
### 1、安装node环境
  * 安装node
  ```sh
    npm i -g node
  ```
### 2、创建一个简易的node服务
  * 新建一个项目文件 *`blogDemo`*
  * 进入项目文件根目录新建 `index.html`
  ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      这里是首页
    </body>
    </html>
  ```
  * 继续在根目录新建 `server.js`
  ```javascript
    var http = require('http');
    var fs = require('fs');//引入文件读取模块

    var documentRoot = 'D:/node.js/blogDemo';
    //需要访问的文件的存放目录

    var server= http.createServer(function(req,res){

        var url = req.url; 
        //客户端输入的url，例如如果输入localhost:8888/index.html
        //那么这里的url == /index.html 

        var file = documentRoot + url;
        console.log(url);

        fs.readFile( file , function(err,data){
        /*
            err为文件路径
            data为回调函数
                回调函数的一参为读取错误返回的信息，返回空就没有错误
                data为读取成功返回的文本内容
        */
            if(err){
                res.writeHeader(404,{
                    'content-type' : 'text/html;charset="utf-8"'
                });
                res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
                res.end();
            }else{
                res.writeHeader(200,{
                    'content-type' : 'text/html;charset="utf-8"'
                });
                res.write(data);//将index.html显示在客户端
                res.end();

            }

        });

    }).listen(8888);

    console.log('服务器开启成功');
  ```
  * 在根目录打开 `命令窗口`，启动服务。
  ```sh
    node server
    // 或
    node server.js

    // 会显示启动成功
    d:\node.js\blogDemo>node server
    服务器开启成功
  ```
  * 访问 `http://127.0.0.1:8888/index.html`
  ![name](../.vuepress/public/images/node01.png '描述')
  * 至此简单的node服务搭建成功.
## 结合Koa框架实现接口
  *我们需要用到上面的方法搭建工程的目录，并且在目录中通过npm来安装 `Koa` 框架以及一些用到的依赖库。*
### 1、目录结构如下
  ![name](../.vuepress/public/images/node02.png '描述')
### 2、安装koa依赖
  * `cd` 到你的工程目录，然后执行 `npm i koa` 目录里就会多出 `node_modules` 这样一个文件夹，里边存放用到的一些依赖库。*
  ![name](../.vuepress/public/images/node03.png '描述')
### 3、app.js
  *接下来我们创建一个 `app.js` 文件，用来设置访问服务器时用到的路由，代码如下*
  ```javascript
    var koa = require('koa');
    var controller = require('koa-route');//需要通过npm来添加此依赖
    var app = koa();

    var service = require('./service/WebAppService.js');//引用WebAppService.js

    /*设置路由*/
    app.use(controller.get('/ajax/search',function*(){
        this.set('Cache-Control','no-cache');
        this.set('Access-Control-Allow-Origin','*');
        var querystring = require('querystring');
        var params = querystring.parse(this.req._parsedUrl.query);
        var key = params.key;
        var start = params.start;
        var end = params.end;
        this.body = yield service.get_search_data(key,start,end);
    }));

    app.listen(3001);
    console.log('Koa server is started');
  ```
### 4、koa-route
  1、通过 `npm koa-route` 来安装*
  *然后我们需要在service目录下创建一个 `WebAppService.js` 文件，用来请求接口，代码如下*
  ```javascript
    var fs = require('fs');
    exports.get_search_data = function(key,start,end){
        return function(cb){

            var http = require('http');
            var qs = require('querystring');
            var data = {
                key:key,
                start:start,
                end:end
            };

            /*请求MobAPI里的火车票查询接口*/
            var content = qs.stringify(data);
            var http_request = {
                hostname:'apicloud.mob.com',
                port:80,
                path:'/train/tickets/queryByStationToStation?' + content,
                method: 'GET'
            };

            var req = http.request(http_request,function(response){
                var body = '';
                response.setEncoding('utf-8');
                response.on('data',function(chunk){
                    body += chunk;
                });
                response.on('end',function(){
                    cb(null,body);
                });
            });

            req.end();
        }
      }
  ```
  *这样实际是做了一个接口的转接，我们不仅可以请求本地的接口而且还可以请求第三方接口，避免了跨域请求时浏览器阻断请求。*
### 5、启动测试
  *这样实际是做了一个接口的转接，我们不仅可以请求本地的接口而且还可以请求第三方接口，避免了跨域请求时浏览器阻断请求。*
  接下来我们通过命令来开启服务，终端输入node app.js
# 既然大侠光临，不如留一手评论

<Vssue title="Vssue Demo" />

