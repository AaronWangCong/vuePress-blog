# Linux环境搭建
## NPM 安装
### 1、下载
  * node.js 下载地址：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)
  * 解压下载的压缩包
  ```sh
    xz -d node-v10.16.3-linux-x64.tar.xz
    tar -xvf node-v10.16.3-linux-x64.tar
    mv node-v10.16.3-linux-x64 /usr/local/nodejs
  ```
  * 我们需要设置环境变量以便可以直接使用node命令。使用命令vim /etc/profile打开文件，在文件末尾加上以下两行，并保存。
  ```sh
    vim /etc/profile
  ```
  ```
    export NODE_HOME=/usr/local/nodejs
    export PATH=$NODE_HOME/bin:$PATH
  ```
  * 保存好后，执行以下命令让配置立即生效：
  ```sh
    source /etc/profile
  ```
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
      npm install -g cnpm --registry=https://registry.npm.taobao.org
    ```
## cnpm 安装

## Node 安装

## Nginx 安装

## PM2 安装

# 既然大侠光临，不如留一手评论

<Vssue title="Vssue Demo" />