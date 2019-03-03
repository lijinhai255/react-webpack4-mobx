import React from 'react'
import { Link } from 'react-router-dom'

import Header from '@/components/head/head'
import Foot from '@/components/foot/foot'

import { observer, inject } from 'mobx-react'

@inject("appStore") @observer
class Index extends React.Component {
    clickEvent(ev){
        this.props.appStore.change(21321)
    }
    render() {
        return (
            <div>
                <Header />
                {/* <Main /> */}
                    <div 
                        onClick={ ev=>this.clickEvent(ev) }
                    >{ this.props.appStore.qiphon }</div>
                    <Link to="/news">go to news !</Link>
                <Foot />
            </div>
        )
    }
}

export default Index