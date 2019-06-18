<template>
  <div id="box">
      <p>上海</p>
      <div class="tip">
          <h4> <img src="https://res.bestcake.com/act/card/title.png" />操作小贴士：</h4>
        <p class="p1">
            1.验证代金卡卡号,卡密<img src="https://res.bestcake.com/act/card/arrow_left.png" alt="">
            2.挑选商品<img src="https://res.bestcake.com/act/card/arrow_left.png" alt="">
            3.确认订单
        </p>
        <p class="p2">
            <img src="http://res.bestcake.com/act/card/prompt.png" alt="">
            此步骤并非绑卡操作，在订单完成前，切勿丢失您的代金卡
        </p>
      </div>
      <div class="kuang">
          <img src="https://res.bestcake.com/act/card/add.png" alt="">
          <p>添加代金卡</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      
    }
  },
 
}
</script>
<style scoped>
#box>p{
    left: 0;
    margin-top: 4vw;
    background-color: rgba(255,255,255,0.5);
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
#box .tip{
    font-size: 12px;
    width: 100vw;
    margin: 5vw 0;
    padding: 2vw;
    background: #8CC1EA;
    color: #FFF;
}
#box .tip h4 img{
    width:22px;
    height:22px;
}
#box .tip .p1 {
  height: 22px;
  margin-top:10px;
}
#box .tip .p1 img{
    width:22px;
    height:6px;
}
#box .tip .p2{
    height:44px;
    padding-right:10px;
    margin-left:36px;
    position: relative;
}
#box .tip .p2 img{
    width:25px;
    height:25px;
    position: absolute;
    left:-24px;
    top:-3px
}
#box .kuang{
    width: 80vw;
    height: 32vw;
    position: relative;
    margin: 0 10vw;
    border: 0.2667vw solid #979797;
    border-radius: 2.1334vw;
    padding-top:20px;
    font-size: 12px
}
#box .kuang img{
    
    width:60px;
    height:60px
}
</style>