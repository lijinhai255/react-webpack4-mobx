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
    ],
    module:{  // 所有第三方配置规则（webpack默认只能打包.js）
        rules:[  // 第三方规则
            { test:/\.js|jsx$/, use:'babel-loader',exclude:/node_modules/ },  // 打包的时候一定要把node_modules排除出去否则会报错  
            // css-loader 有一个固定参数叫modules，表示为普通的css样式表启用模块化
            // 还有个localIdentName 参数，可以自定义生成模块命名格式
            /**
             *  [path]   表示样式表相对于根目录所在路径
             *  [name]   样式表的文件名
             *  [local]  样式的类名定义名称
             *  [hash:length]  可以自定义位数的hash（一般5-6位就可以了）
             */
            // sass 文件需要 sass-loader node-sass
            { test:/\.css$/, use:['style-loader','css-loader'] },
            { test:/\.scss$/, use:['style-loader','css-loader?modules=true&localIdentName=[name][local][hash:5]','sass-loader'] },
            // 处理字体的loader   这里还需要file-loader
            { test:/\.ttf|woff|woff2|eot|svg$/, use: 'url-loader' }
        ]
    },
    resolve:{
        extensions:['.js','.jsx','.json'],  // 自动补全后缀名
        alias:{ // 路径别名
            '@':path.join(__dirname,'./src')  // 之后@就表示项目下的src目录
        }
    }
} 