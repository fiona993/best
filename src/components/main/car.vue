<template>
  <div>
    <!-- 无商品时显示 -->
    <div id="kong" v-if="$store.state.shopCar.num==0">购物车是空的哦~</div>
    <!-- 有商品显示  商品列表 -->
    <div id="buy">
      <ul>
        <li v-for="(item,index) in shopCar" :key="index">
          <img @click="show(index)" :src="item.bool?'https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg':'https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg'" alt="">
          <img :src="item.ImgUrl">
          <div>
            <p>{{item.Name}}</p>
            <i>{{item.Size}}</i>
            <span @click="jian(item)">-</span>
            {{item.num}}
            <span href="#" @click="jia(item)">+</span>
            <p>{{item.CurrentPrice*item.num}}.00</p>
          </div>
          <p>
            <mark>优惠方式</mark>不参与活动
          </p>
        </li>
      </ul>
    </div>

    <!--商品推荐  -->
    <div id="box">
      <div class="tuijian">
        <h3>Hot Recommend</h3>
        <p>热销新品推荐</p>
      </div>
      <div class="list">
        <ul>
          <li>
            <img src="https://res.bestcake.com\m-images\cart\mw_firm_sq.jpg" alt>
            <p>伴手礼系列-吉致生巧</p>
            <div>
              4t
              <span>168.00/1盒</span>
              <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt>
            </div>
          </li>
          <li>
            <img src="https://res.bestcake.com\m-images\cart\mw_firm_nzt_v1.jpg" alt>
            <p>伴手礼系列-吉致牛轧糖</p>
            <div>
              <span>68.00/16粒装</span>
              <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt>
            </div>
          </li>
          <li>
            <img src="https://res.bestcake.com\m-images\cart\mw_firm_pf_v1.jpg" alt>
            <p>伴手礼系列-吉致泡芙</p>
            <div>
              <span>88.00/0.8磅</span>
              <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 结算 -->
    <div id="posa">
      <div class="zuo">
        <img @click="all" :src="beaool?'https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg':'https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg'" alt="">
        <i @click="qing">清空</i>
      </div>
      <div class="you">
        <p>
          合计:
          <mark>{{total|subfixed}}</mark>
        </p>
        <p>已优惠:0.00</p>
      </div>
      <a href="#" @click="jiesuan">结算</a>
    </div>
  </div>
</template>

<script>
//加载提示框
import { Indicator } from "mint-ui";
//加载确认框
import { MessageBox } from "mint-ui";
//加载复选框
import { Checklist } from "mint-ui";
import Store from "storejs";
export default {
  name: "HelloWorld",
  data() {
    return {
      shopCar: [], //所有商品数据
      value: [],
      list: [],
      url:"",
      beaool: false,
    };
  },
  mounted() {
    this.pageInit();
  },

  methods: {
    pageInit() {
      //初始化购物车数据
      var shopCar = this.$store.state.shopCar;
      shopCar.map(item => {
        item.bool = false;
      });
      this.shopCar = shopCar;
    },
    show(index) {
      setTimeout(() => {
        var list = [];
        this.shopCar[index].bool=!this.shopCar[index].bool;
        this.shopCar.forEach(item => {
          if (item.bool) {
            list.push(item);
          }
          this.list = list;
        });
      }, 80);
    },
    all() {
      //点击全选反选
      var beaool=!this.beaool;
      if (this.beaool) {
        setTimeout(() => {
          this.shopCar.forEach(item => {
            item.bool = false;
            this.list=[]
          });
        }, 80);
      } else {
        setTimeout(() => {
          this.shopCar.forEach(item => {
            item.bool = true;
            this.list.push(item)
          });
        }, 80);
      }
      this.beaool=beaool
    },
    jian(data) {
      this.$store.commit("rem", data);//调用store中的增加商品件数方法
      this.shopCar = this.$store.state.shopCar;
    },
    jia(data) {
      this.$store.commit("push", data); //调用store中的减少商品件数方法
      this.shopCar = this.$store.state.shopCar;
      
    },
    qing() {
      //点击 清空购物车
      MessageBox.confirm("", {
        message: "确定要清空购物车吗?",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(action => {
          //清空购物车
          this.$store.state.shopCar = [];
          this.shopCar = [];
          Store.set("shopCar", []);
        })
        .catch(err => {});
    },
    jiesuan() {
      this.$router.push({
        path: "/login",
        query:{bound:true}
      });
    }
  },

  computed: {
    total() {
      //监听选中单个的商品
      //属性计算所有商品总价格
      var sum = 0;
      this.list.forEach(item => {
        sum += item.CurrentPrice * item.num; //计算选中商品价格
      });
      if (this.shopCar.length) {
        if (this.list.length == this.shopCar.length) {
          //所有商品选中就把全选勾选
          this.beaool = true;
        } else {
          this.beaool = false;
        }
      }
      return sum;
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
li {
  list-style: none;
}
#buy ul li {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  text-align: left;
  align-items: center;
  padding: 12px;
  box-sizing :border-box;
  border-bottom: 10px solid #f7f7f7;
}
#buy ul li img:nth-child(1){
  width:17px;
  height:17px
}
#buy ul li img:nth-child(2) {
  display: block;
  width: 97px;
  height: 90px;
  margin: 0 20px;
}
#buy ul li div p {
  font-size: 4.26vw;
  color: #000;
  line-height: 5.06vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 49vw;
}
#buy ul li > p {
  font-size: 12px;
  margin-left: 30px;
  margin-top: 10px;
}
#buy ul li mark {
  background: #fff;
  color: #f2495e;
  font-weight: 600;
  margin-right: 10px;
}
#buy ul li div i {
  display: inline-block;
  font-size: 2.93vw;
  color: #ccc;
  line-height: 3.46vw;
  margin: 10px 0;
  font-style: normal;
}
#buy ul li div span {
  color: #333;
  font-weight: bold;
  display: inline-block;
  width: 6vw;
  line-height: 6vw;
  text-align: center;
  margin: 10px;
}
#kong {
  height: 50px;
  font-size: 12px;
  line-height: 50px;
}
#box {
  font-size: 12px;
  background: #f7f7f7;
  padding-top: 180px;
}
#box .tuijian h3 {
  margin: auto;
  width: 160px;
  font-size: 20px;
  border-bottom: 2px solid #333;
}
#box .list ul {
  display: flex;
  flex-wrap: wrap;
  padding-top: 30px;
  margin-bottom: 120px;
}
#box .list ul li {
  width: 140px;
  margin: 10px;
}
#box .list ul li > img {
  display: block;
  width: 140px;
  height: 140px;
}
#box .list ul li p {
  text-align: left;
}
#box .list ul li div img {
  display: block;
  width: 18px;
  height: 18px;
}
#box .list ul li div {
  display: flex;
  justify-content: space-between;
}
#posa {
  position: fixed;
  bottom: 58px;
  left: 0;
  right: 0;
  display: flex;
  font-size: 12px;
  height: 50px;
  background: #fff;
  justify-content: space-between;
}
#posa .you p {
  margin-right: 10px;
  line-height: 25px;
}
#posa mark {
  background: #fff;
  color: #f2495e;
  font-weight: 600;
}
#posa .zuo {
  height:100%;
  line-height: 50px;
  height: 50px;
  margin-left: 8px;
  position: relative;
}
#posa .zuo i {
  display: inline-block;
  font-style: normal;
  width:60px;
  padding-left:10px;
}
#posa .zuo img{
  width:17px;
  height:17px;
  position: absolute;
  top:34%;
}
#posa a {
  display: block;
  width: 30.66vw;
  line-height: 15vw;
  background: #02d4d7;
  color: #fff;
  font-weight: bolder;
}
</style>