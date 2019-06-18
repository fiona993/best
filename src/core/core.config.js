//全局组件
import temcom from '@/components/temcom/temcom'
//全局指令
import directive from "@/core/directive/index"
import apis from '@/core/api/index'//返回了以个对象{joke:fn(),getServerStr:fn()}
// 引入过滤器
import fliter from "@/core/fliter/index"
export default (Vue) => {
    // 全局组件
    temcom(Vue)
    //过滤器
    fliter(Vue)
    //全局指令
    directive(Vue)
    // 绑定到Vue原型里面直接可以在当前实例 this.$global上面调用
    Vue.prototype.$apis=apis
    // 全局通信	
// 使用 $on 注册事件
// 使用 $emit 出发
	Vue.prototype.$eventHub=new Vue()
}