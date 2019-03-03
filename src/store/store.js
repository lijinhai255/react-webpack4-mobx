import { autorun, observable, action } from 'mobx'

class store {
    @observable qiphon = '767521025@qq.com'
    @observable qq = '767521025'
    @action change(val){
        this.qiphon = val
    }
}

autorun(()=>{
    // console.log('每当store数据变化这个函数就会被触发')
})


let appStore = window.appStore = new store;
export default appStore