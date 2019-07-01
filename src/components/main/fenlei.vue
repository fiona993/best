<template>
  <div>
    <!-- tab 切换 -->
    <div id="tab">
      <a href="#" @click="show1" :class="{active:tou==1}">自营</a>
      <a href="#" @click="show2" :class="{active:tou==2}">贝式严选</a>
      <!-- <router-link  v-for="item in list"  :to="item.path" :key="item.name">{{item.name}}</router-link> -->
      <div class="xian"></div>
      <!-- <router-view/> -->
    </div>

    <!-- 自营 -->
    <div id="zy" v-show="active==1">
      <div id="nav">
        <a
          href="#"
          v-for="(item,index) in list"
          :key="index"
          @click="option(index)"
          :class="{selected:tab==index}"
        >{{item.uname}}</a>
      </div>
      <!-- 显示商品 -->
      <div id="list">
        <div class="yi">
          <div class="box" v-for="(item,index) in activelist" :key="index">
            <img :src="item.urlimg" @click="toshow(item)">
            <h4>{{item.Name}}</h4>
            <p>{{item.Means}}</p>
            <div class="price">
              <span>￥</span>
              <span>{{item.CurrentPrice}}</span>
              <span>/ {{item.Size}}</span>
            </div>
            <div class="posa" @click="flay($event,item.urlimg,item)">
              <img src="https://res.bestcake.com\m-images-2\list-cart.png?v=1">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 严选列表 -->
    <div id="yx" v-show="active==2">
      <div id="nav2">
        <a href="#" class="active">乳品</a>
      </div>
      <div id="list2">
        <div class="box" v-for="(item,index) in activelist" :key="index">
          <img v-lazy="item.urlimg" @click="toshow(item)">
          <h4>{{item.Name}}</h4>
          <p>{{item.Means}}</p>
          <div class="price">
            <span>￥</span>
            <span>{{item.CurrentPrice}}</span>
            <span>/ {{item.Size}}</span>
          </div>
          <div class="posa" @click="flay($event,item.urlimg,item)">
            <img src="https://res.bestcake.com\m-images-2\list-cart.png?v=1">
          </div>
        </div>
      </div>
    </div>

    <!-- 加入购物车 -->
    <div class="cart"></div>
    <div id="num" v-show="num">{{$store.state.shopCar.length}}</div>
    <layhead></layhead>
  </div>
</template>
<script>
//引入弹出提示框
import { MessageBox } from "mint-ui";
import { Indicator } from "mint-ui";
import "../../../static/libs/js/fly";
import layhead from "@/components/layout/layhead";
export default {
  name: "HelloWorld",
  data() {
    return {
      tab: 0,
      tem: 0,
      tou: 1,
      num: "",
      list: [
        { uname: "经典", mark: "KSK" },
        { uname: "女神", mark: "NS" },
        { uname: "伴手礼", mark: "JZ" }
      ],
      active: 1,
      goodlist: [],
      activelist: []
    };
  },
  mounted() {
    this.pageInit();
    this.num = this.$store.state.shopCar.num;
  },
  methods: {
    flay(e, imgs, item) {
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
        id: item.ID,
        ImgUrl: item.urlimg, //产品详情图片
        Size: item.Size, //产品规格
        SupplyNo: item.SupplyNo, //产品货号类型
        CurrentPrice: item.CurrentPrice //产品价格
      };
      this.$store.commit("add", data);
      this.num = this.$store.state.shopCar.num;
      // MessageBox({
      //   title: "",
      //   message: "加入购物车成功",
      //   showConfirmButton: true
      // });
    },
    pageInit() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.GetJdListNew(res => {
        var goodlist = res.data.Tag.cakelist;
        var url = "https://res.bestcake.com/m-images/ww/";
        goodlist.forEach(item => {
          if (item.SupplyNo.indexOf("KSK") != -1) {
            item.urlimg = `${url}jd/${item.Name}.png`;
          } else if (item.SupplyNo.indexOf("JZ") != -1) {
            item.urlimg = `${url}jz/${item.Name}.png`;
          } else if (item.SupplyNo.indexOf("NS") != -1) {
            item.urlimg = `${url}ns/${item.Name}.jpg`;
          } else {
            item.urlimg = `${url}rp/${item.Name}.jpg`;
          }
        });
        this.goodlist = goodlist;
        this.option(0);
        Indicator.close();
      });
    },
    option(index) {
      this.tab = index;
      var syno = this.list[index] ? this.list[index].mark : "RP";
      var activelist = [];
      this.goodlist.forEach(item => {
        if (item.SupplyNo.indexOf(syno) != -1) {
          activelist.push(item);
        }
      });
      this.activelist = activelist;
      if (index != 4) {
        this.tem = index;
      }
    },
    show1() {
      this.active = 1;
      this.tou = 1;
      this.option(this.tem);
      // console.log(this.tem)
    },
    show2() {
      this.active = 2;
      this.tou = 2;
      this.option(4);
    },
    toshow(item) {
      var data = {
        key: item.Name,
        c: item.SupplyNo
      };
      this.$router.push({
        path: "/xiangqing",
        query: data
      });
    },
    GetJdListNew(callback) {
      this.$apis.GetJdListNew().then(res => {
        callback(res);
      });
    }
  },
  components: {
    layhead
  },
  watch: {
    num: {
      handler() {
        this.num = this.$store.state.shopCar.length;
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.cart {
  width: 44px;
  height: 18px;
  position: fixed;
  bottom: 60px;
  right: 90px;
  background: pink;
  visibility: hidden;
}
a {
  text-decoration: none;
}
#tab {
  height: 37px;
  position: relative;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 20px;
}

#tab .active {
  color: #1db0b8;
  border-bottom: 1px solid #1db0b8;
}
#tab a {
  display: inline-block;
  width: 50%;
  float: left;
  color: #333;
  font: 13.6px/34px "";
  text-align: center;
  height: 36px;
  margin-bottom: 20px;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}

#nav {
  width: 320px;
  display: flex;
  margin-top: 24px;
  position: relative;
  margin: auto;
}
#nav a {
  margin-right: 30px;
  font: 12px/19px "";
  color: #333;
}
#nav a.selected {
  font-weight: bold;
  font-size: 13.6px;
  border-bottom: 5px solid #95d5d8;
}
#nav a:nth-child(1) {
  margin-left: 64px;
}

#list .yi {
  text-align: left;
  width: 309px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#list .box {
  width: 140px;
  position: relative;
  margin-bottom: 17px;
}
#list .box img {
  display: block;
  width: 140px;
  height: 140px;
}
#list .box h4 {
  font: 12px/16px "";
  font-weight: 400;
  height: 16px;
  padding-left: 6.4px;
}
#list .box p {
  font: 12px/16px "";
  height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
  color: #999;
  padding-left: 6.4px;
}
#list .box .price span:nth-child(1) {
  color: rgb(255, 51, 0);
  font-size: 12px;
  padding-left: 6.4px;
}
#list .box .price span:nth-child(2) {
  color: rgb(255, 51, 0);
  font-size: 13.6px;
}
#list .box .price span:nth-child(3) {
  color: rgb(212, 212, 212);
  font-size: 12px;
  margin-left: 3.4px;
}
#list .posa {
  position: absolute;
  right: 0;
  bottom: 4px;
}
#list .posa img {
  display: block;
  width: 17px;
  height: 17px;
}

#nav2 {
  width: 320px;
  display: flex;
  margin-top: 44px;
  position: relative;
}

#nav2 a.active {
  display: block;
  margin: auto;
  text-align: center;
  color: #333;
  font-weight: bold;
  font-size: 13.6px;
  border-bottom: 5px solid #95d5d8;
}
#nav2 .xian {
  width: 28px;
  height: 5px;
  background: #95d5d8;
  position: absolute;
  bottom: 0;
  left: 46%;
  transition: left 0.35s;
  z-index: -1;
}
#list2 {
  text-align: left;
  width: 309px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#list2 .box {
  width: 140px;
  position: relative;
  margin-bottom: 17px;
}
#list2 .box img {
  display: block;
  width: 140px;
  height: 140px;
}
#list2 .box h4 {
  font-size: 12px;
  font-weight: 400;
  height: 29px;
  padding-left: 6.4px;
  text-indent: 1em;
}
#list2 .box p {
  font: 12px/16px "";
  color: #999;
  padding-left: 6.4px;
  margin-bottom: 5px;
}
#list2 .box .price span:nth-child(1) {
  color: rgb(255, 51, 0);
  font-size: 12px;
  padding-left: 6.4px;
}
#list2 .box .price span:nth-child(2) {
  color: rgb(255, 51, 0);
  font-size: 13.6px;
}
#list2 .box .price span:nth-child(3) {
  color: rgb(212, 212, 212);
  font-size: 12px;
  margin-left: 3.4px;
}
#list2 .posa {
  position: absolute;
  right: 0;
  bottom: 4px;
}
#list2 .posa img {
  display: block;
  width: 17px;
  height: 17px;
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