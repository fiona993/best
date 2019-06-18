<template>
  <div>
   <div id="last">
      <div>
        <div class="lf">划线价格</div>
        <div class="rg">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</div>
      </div>
      <div>
        <div class="lf">未划线价格</div>
        <div class="rg">商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
 
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style scoped>

#last {
  padding: 6.4px 0;
  height: 158px;
  margin-bottom: 40px;
}
#last > div {
  display: flex;
  text-align: left;
  width: 294px;
  height: 57px;
  margin: auto;
  margin-bottom: 12.8px;
}
#last .lf {
  width: 86px;
  height: 19px;
  color: #181818;
  font: 12px/18px "";
}
#last .rg {
  color: #a2a2a2;
  width: 208px;
  height: 57px;
  font: 12px/18px "";
}

</style>