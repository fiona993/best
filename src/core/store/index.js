import Vue from "vue";
import Vuex from "vuex";
import Store from "storejs"
Vue.use(Vuex);
//定义属性 state固定为object
const state = {
    shopCar:  [] 
}
//定义同步方法
const mutations = {
    vuexInit(state){
         state.shopCar=Store.get("shopCar")||[];
    },
    add(state, data) {
        //state获取state里面的属性值,默认第一个就是
        //data 获取视图传入的数据
        var arr = state.shopCar
        if (arr.length > 0) {
            var flag = true;//假如里面没有传入相同的数据
            arr.forEach(item => {
                if (item.id == data.id) {
                    item.num++;
                    flag = false;
                    return;
                }
            });
            if (flag) {
                arr.push(data);
            };
            if(data.bian!=undefined){
                data.num=data.bian
            }else{
                data.num=1;
            }
        } else {
            arr.push(data);
            if(data.bian!=undefined){
                data.num=data.bian
            }else{
                data.num=1;
            }
            
        }
        Store.set("shopCar",state.shopCar);
    },
    push(state, data) {
        state.shopCar.forEach(item => {
            if (item.id == data.id) {
                item.num++;
            }
        })
        Store.set("shopCar",state.shopCar)
    },
    rem(state, data) {
        state.shopCar.forEach(item => {
            if(item.id == data.id){
                if (item.num == 1) {
                    item.num = 1;
                    return
                }
                item.num--;
            }
        })
        Store.set("shopCar",state.shopCar)
    },
}
//定义 computed(属性计算)
const getters = {
}
export default new Vuex.Store({
    state,
    mutations,
    getters
})