import React from 'react'   // 创建组件、虚拟dom、生命周期
import ReactDom from 'react-dom'  // 把虚拟dom放到页面中的
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom'

import appStore from './store/store'
import { Provider } from 'mobx-react'

import Index from '@/routes/home/home'
import News from '@/routes/news/news'

// console.log(appStore)
class App extends React.Component {
  render(){
    return (
      <Provider appStore={ appStore }>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={ Index } />
            <Route exact path="/news" component={ News } />
            <Redirect from="*" to="/" />
          </Switch>
        </HashRouter>
      </Provider>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'))
