<template>
  <div>
      <div id="city">上海</div>
    <img src="https://res.bestcake.com/act/entrance/wap/wap_01.jpg?v=121" alt="">
    <img src="https://res.bestcake.com/act/entrance/wap/wap_02.jpg?v=121" alt="">
    <img src="https://res.bestcake.com/act/entrance/wap/wap_03.jpg?v=121" alt="">
    <img src="https://res.bestcake.com/act/entrance/wap/wap_04.jpg?v=121" alt="">
    <img src="https://res.bestcake.com/act/entrance/wap/wap_05.jpg?v=121" alt="">
    <img src="https://res.bestcake.com/act/entrance/wap/wap_06.jpg?v=121" alt="">
     <div id="posa" @click="fanhui" >返回首页</div>
  </div>
</template>

<script>

export default {
 
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
      fanhui(){
           this.$router.push({
            //点击跳转购物车
            path: "/main"
          });
      }
  }
}
</script>
<style scoped>
img{
    width:100%
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
  color:#e44c7f;
  
}
</style>