# react learn 

> react 专门用于创建虚拟dom的，同时组件的生命周期都在这个包中
react-dom 专门进行dom操作的，最主要的应用场景就是ReactDom.Render()

babel 语法转译 配置

安装

```
yarn add @babel/core babel-loader @babel/plugin-transform-runtime -D

yarn add @babel/preset-env @babel/preset-react -D

```

### jsx 语法本质 ：

并不是把jsx渲染到页面上，而是内部先转换成createElement 形式再渲染的

### 在jsx中混合写入js表达式：

在jsx语法中，要把js代码写在```{}```中，这里面能运行的js代码有

1. 渲染数字、字符串、布尔值（需要toString）
2. 为属性绑定值(属性的引号不用写)
3. 渲染jsx元素
4. 渲染jsx元素数组
5. 将普通字符数组转为jsx数组并渲染到页面上【2种方案】

```
let num = 123

let str = '444'

let bool = true

let group = <button>我是button</button>

let groupH = [
  <h1>我是h1</h1>,
  <h2>我是h1</h2>
]


// 列表渲染
let arr = [1,2,3,4]

// React 中需要把key添加给循环直接控制的元素
let arrEl = arr.map(item=>{
  return <li key={item}>{item}</li>
})

// 在js中默认不允许写html，可以用babel来转换 jsx 是xml语法，单标签要闭合
const div1 = <div id="div">这是一个{num}<br/>
                                  {str}<hr/>
                                  {bool? '真值' : '假值'}<hr/>
                                  {bool.toString() + '11'}<hr/>
                                  <a title={num}>{str}</a><hr/>
                                  {group}<br/>
                                  {/* {groupH}<br/> */}
                                  <ul>{arrEl}</ul>
                                  <div>{arr.map(item=><span key={item}>{item}</span>)}</div>
              <h1>zheshi </h1>
             </div>

 /**
  *   react-dom 渲染元素到页面
  *   param1  要渲染的dom元素
  *   param2  指定页面容器(只能是dom元素)
  * 
  */

ReactDom.render(div1,document.getElementById('app'))


```

### jsx 中的注释

```
{/*  这里写需要注释的内容 */}

{
    // 这里写注释的时候要保证后面没有花括号，不然会被注释掉
}

```

### jsx 中为元素添加类名 

jsx中用 className 代替class

label 中 用HTMLFor 代替 for

jsx 中创建dom的时候，所有的节点必须有唯一的根元素包裹

jsx 中标签要成对出现，如果是单标签要自闭合

// 组件渲染的方式

```
// 渲染组件的方式 ，组件首字母一定要大写
function Hello(props){
    // return null; // 如果返回一个null表示什么都不要渲染
    // 返回的值要是一个合法的jsx 虚拟dom
    // return <div>我是组件--{props.age}=1=={props.name}</div>
    // props 所有的属性都是只读的不能更改 为了能够正确显示dom组件的内容，最好将dom用括号包起来
    console.log(props)
    return <div>woshi----Hello ---{props.name}</div>
}

let dog = {
    name:'菊花',
    age:1
}

// 在js中默认不允许写html，可以用babel来转换 jsx 是xml语法，单标签要闭合
const div1 = <div id="div">
                这是一个
                <Hello name={dog.name} age={dog.age}></Hello>
                {/* <Hello></Hello> */}
             </div>

// 另一种写法
const div1 = <div id="div">
                这是一个
                <Hello {...dog}></Hello>
                {/* <Hello></Hello> */}
             </div>


// 将组件独立出去
import React from 'react'

// 渲染组件的方式
export default function Hello(props){
    // return null; // 如果返回一个null表示什么都不要渲染
    // 返回的值要是一个合法的jsx 虚拟dom
    // return <div>我是组件--{props.age}=1=={props.name}</div>
    // props 所有的属性都是只读的不能更改 为了能够正确显示dom组件的内容，最好将dom用括号包起来
    console.log(props)
    return <div>woshi----Hello ---{props.name}</div>
}

// 导出组件
// export default Hello 


// 引用
// 默认，如果不做单独配置的话，不能省略.jsx后缀名,如果想省略需要配置webpack
import Hello from './components/Hello'
import Hello from '@/components/Hello'  // 这样写需要配置路径别名



// webpack 解决后缀名问题
resolve:{
    extensions:['.js','.jsx','.json'],  // 自动补全后缀名
    alias:{ // 路径别名
        '@':path.join(__dirname,'./src')  // 之后@就表示项目下的src目录
    }
}


```

// class 的使用 （es6 中实现面向对象编程）

> 有状态组件：用class关键字创建出来的组件
无状态组件：用构造函数创建出来的组件
React 官方说：无状态组件由于没有state和生命周期函数，所以运行效率要稍高有状态组件

props和state的区别

> props中的数据是外界传递过来的
state 中的数据都是私有数据（通过ajax传来 的数据）
props 中的数据都是只读的，不能重复赋值
state 中的数据是可读可写的

### jsx中的 style写法

如果有样式表要添加 style-loader css-loader

```

// 行内样式
return <div>
        {/**  HTML中写style    style={ {color:'red', fontSize:'30px'} } 对象形式  */}
        <h1 
            style={{
                fontSize:'20px',
                color:'red'
            }}>这是评论列表页</h1>
        {this.state.msg.map((item,key)=><ListItem {...item} key={key}></ListItem>)}
        </div>

// 也可以将style对象提出去 (在另一个文件中引用)

// css 模块化 （只会对类名和ID生效）

// webpack 配置
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
        { test:/\.css$/, use:['style-loader','css-loader?modules=true&localIdentName=[name][local][hash:5]'] }
    ]
},

// 样式表正常写 
// 这样导入的样式表示全局生效的,启用模块化可以解决
import itemList from '@/css/itemList.css'

console.log(itemList)  // 可以打印出模块化后生成的内容

export default function ListItem(item){
    // console.log(item)
    return <div>
                {/* 这里调用类名 */}
                <span className={itemList.red +' '+ itemList.bg} id={itemList.bg}>{item.id}</span>
                <span>{item.user}</span>
                <p>{item.say}</p>
            </div>
}



// 多个类名的书写方式
<span className={itemList.red +' '+ itemList.bg} id={itemList.bg}>{item.id}</span>
<span className={[itemList.red,itemList.bg].join(' ')} id={itemList.bg}>{item.id}</span>


```

如果要引用第三方css库

```
webpack 

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



```


### 事件

```
import React from 'react'

export default class bindEvend extends React.Component{
    constructor(...args){
        super(...args)
        this.state = {
            
        }
    }
    render (){
        {/* 在react中事件需要用小驼峰发 onClick */}
        return <div className="btn btn-success" onClick={()=>{this.clickMe(111)}}>
                bindEvent 组件
               </div>
    }
    // 实例方法
    clickMe=(msg)=>{
        console.log('我被点击了',msg)
    }
}

```

### 修改数据

```
import React from 'react'

export default class bindEvend extends React.Component{
    constructor(...args){
        super(...args)
        this.state = {
            id:11
        }
    }
    render (){
        {/* 在react中事件需要用小驼峰发 onClick */}
        return <div className="btn btn-success" onClick={()=>this.clickMe(111)}>
                {this.state.id}
               </div>
    }
    // 实例方法
    clickMe=(msg)=>{
        console.log('我被点击了',msg)
        // 修改状态值
        this.setState({
            id:this.state.id+=1
        },()={ // setState 是异步的函数，查看最新状态值要在这里写
            console.log(this.state.id)
        })
    }
}

```

### 数据绑定

```
import React from 'react'

export default class bindInput extends React.Component{
    constructor(...args){
        super(...args)
        this.state = {
            id:11
        }
        this.txt = React.createRef()
    }
    render (){
        {/* 在react中事件需要用小驼峰发 onClick */}
        return <div className="btn btn-success" onClick={()=>this.clickMe(111)}>
                <h1>现在input中的值  {this.state.id}  </h1>
                <input type="text" value={this.state.id} onChange={e=>this.inputVal(e)} ref={this.txt} />
               </div>
    }
    // 实例方法
    clickMe=(msg)=>{
        console.log('我被点击了',msg)
        // 修改状态值
        this.setState({
            id:this.state.id+=1
        },()=>console.log(this.state.id))
    }
    inputVal(e){
        // onChange 中获取输入框的值的方式 ev.target.value
        this.setState({
            id : e.target.value
        })
    }
}

```

### 组件的生命周期

componentWillMount

render

componentDidMount
 

### 父子组件数据传递    

```

// 子组件
import React from 'react'

export default class bindInput extends React.Component{
    constructor(...args){
        super(...args)
        this.state = {
            id:this.props.inputMsg
        }
        this.txt = React.createRef()
        console.log(this.props)
    }
    render (){
        {/* 在react中事件需要用小驼峰发 onClick */}
        return <div className="btn btn-success">
                {/* 如果这里不直接用父级穿过来的值，当值改变的时候这里的值不会跟着改变，需要在component 更新函数中重新赋值！！！ */}
                <h1>现在input中的值  {this.state.id}  </h1>
                <input type="text" value={this.state.id} onChange={(e)=>{this.props.faFun(e)}} ref={this.txt} />
               </div>
    }
    // 实例方法
    inputVal(e){
        // onChange 中获取输入框的值的方式 ev.target.value
        this.setState({
            id : e.target.value
        })
    }
    componentWillUpdate(){
        console.log('bindinput component update',this.props.inputMsg)
    }
    componentWillMount(){
        this.setState({
            p:5
        },(e)=>{
        })
        // console.log('willMount',this.state)
        
    }
    componentDidMount(){
        // console.log('didMount',this.state)
    }
}


// 父组件
class Body extends React.Component {
  constructor(){
    super()
    this.state = {
      login : true,
      inputMsg:123
    }
  }
  render(){
    return (
        <div id="div">
          <Head />
          <BindInput inputMsg={this.state.inputMsg} faFun={e=>{this.changeVal(e)}}></BindInput>
          <Foot/>
        </div>
    )
  }
  // 父子传参
  changeVal(e){
    /*
      e.persist();
      默认事件传过来的时候所有的其他方法都被置为null，如果想要看这些方法需要调用上面的那个方法
    */
    // console.log(e,e.target.value)
    this.setState({
      inputMsg:e.target.value
    })
  }
  componentWillUpdate(){
    console.log('body component update')
  }
}

```
### [使用 PropTypes 进行类型检查](https://react.docschina.org/docs/typechecking-with-proptypes.html#proptypes)

```


```