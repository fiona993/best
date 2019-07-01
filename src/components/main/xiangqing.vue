<template>
  <div id="dabox">
    <mt-popup v-model="popupVisible" position="center" >
      <img
        @click="kai"
        style="width:160px;height:59px;"
        src="https://res.bestcake.com/m-images/listpage-tc.png?v=21"
        v-if="popupVisible"
      >
    </mt-popup>
    <!-- 轮播 -->
    <div id="lunbo">
      <mt-swipe :auto="2000">
        <mt-swipe-item v-for="(item,index) in banner" :key="index">
          <div class="heishe">
            <img v-lazy="item"  class="tupian">
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div id="posa" @click="fanhui" >更多商品</div>

    <!-- 商品全名 -->
    <div id="kongbai">{{uname}}</div>

    <div id="xin">新</div>

    <!-- 商品详情列 -->
    <div id="box">
      <div class="left">
        <p>甜度</p>
        <p>口味</p>
        <p>原材料</p>
        <p>适合人群</p>
        <p>保险条件</p>
      </div>

      <!-- 商品接口数据 -->
      <div class="right">
        <p>
          <img src="https://res.bestcake.com/m-images/ww/jz/tiandu_3.png" alt>
        </p>
        <p>{{showData.CategoryName}}</p>
        <p>{{showData.Resource||showData.Resourse}}</p>
        <p>所有人群</p>
        <p>{{showData.KeepFresh}}</p>
      </div>
    </div>

    <!-- 商品评价 -->
    <div id="pingjia">
      <div class="left">
        <i class="fa fa-commenting-o fa-lg"></i>商品评价
      </div>
      <div class="right">({{pingjia}}条)></div>
    </div>

    <!-- <div id="guige">
      <a href="#" v-for="(item,index) in caketype" :key="index" :class="{selected:tab==index}" @click="setTab(index)">{{item.Size}}</a>
    </div>-->

    <!-- 商品规格 磅/提 tab切换-->
    <div id="guige">
      <p
        v-for="(item,index) in sizeList"
        :key="index"
        :class="{selected:tab==index}"
        @click="setTab(index)"
      >{{item.Size}}</p>
    </div>

    <div id="dong">
      <p>27*40.5cm</p>
      <p>适合35-40人分享</p>
      <p>含四十人份餐具</p>
      <p>至少需提前一天预约</p>
    </div>

    <!-- 购买数量 -->
    <div id="shuliang">
      <div class="left">购买数量</div>
      <div class="right">
        <button @click="jian">-</button>
        <span>{{num}}</span>
        <button @click="jia">+</button>
      </div>
    </div>

    <!-- 组件 -->
    <div id="zui">
      <layhead></layhead>
    </div>

    <!-- 加入购物车 价格 -->
    <div id="join">
      <div class="one">
        <p>{{count}}.00</p>
        <i>已优惠 0.00</i>
        <i style="display:none">已优惠{{CurrentPrice}}</i>
      </div>
      <div class="two" @click="jiache">加入购物车</div>
      <div class="three" @click="buy">立即购买</div>
    </div>
  </div>
</template>

<script>
//引入组件
import layhead from "@/components/layout/layhead";
//加载提示框
import { MessageBox } from "mint-ui";

export default {
  name: "HelloWorld",
  data() {
    return {
      banner: [],
      uname: "",
      datalist: {}, //商品接口
      num: 1,
      tab: 0,
      CurrentPrice: "",
      showData: [],
      sizeList: [],
      pid:0,
      pingjia:0,
      popupVisible: true
    };
  },
  mounted() {
    this.pageInit();
    this.uname = this.$route.query.key;
  },
  methods: {
    //初始化
    pageInit() {
      if (this.$route.query.c.indexOf("NS") != -1) {
        this.GetNSCakeByName(res => {
          //女神系列
          this.datalist = res; //总数据
        });
        this.setImgs("ns-detail");
      } else if (this.$route.query.c.indexOf("KSK") != -1) {
        this.GetCakeByName(res => {
          //经典
          this.datalist = res; //总数据
        });
        this.setImgs("jd-detail");
      } else if (this.$route.query.c.indexOf("RP") != -1) {
        this.GetRuPCakeByName(res => {
          //乳品
          this.datalist = res; //总数据
        });
        this.setImgs("rp-detail");
      } else {
        this.GetjzCakeInfo(res => {
          //伴手礼
          this.datalist = res; //总数据
        });
        this.setImgs("jz-detail");
      }
      // this.GetSumAndAvgAccessInfo(res => {
      //   // console.log(res)
      // }); //评价接口
    },
    kai() {
      this.popupVisible = false;
    },
    fanhui() {
      //跳转到分类页面
      this.$router.push({
        path: "/fenlei"
      });
    },
    jian() {
      if (this.num == 1) {
        return;
      }
      this.num--;
    },
    jia() {
      this.num++;
    },
    buy(){
      this.$router.push({
        path: "/login",
        query:{bound:true}
      });
    },
    jiache() {
      //点击加入购物车
      MessageBox.confirm("", {
        message: "成功添加到购物车",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "去结算",
        cancelButtonText: "再看看"
      })
        .then(action => {
          var data = {
            //传入数据到购物车
            Name: this.uname,
            id: this.sizeList[this.tab].ID || this.sizeList[this.tab].Id,
            ImgUrl: this.banner[0], //产品详情图片
            Size: this.sizeList[this.tab].Size, //产品规格
            SupplyNo: this.sizeList[this.tab].SupplyNo, //产品货号类型
            CurrentPrice: this.CurrentPrice, //产品价格
            bian: this.num
          };
          this.$store.commit("add", data);
          this.$router.push({
            //点击跳转购物车
            path: "/car"
          });
        })
        .catch(err => {
          var data = {
            //传入数据到购物车
            Name: this.uname,
            id: this.sizeList[this.tab].ID || this.sizeList[this.tab].Id,
            ImgUrl: this.banner[0], //产品详情图片
            Size: this.sizeList[this.tab].Size, //产品规格
            SupplyNo: this.sizeList[this.tab].SupplyNo, //产品货号类型
            CurrentPrice: this.CurrentPrice, //产品价格
            bian: this.num
          };
          this.$store.commit("add", data);
        });
    },
    setTab(index) {
      this.tab = index;
      this.CurrentPrice = this.sizeList[this.tab].CurrentPrice;
      this.pid= this.sizeList[this.tab].ID || this.sizeList[this.tab].Id;
      this.GetSumAndAvgAccessInfo((res)=>{
        this.pingjia=res.data.Tag.count
        
      })
    },
    setImgs(path) {
      //拼接图片地址加入轮播图
      for (var i = 1; i < 5; i++) {
        var str = `https://res.bestcake.com/m-images/${path}/${
          this.$route.query.key
        }/${this.$route.query.key}-${i}.jpg`;
        this.banner.push(str);
      }
    },
    GetNSCakeByName(callback) {
      //女神系列
      var data = {
        Name: this.$route.query.key
      };
      this.$apis.GetNSCakeByName(data).then(res => {
        callback(res);
      });
    },
    GetCakeByName(callback) {
      //经典
      var data = {
        ProName: this.$route.query.key
      };
      this.$apis.GetCakeByName(data).then(res => {
        callback(res);
      });
    },
    GetjzCakeInfo(callback) {
      //伴手礼
      var data = {
        ProName: this.$route.query.key
      };

      this.$apis.GetjzCakeInfo(data).then(res => {
        callback(res);
      });
    },
    GetRuPCakeByName(callback) {
      //乳品
      var data = {
        Name: this.$route.query.key
      };
      this.$apis.GetRuPCakeByName(data).then(res => {
        callback(res);
      });
    },
    GetSumAndAvgAccessInfo(callback) {
      //评价数量
     var data={
       pid:this.pid
     }
      //  console.log(data)
      this.$apis.GetSumAndAvgAccessInfo(data).then(res => {
        callback(res);
      });
    }
  },
  watch: {
    datalist: {
      handler() {
        var city = "上海";
        if (this.datalist.data.Tag.length > 2) {
          this.datalist.data.Tag.forEach(item => {
            if (city == item.City) {
              item.KeepFresh='最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。'
              this.sizeList.unshift(item);
              
            }
            this.showData = this.sizeList[0];
          });
          this.CurrentPrice = this.showData.CurrentPrice;
        } else if (this.datalist.data.Tag.length == 1) {
          this.showData = this.datalist.data.Tag[0];
          this.sizeList = this.showData.CakeType;
          this.CurrentPrice = this.showData.CurrentPrice;
        } else {
          this.showData = this.datalist.data.Tag.infos;
          this.sizeList = this.showData.CakeType;
          this.CurrentPrice = this.sizeList[0].CurrentPrice;
        }
      
        this.pid= this.sizeList[this.tab].ID || this.sizeList[this.tab].Id
       this.GetSumAndAvgAccessInfo((res)=>{
        this.pingjia=res.data.Tag.count
        
      })
      },
      deep: true
    }
  },
  computed: {
    //计算总价
    count() {
      return this.num * this.CurrentPrice;
    }
  },
  components: {
    layhead
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
}
#dabox .mint-popup-center{
  width:160px;
  height:59px;
  background: transparent
}
#lunbo {
  width: 100%;
  height: 445px;
}
#lunbo img {
  display: block;
  width: 100%;
  height: 380px;
  margin: 80px 0;
}
#posa {
  position: fixed;
  right: -1px;
  top: 4vw;
  background-color: rgba(255, 255, 255, 0.5);
  width: 22vw;
  height: 9vw;
  border-radius: 1.2vw 0vw 0vw 1.2vw;
  line-height: 8vw;
  text-align: center;
  z-index: 2;
  border: 1px solid #333;
}
#kongbai {
  line-height: 4.53vw;
  font-weight: bold;
  color: #333;
  font-size: 4.53vw;
  margin-top: 2vw;
  margin-bottom: 4vw;
  text-align: center;
}
#xin {
  margin-left: 45%;
  font-size: 4vw;
  line-height: 8vw;
  width: 8vw;
  height: 8vw;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  background: #f2495e;
  margin-bottom: 20px;
}
#box {
  display: flex;
  padding-bottom: 40px;
}
#box .left {
  font-size: 3.73vw;
  width: 15.93vw;
  margin-left: 4vw;
  text-align: left;
  color: #9a9a9a;
  line-height: 3;
}
#box .right {
  text-align: left;
  font-size: 3.73vw;
  width: 72vw;
  margin-left: 4vw;
  margin-right: 4vw;
  line-height: 3;
}
#box .left p {
  height: 30px;
  width: 50px;
}
#box .right p {
  width: 230px;
  height: 30px;
}
#box .right img {
  width: 73px;
}
#box .right p:nth-child(3) {
  height: 80px;
}
#box .left p:nth-child(3) {
  height: 80px;
}
#box .right p:nth-child(5) {
  height: 100px;
}
#box .left p:nth-child(5) {
  height: 100px;
}
#pingjia {
  display: flex;
  justify-content: space-between;
  font-size: 3.73vw;
  padding: 4vw;
  border-top: 4vw solid #f7f7f7;
  border-bottom: 4vw solid #f7f7f7;
}
#pingjia .left i {
  margin-right: 2.93vw;
}
#pingjia .right {
  color: #9a9a9a;
}
#guige {
  height: 50px;
  display: flex;
  align-items: center;
}
#guige .selected {
  background: #02d3d6;
  color: #fff;
}
#guige p {
  font-size: 3.73vw;
  text-align: center;
  line-height: 8vw;
  padding: 0 3.5875vw;
  height: 8vw;
  margin-left: 4vw;
  background: #fff;
  border-radius: 2px;
  color: #333;
  border: 1px solid #ddd;
}
#guige a:nth-child(1) {
  background: #02d3d6;
  border-radius: 2px;
  color: #fff;
  border: 1px solid #02d3d6;
}
#dong {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px 0 8px;
}
#dong p {
  font-size: 12px;
  width: 110px;
  height: 30px;
  line-height: 30px;
  margin: 8px;
  padding-left: 20px;
  background: url("https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png")
    no-repeat left;
  background-size: 20px 20px;
}
#dong p:nth-child(2) {
  background: url("https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png")
    no-repeat left;
  background-size: 20px 20px;
}
#dong p:nth-child(3) {
  background: url("https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png")
    no-repeat left;
  background-size: 20px 20px;
}
#dong p:nth-child(4) {
  background: url("https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png")
    no-repeat left;
  background-size: 20px 20px;
}
#shuliang {
  display: flex;
  justify-content: space-between;
  font-size: 3.73vw;
  padding: 4vw;
  border-top: 4vw solid #f7f7f7;
  border-bottom: 4vw solid #f7f7f7;
}
#shuliang .left i {
  margin-right: 2.93vw;
}
#shuliang .right {
  color: #9a9a9a;
}
#shuliang .right button {
  background: #fff;
  border: 0;
  outline: none;
  width: 20px;
  height: 20px;
}
#shuliang .right span {
  margin: 0 10px;
}
#zui {
  background: #f7f7f7;
}

#join {
  display: flex;
  height: 48px;
  font-size: 14px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: #fff;
}
#join .one {
  margin-right: 80px;
  width: 115px;
}
#join .one p {
  color: #f2495e;
  font-weight: bolder;
}
#join .one i {
  font-style: normal;
  font-size: 12px;
}
#join .two {
  width: 94px;
  line-height: 48px;
  margin-right: 5px;
}
#join .three {
  width: 98px;
  text-align: center;
  padding: 4vw 0;
  background: #02d4d7;
  color: white;
  font-weight: bolder;
}
</style>