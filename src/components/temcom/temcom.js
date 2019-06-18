
//轮播
import { Swipe, SwipeItem } from 'mint-ui';
//底部导航
import { Tabbar, TabItem } from 'mint-ui';
//复选框
import { Checklist } from 'mint-ui';
//弹出框
import { Popup } from 'mint-ui';

export default (Vue) => {
  // 定义全局组件 轮播
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  //底部导航
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  //复选框
  Vue.component(Checklist.name, Checklist);
  //弹出框
  Vue.component(Popup.name, Popup);
}