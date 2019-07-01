<template>
  <div class="hello">
     
    
    <!-- 首页轮播 -->
    <div id="lunbo">
      <mt-swipe :auto="2000">
        <mt-swipe-item v-for="(item,index) in lunbo" :key="index">
          <img :src="item.ImgUrl">
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 地址定位 -->
    <div id="city">上海</div>

    <!-- 618 8个小图 -->
    <div id="box">
      <ul v-for="(item,index) in list" :key="index">
        <li @click="juxian">
          <img :src="list[10].ImgUrl">
          <i>{{list[10].ActName}}</i>
        </li>
        <li @click="paofu">
          <img :src="list[11].ImgUrl">
          <i>{{list[11].ActName}}</i>
        </li>
        <li @click="dalibao">
          <img :src="list[4].ImgUrl">
          <i>{{list[4].ActName}}</i>
        </li>
        <li @click="fenlei">
          <img :src="list[5].ImgUrl">
          <i>{{list[5].ActName}}</i>
        </li>
        <li @click="fenlei">
          <img :src="list[0].ImgUrl">
          <i>{{list[0].ActName}}</i>
        </li>
        <li @click="daijing">
          <img :src="list[7].ImgUrl">
          <i>{{list[7].ActName}}</i>
        </li>
        <li @click="fenlei">
          <img :src="list[8].ImgUrl">
          <i>{{list[8].ActName}}</i>
        </li>
        <li @click="wenjuan">
          <img :src="list[9].ImgUrl">
          <i>{{list[9].ActName}}</i>
        </li>
      </ul>
    </div>

    <!-- 3张焦点图 -->
    <div id="guanggao">
      <img v-for="(item,index) in imgs" :src="item.img" @click="toShow(item)" :key="index">
    </div>

    <!-- 魔法猜心 -->
    <div id="mofa">
      <img src="https://res.bestcake.com/m-images-2/mofa.png" alt>
      <p>任选一款，走进你的心</p>
    </div>

    <!-- tab切换 -->
    <div id="tab">
      <ul class="top">
        <li
          v-for="(item,index) in tabclass"
          @click="setTab(index)"
          :key="index"
          :class="{selected:tab==index}"
        >{{item}}</li>
      </ul>
      <!-- 动态显示列表 -->
      <ul class="bottom">
        <li v-for="(item,index) in activeList" @click="toShow(item)" :key="index">
          <img :src="item.ImgUrl">
          <p>{{item.Name}}</p>
          <div>
            <span>￥</span>
            <span>{{item.CurrentPrice}}</span>
            <span>/ {{item.Size}}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 品质甄选 -->
    <div id="pingzhi">
      <img src="https://res.bestcake.com/m-images-2/pinzhi.png" alt>
      <p>没尝过这些美味的人生，是不完美的</p>
    </div>

    <!-- 品质甄选商品列表 -->
    <div id="list">
      <ul>
        <li v-for="(item,index) in goodList" :key="index">
          <img v-lazy="item.ImgUrl" @click="toShow(item)">
          <div class="you">
            <h3>{{item.Name}}</h3>
            <p>{{item.MoreUrl}}</p>
            <img :src="item.tu">
            <div class="xia">
              <span>￥</span>
              <span>{{item.CurrentPrice}}.00</span>
              <span>/ {{item.Size}}</span>
            </div>
          </div>
          <div class="posa" @click="flay($event,item.ImgUrl,item)">
            <img src="https://res.bestcake.com/m-images-2/pinzhi-cart.png">
          </div>
        </li>
      </ul>
    </div>

    <!-- 图片飞入最后位置 -->
    <div class="cart"></div>
    <!-- 商品总数量   定位 -->
    <div id="num" v-show="num">{{$store.state.shopCar.length}}</div>
    <layhead></layhead>
    <!-- 组件 -->
  </div>
</template>

<script>
// 引入jQuery插件
import "../../../static/libs/js/fly";
//引入弹出层
import { Indicator } from "mint-ui";
//引入组件
import layhead from "@/components/layout/layhead";

export default {
  name: "",
  data() {
    return {
      lunbo: [],//轮播列表
      popupVisible: true,//刷新页面弹框是否出现
      tab: 0,//点击的index
      num: "",//点击加入购物车数量
      imgs: [
        {
          Name: "宠爱少女",
          img: "https://res.bestcake.com/m-images-2/guanggao1.png?v=0419"
        },
        {
          Name: "贝丽",
          img: "https://res.bestcake.com/m-images-2/guangao22.png?v=0419"
        },
        {
          Name: "星光游乐园",
          img: "https://res.bestcake.com/m-images-2/guanggao3.png"
        }
      ],
      tabclass: ["送恋人", "送挚友", "送长者", "送亲子"],
      list: [],//8个图标的接口 出来12个
      activeList: [], //三组动态数据
      tabList: [], // 魔法猜心所有数据
      goodList: [] // 品质甄选所有数据
    };
  },
  mounted() {
    Indicator.open(); //初始化显示弹出层
    this.num = this.$store.state.shopCar.length;
    this.GetBannerList(res => {
      res.forEach(item => {
        item.ImgUrl = "https://res.bestcake.com/" + item.ImgUrl;
      });
      this.lunbo = res;
      Indicator.close(); //接口数据返回 弹出层取消
    });
    this.GetIndexCakeList(res => {	//商品首页数据接口
      this.list = res.iconList;
      res.list.forEach(item => {
        if (item.TabType == 4) {
          this.tabList.push(item);
        } else {
          this.goodList.push(item);
        }
      });
      this.setTab(0);
      this.goodList.forEach(item => { //品质甄选所有数据遍历
        if (item.SupplyNo.indexOf("RP") != -1) {
          item.tu = `https://res.bestcake.com/m-images-2/icon_yx.png`;
        } else {
          item.tu = `https://res.bestcake.com/m-images-2/icon_zy.png`;
        }
      });
    });
  },
  methods: {
    flay(e, imgs, item) { //jquery插件方法
      // console.log(e,$);
      // console.log(imgs)
      //https://avatars1.githubusercontent.com/u/1147375?v=4&s=120
      var flyer = $(`<img class="flyer-img" src="${imgs}">`);
      var top = $(window).scrollTop();
      var dh = event.pageY;
      var newh = dh - top;
      //  购物车节点位置,决定图片飘的位置
      var oBtn = $(".cart").offset();
      var newdh = oBtn.top - top;
      //  console.dir(flyer);
      flyer.fly({
        start: {
          left: event.pageX, //抛物体起点横坐标
          top: newh //抛物体起点纵坐标
        },
        end: {
          left: oBtn.left, //抛物体终点横坐标
          top: newdh //抛物体终点纵坐标
        },
        onEnd: function() {
          this.destory(); //销毁抛物体
        }
      });
      var data = {
        //传入数据到购物车
        Name: item.Name,
        id: item.Pid,
        ImgUrl: item.ImgUrl, //产品详情图片
        Size: item.Size, //产品规格
        SupplyNo: item.SupplyNo, //产品货号类型
        CurrentPrice: item.CurrentPrice //产品价格
      };
      this.$store.commit("add", data);
      this.num = this.$store.state.shopCar.length;
    },
    toShow(item) {//点击首页图片
      var data = {
        key: item.Name,
        id: item.CategoryId || item.ID,
        c: item.SupplyNo || "NS"
      };

      this.$router.push({//路由跳转详情页
        path: "/xiangqing",
        query: data
      });
    },
    setTab(index) {//tab三张焦点图切换
      this.tab = index;
      var activelist = [];
      this.tabList.forEach(item => {
        if (this.tabclass[index] == item.ActiveName) {
          activelist.push(item);
        }
      });
      this.activeList = activelist.slice(0, 3);
    },
    daijing() {//点击跳转代金卡组件
      this.$router.push({
        path: "/daijingka"
      });
    },
    juxian() {//点击跳转618组件
      this.$router.push({
        path: "/618"
      });
    },
    kai() {//点击图片 页面弹出层取消
      this.popupVisible = false;
    },
    paofu() {//点击跳转泡芙组件
      this.$router.push({
        path: "/paofu"
      });
    },
    dalibao() {//点击跳转大礼包组件
      this.$router.push({
        path: "/dalibao"
      });
    },
    fenlei() {//点击跳转分类组件
      this.$router.push({
        path: "/fenlei"
      });
    },
    wenjuan() {////点击跳转问卷组件
      this.$router.push({
        path: "/wenjuan"
      });
    },
    GetBannerList(callback) {//掉轮播图接口
      var data = {
        v: "1560159672644",
        c: "Index",
        m: "GetBannerList",
        Type: "2",
        City: "上海"
      };
      this.$apis.GetBannerList(data).then(res => {//拿到轮播接口图片
        callback(res.data.Tag.List);
      });
    },
    GetIndexCakeList(callback) {	//商品首页接口数据
      this.$apis.GetIndexCakeList().then(res => {
        callback(res.data.Tag);
      });
    }
  },
  components: {
    layhead //加入底部子路由 介绍价格的一段话
  },
  watch: {
    num: {//监听加入购物车商品的数量
      handler() {
        this.num = this.$store.state.shopCar.length;
      },
      deep: true//深度监听
    }
  }
};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.hello .tan{
  width:220px;
  height:280px;
  border-radius: 10%
}
.hello .mint-popup-center{
  width:220px;
  height:280px;
}
#city {
  position: absolute;
  left: 0;
  top: 4vw;
  background-color: rgba(255, 255, 255, 0.5);
  background-image: url(https://res.bestcake.com/m-images-2/location.png);
  background-repeat: no-repeat;
  width: 20vw;
  height: 8vw;
  border-radius: 0vw 1.2vw 1.2vw 0vw;
  line-height: 8vw;
  background-size: 6.4vw 6.4vw;
  background-position: 0.8vw 0.8vw;
  padding-left: 5.2vw;
  text-align: center;
  z-index: 1;
}
#lunbo {
  width: 100%;
  height: 162px;
}
#lunbo img {
  display: block;
  width: 100%;
  height: 162px;
}
#box {
  width: 100%;
  height: 170px;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 30px;
 
}
#box ul {
  padding: 15px 30px;
  width: 100vw;
  border-bottom: 2.6vw solid #fafafa;
  display: flex;
  flex-wrap: wrap;
  /* margin: auto; */
}
#box img {
  display: block;
  width: 15.2vw;
  height: 15.2vw;
  margin: auto;
}
#box i {
  display: block;
  width: 75px;
  height: 1.6;
  text-align: center;
  font: 12px/1.6 "";
  color: #333;
  margin-bottom: 12.8px;
}
#guanggao {
  width: 294px;
  height: 128px;
  position: relative;
  margin: auto;
}
#guanggao img:nth-child(1) {
  display: block;
  width: 144px;
  height: 128px;
}
#guanggao img:nth-child(2) {
  display: block;
  width: 144px;
  height: 62px;
  position: absolute;
  right: 0;
  top: 0;
}
#guanggao img:nth-child(3) {
  display: block;
  width: 144px;
  height: 62px;
  position: absolute;
  right: 0;
  top: 66px;
}
#mofa img {
  display: block;
  width: 100%;
  height: 15px;
  margin: 21px 0 8px;
}
#mofa p {
  font: 12px/15px "";
  margin-bottom: 14px;
}

#pingzhi img {
  display: block;
  width: 100%;
  height: 15px;
  margin: 21px 0 8px;
}
#pingzhi p {
  font: 12px/15px "";
  margin-bottom: 25.6px;
  text-align: center;
  color: #999;
}

#tab .top {
  width: 100%;
  padding: 0 20px;
  display: flex;
  height: 28px;
  justify-content: space-between;
  margin-bottom: 8.5px;
  box-sizing: border-box;
}
#tab .top li {
  display: block;
  width: 51px;
  height: 28px;
  font: 12px/20px "";
  background: url(https://res.bestcake.com/m-images-2/mofa-1.png) no-repeat
    center center;
  background-size: 51px 28px;
  color: #333;
}
#tab .top li.selected {
  background-image: url(https://res.bestcake.com/m-images-2/mofa-2.png);
  color: #fff;
}
#tab .bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 117px;
  margin-bottom: 25.5px;
  box-sizing: border-box;
}
#tab .bottom li {
  margin: 0 10px;
}
#tab .bottom img {
  display: block;
  width: 90px;
  height: 77px;
}
#tab .bottom p {
  width: 77px;
  height: 19px;
  font: 12px/19px "";
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#tab .bottom div span:nth-child(1) {
  color: rgb(255, 51, 0);
  font-size: 12px;
}
#tab .bottom div span:nth-child(2) {
  color: rgb(255, 51, 0);
  font-size: 13.6px;
}
#tab .bottom div span:nth-child(3) {
  color: rgb(212, 212, 212);
  font-size: 12px;
  margin-left: 3.4px;
}

#list ul li {
  display: flex;
  width: 100%;
  padding: 0 20px;
  height: 93.8px;
  margin-bottom: 10px;
  position: relative;
  box-sizing: border-box;
}
#list ul li .posa img {
  position: absolute;
  width: 35.8px;
  height: 35.8px;
  position: absolute;
  right: 6px;
  bottom: 0;
}
#list ul li > img {
  display: block;
  width: 93.8px;
  height: 93.8px;
  margin-right: 12.8px;
}
#list ul li .you h3 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13.65px;
  color: #333;
  margin-top: 3.4px;
  width: 160px;
  height: 21px;
  text-align: left;
  font-weight: 400;
}
#list ul li .you p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  text-align: left;
  color: #999;
  margin-bottom: 3.4px;
  width: 160px;
  height: 16px;
}
#list ul li .you img {
  display: block;
  width: 26.8px;
  height: 15px;
  margin: 4px 0;
}
#list ul li .you .xia {
  text-align: left;
  width: 160px;
  height: 26px;
}
#list ul li .you .xia span:nth-child(1) {
  color: rgb(255, 51, 0);
  font-size: 12px;
}
#list ul li .you .xia span:nth-child(2) {
  color: rgb(255, 51, 0);
  font-size: 13.6px;
}
#list ul li .you .xia span:nth-child(3) {
  color: rgb(212, 212, 212);
  font-size: 12px;
  margin-left: 3.4px;
}

#menu {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  background: #fff;
  border-top: 1px solid #eee;
}
#menu ul {
  display: flex;
  margin-bottom: 4px;
  justify-content: space-between;
}
#menu ul li {
  margin: 3.2px 0;
}
#menu ul li img {
  display: block;
  width: 28px;
  height: 31px;
  margin: 0 26px;
}
.cart {
  width: 44px;
  height: 18px;
  position: fixed;
  bottom: 60px;
  right: 90px;
  background: pink;
  visibility: hidden;
}
#num {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #f2495e;
  position: fixed;
  right: 104px;
  bottom: 40px;
  z-index: 999;
  color: #fff;
  text-align: center;
  line-height: 14px;
  font-size: 8px;
}
</style>
