import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: resolve => require(['@/components/HelloWorld'], resolve),
      redirect:"main",
      children: [
        {
          path: 'main',
          name: 'main',
          meta: {
            title: '主页面'
          },
          component: resolve => require(['@/components/main/main'], resolve)
        },
        {
          path: 'fenlei',
          name: 'fenlei',
          meta: {
            title: '分类'
          },
          component: resolve => require(['@/components/main/fenlei'], resolve),
        },
        {
          path: 'car',
          name: 'car',
          meta: {
            title: '购物车'
          },
          component: resolve => require(['@/components/main/car'], resolve)
        },
        {
          path: 'login',
          name: 'login',
          meta: {
            title: '登录页面'
          },
          component: resolve => require(['@/components/main/login'], resolve)
        },
        {
          path: 'register',
          name: 'register',
          meta: {
            title: '登录页面'
          },
          component: resolve => require(['@/components/main/register'], resolve)
        },
        {
          path: 'xiangqing',
          name: 'xiangqing',
          meta: {
            title: '商品详情'
          },
          component: resolve => require(['@/components/main/xiangqing'], resolve)
        },
        {
          path: 'daijingka',
          name: 'daijingka',
          meta: {
            title: '代金卡'
          },
          component: resolve => require(['@/components/child/daijingka'], resolve)
        },
        {
          path: 'paofu',
          name: 'paofu',
          meta: {
            title: '0元泡芙'
          },
          component: resolve => require(['@/components/child/paofu'], resolve)
        },
        {
          path: '618',
          name: '618',
          meta: {
            title: '618距献'
          },
          component: resolve => require(['@/components/child/618'], resolve)
        },
        {
          path: 'dalibao',
          name: 'dalibao',
          meta: {
            title: '大礼包兑换'
          },
          component: resolve => require(['@/components/child/dalibao'], resolve)
        },
        {
          path: 'wenjuan',
          name: 'wenjuan',
          meta: {
            title: '问卷小调查'
          },
          component: resolve => require(['@/components/child/wenjuan'], resolve)
        }
      ]
    }
  ]
})

