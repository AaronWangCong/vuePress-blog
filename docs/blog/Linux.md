# Linux环境搭建
## NPM 安装
### 1、下载
  * node.js 下载地址：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)
  * 命令行查看是否安装成功 ：
    ```sh
      node --version
      //成功的话输出类似：v10.6.0

      npm --version
      //成功的话输出类似：6.1.0
    ```
### 2、cnpm
  * 然后，我们需要执行以下命令，将npm的下载源切换到国内淘宝的镜像，以提高下载时的速度和成功率：
    ```sh
      npm set registry https://registry.npm.taobao.org/
    ```
  * 添加软链(根据npm及cnpm安装目录)
    ```sh
      ln -s /root/node/node-v9.8.0-linux-x64/lib/node_modules/vuepress/cli.js  /usr/local/bin/vuepress
    ```
## cnpm 安装

## Node 安装

## Nginx 安装

## PM2 安装

# 既然大侠光临，不如留一手评论

<Vssue title="Vssue Demo" />