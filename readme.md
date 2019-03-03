# webpack4.x + react@latest

webpack-base.rar 为webpack基础配置

项目运行

```
yarn 

yarn run dev

```

webpack 基础依赖

```
"html-webpack-plugin": "^3.2.0",  
"lodash": "^4.17.11",
"webpack": "^4.26.1",
"webpack-cli": "^3.1.2",
"webpack-dev-server": "^3.1.10"


// webpack.config.js

// 向外暴露一个配置对象文件  //Node 8.2+ 版本提供的 npx 命令，可以运行在初始安装的 webpack 包(package)的 webpack 二进制文件
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin'); // 导入在内存中生成HTML页面的插件

// 创建插件实例  
const htmlPlugin = new htmlWebpackPlugin({
    template: path.join(__dirname,'./src/index.html'), // 源文件
    filename: 'index.html'  // 生成内存中的首页名称
})

module.exports = {
    mode:'development',  // development  production(代码被压缩)  
    // 在webpack 4.x 中 默认入口是src下的index
    plugins: [
        htmlPlugin
    ]
}

```
babel 模块

```
"@babel/core": "^7.1.6",
"@babel/plugin-proposal-class-properties": "^7.1.0",
"@babel/plugin-transform-runtime": "^7.1.0",
"@babel/preset-env": "^7.1.6",
"@babel/preset-react": "^7.0.0",
"@babel/runtime": "^7.1.5",
"babel-loader": "^8.0.4",

```

### vscode 支持html标签补全的方法

```
在设置里搜索这个，设置成true

emmet.triggerExpansionOnTab

```