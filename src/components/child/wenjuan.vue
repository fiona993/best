<template>
  <div id="box">
      <img class="img1" src="https://res.bestcake.com/act/vote/vote_01.jpg?v=12312" alt="">
      <img class="img2" src="https://res.bestcake.com/act/vote/vote_02.jpg?v=12312" alt="">
      <ul>
          <li><span>1.奶油蛋糕</span><input type="checkbox"></li>
          <li><span>2.吐司面包</span><input type="checkbox"></li>
         <li><span>3.曲奇饼干</span><input type="checkbox"></li>
         <li><span>4.比萨饼</span><input type="checkbox"></li>
         <li><span>5.水果派</span><input type="checkbox"></li>
          <li><span>6.三明治</span><input type="checkbox"></li>
          <li><span>7.蛋挞</span><input type="checkbox"></li>
         <li><span>8.布丁</span><input type="checkbox"></li>
         <li><span>9.泡芙</span><input type="checkbox"></li>
         <li><span>10.糕点</span><input type="checkbox"></li>
      </ul>
      <img class="img3" src="https://res.bestcake.com/act/vote/vote_04.jpg?v=12312" alt="">
      <img class="img4"  src="https://res.bestcake.com/act/vote/vote_05.jpg?v=12312" alt="">
      <img class="img5"  src="https://res.bestcake.com/act/vote/vote_06.jpg?v=12312" alt="">
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
#box .img1{
    display: block;
    width:100%;
    height:199px;
}
#box .img2{
display: block;
    width:100%;
    height:65px;
}
#box ul li{
    display: flex;
    justify-content: space-between;
    margin: 10px 30px;
}
#box .img3{
    display: block;
    width:100%;
    height:88px;
}
#box .img4{
    display: block;
    width:100%;
    height:150px;
}
#box .img5{
    display: block;
    width:100%;
    height:189px;
}
</style>
