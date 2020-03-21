# jd-text

> 一个基于vue+vue-cli+vuex+vue-router+axios+less+express+mysql实现的模拟京东界面

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Sever Setup

``` bash
# 进入sever文件夹
cd server

# 打开server服务
node app.js

```
## Mysql Setup

``` bash
# 请先安装mysql,进入mysql环境
mysql -u root -p

# 创建名为mymall的数据库
CREATE DATABASE mymall

# 使用名为mymall的数据库
use mymall

# 创建名为user的表
CREATE TABLE user (id int pramary key auto_increment,uname varchar(255),upwd varchar(32))

```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

