## 使用 `gulp` 搭建前端工作流
##### 1. gulp 入门基础
##### 2. 配置常用插件 
##### 3. ES6 代码转化
##### 4. 完整演示示例
##### 5. 参考文档

## gulp 入门基础

##### 1.全局安装 `gulp`：

```
$ npm install --global gulp
```

##### 2.作为项目的开发依赖 (devDependencies)

```
$ npm install --save-dev gulp
```

##### 3.在项目根目录下面创建一个名为 `gulpfile.js` 的文件：

```
$ touch gulpfile.js
// 配置 gulp 的相关任务
```

##### 4.运行 gulp：

```
$ gulp
```


## 配置常用插件

下面的步骤从零开始动手搭建环境

##### 1.检查你的 node 版本和 gulp 版本

```
node -v 
//  => v4.0.0
```

```
gulp -v
//  => CLI version 3.9.0
//  => Local version 3.9.0
```

##### 2.安装常用[插件](http://gulpjs.com/plugins/)

 初始化项目目录
 
 ```
 $ mkdir ES6-with-gulp-babe && cd ES6-with-gulp-babe && git init && npm init
 ```

*注： 使用 npm init 创建一个 package.json 存储依赖关系等配置信息*
 
 安装依赖插件
 
 ```
  $ npm install --save-dev gulp gulp-sass gulp-autoprefixer browser-sync gulp-notify
 ```

上述命名依次安装了 `gulp`、`gulp-sass`、`gulp-autoprefixer`、`browser-sync`、`gulp-notify` 等常用插件，其中：
  
  * `gulp-sass` 用于将 Sass 文件编译为 CSS 文件
  * `gulp-autoprefixer` 根据浏览器版本自动处理添加浏览器前缀
  * `browser-sync` 能让浏览器实时、快速响应文件更改（html、js、css、sass、less等）并自动刷新页面
  * `gulp-notify`  用于任务提醒

#####3.创建 `gulp` 的配置文件 `gulpfile.js`

以 `browser-sync` 为例来配置 `gulpfile.js` 文件

```
// 加载插件
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload;);
});

```

#####4. [Browsersync](http://www.browsersync.cn/)可以同时在PC、平板、手机等设备下进项调试

![sync-demo1](https://camo.githubusercontent.com/b47bf2842171fd65098f9ff0d617c4a8c0219709/687474703a2f2f7777772e62726f7773657273796e632e636e2f696d672f73796e632d64656d6f2e676966)


![sync-demo2](https://camo.githubusercontent.com/492ccb2c54bbf3ecd46878065be354c1a99052de/687474703a2f2f7777772e62726f7773657273796e632e636e2f696d672f7363726f6c6c2d64656d6f2e676966)

## ES6 代码转化

  *使用 `ES6` 的语法重写 `gulpfile.js`, 在最新的 `gulp 3.9` 版本上，开发者可以使用 `ES6` 语法来编写配置文件,但是需要安装 `babel` 来转化 `ES6` 代码*
  

第一步：安装 `babel`
   
 ```
 npm install babel-core babel-preset-es2015 --save-dev
 ```

   
第二步：在根目录下创建 `.babelrc` 配置文件
   
```
touch .babelrc
```
并添加以下内容：
   
```
{
  "presets": ["es2015"]
}
```

注：`.babelrc` 为 `babel` 的配置文件，保存在项目的根目录下，其中presets用于设置开启的语法特性集合，详细介绍可参考官方文档：[https://babeljs.io/docs/usage/babelrc/](https://babeljs.io/docs/usage/babelrc/) 和 [http://babeljs.io/docs/plugins/#presets](http://babeljs.io/docs/plugins/#presets)
   
第三步：将 `gulpfile.js` 重名为 `gulpfile.babel.js`
   
```
 mv "gulpfile.js" "gulpfile.babel.js"
```
   
第四步：现在我们就可以使用ES6的语法重写 `gulp` 的配置文件
   
```
'use strict';

import babel from 'gulp-babel';

gulp.task('babel',() => {
  gulp.src('src/app.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'babel task complete' }));
})
```

## 完整演示示例  

1.安装

*  Clone the [repo](https://github.com/chenbin92/ES6-with-gulp-babel)
* `npm install -g gulp` to install Gulp globally.
* `npm install` to resolve project dependencies.

2.使用

* Run `gulp` 
  

## 参考文档

1. [Gulp 开发教程](http://www.w3ctech.com/topic/134)

2. [Gulp：任务自动管理工具](http://javascript.ruanyifeng.com/tool/gulp.html#toc6)

3. [Using ES6 with gulp](https://markgoodyear.com/2015/06/using-es6-with-gulp/) 

4. [Browsersync](http://www.browsersync.cn/)

4. [Gulp getting started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
