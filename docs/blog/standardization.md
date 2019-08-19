---
sidebar: false
---
# 笔记
## 关于前端项目交互测试
::: tip
* 1、前端本地搭建后台环境，从后台仓库更新代码进行启动开发
* 2、后端更新前端仓库代码并启动调试
* 3、配置 `swicthHost`（因为配置了 `switchHost` 所以本地启动后如果设置的是本地配置，那么请求的接口跟本机相同，如果设置的 `169` ，那么请求的就是测试环境。不需要进行任何更改）
:::
### 一、前端开发人员本地启动后台
* 1、配置后台java环境
* 2、进入后台仓库克隆代码
* 3、启动前进行代码更新
* 4、脚本更新启动
### 二、后台开发人员启动前端项目
* 1、配置 `switchHost`
  ```sh
    #balidrop
    192.168.8.111  customer.balidrop.com  #vue后台管理项目
    192.168.8.111  home.balidrop.com  #balidrop官网项目 如果不需要可以不用配置
    #balidrop后台
    192.168.8.111  api.balidrop.com
  ```
* 2、配置 `nginx`
  ```nginx
    # 负载均衡
    upstream balidrop{
      server 192.168.8.111:83 weight=5 max_fails=2 fail_timeout=600s;
    }

    ## api-balidrop
    server {
          listen       80;
          server_name  ~^balidrop\.(.+)?\.com$;
      
          location /balidrop/v1 {
              proxy_pass http://balidrop;
          }
      }
  ```
* 3、进入前端仓库克隆项目到本地 [http://192.168.8.169:8088/toppgo/customer.balidrop.com.git](http://192.168.8.169:8088/toppgo/customer.balidrop.com.git)
  ```sh
    # 进入项目存放目录
    git clone http://192.168.8.169:8088/toppgo/customer.balidrop.com.gi
  ```
* 4、初次启动先安装依赖 `cnpm i`
  ```sh
    cnpm i
  ```
* 5、每次启动前进行pull更新代码
  ```sh
    git pull
  ```
* 6、根目录启动 `npm run dev`（如果运行报错，请运行 `cnpm i` 更新依赖，如果还是报错，请删除依赖再次运行 `cnpm i` ，如果还是报错，请联系前端） 
  ```sh
    npm run dev
  ```
* 7、可用编辑器启动及更改代码进行调试，但不允许提交代码

### switchHost配置注意事项
* 2、需要配置两个以方便切换测试环境及本地后台环境，测试环境配置169，本地环境配置本机ip



