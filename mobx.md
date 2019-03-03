# mobx react全局状态仓库

所需要的依赖

```
yarn add mobx mobx-react -S



```

babel

所需组件
```
"@babel/core": "^7.1.6",
"@babel/plugin-proposal-class-properties": "^7.1.0",
"@babel/plugin-proposal-decorators": "^7.2.0",
"@babel/plugin-transform-runtime": "^7.1.0",
"@babel/preset-env": "^7.1.6",
"@babel/preset-react": "^7.0.0",
"@babel/runtime": "^7.1.5",
"babel-loader": "^8.0.4",

```

配置文件
```
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ]
}

```


使用方法

在src目录创建store文件夹，新建一个index.js

```
import { autorun, observable } from 'mobx'

class store {  // 这里放置全局变量
    @observable qiphon = '767521025@qq.com'
    @observable qq = '767521025'
}

autorun(()=>{
    console.log('每当store数据变化这个函数就会被触发')
})


let appStore = window.store = new store;
export default appStore

```
页面的最外层组件，引入store

```
import appStore from './store/index'
ReactDom.render(<Body {...appStore} />,document.getElementById('app'))

```

在组件中使用 store中的数据方法

```


```