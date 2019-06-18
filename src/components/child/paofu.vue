<template>
  <div id="paofu">
   <img v-for="(item,index) in arr"  :key="index" :src="`https://res.bestcake.com/act/0yuanpf/wap_${item}.jpg?v=12312`" alt="">
    <a href="#" @click="shouye">返回首页</a>
  </div>
</template>

<script>
import layfoot from '@/components/layout/layfoot'
export default {
 
  name: 'HelloWorld',
  data () {
    return {
      arr:[
          '02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'
      ]
    }
  },
  methods:{
      shouye(){
          this.$router.push({
            //点击返回首页
            path: "/main"
          });
      }
  }
}
</script>
<style scoped>
#paofu a{
    display: block;
    position: absolute;
    top:20px;
    right:20px;
}
#paofu img{
display: block;
width: 100%;
}
#paofu img:nth-child(8){
    display: inline-block;
    width:160px;
}
#paofu img:nth-child(9){
    display: inline-block;
    width:160px;
}
#paofu img:nth-child(11){
    display: inline-block;
    width:160px;
}
#paofu img:nth-child(12){
    display: inline-block;
    width:160px;
}
#paofu img:nth-child(14){
    display: inline-block;
    width:160px;
}
#paofu img:nth-child(15){
    display: inline-block;
    width:160px;
}
#paofu img:nth-child(17){
    display: inline-block;
    width:160px;
}
#paofu img:nth-child(18){
    display: inline-block;
    width:160px;
}
#paofu img:nth-child(20){
    display: inline-block;
    width:160px;
}
#paofu img:nth-child(21){
    display: inline-block;
    width:160px;
}
#paofu img:nth-child(23){
    display: inline-block;
    width:160px;
}
#paofu img:nth-child(24){
    display: inline-block;
    width:160px;
}
#paofu a{
    text-decoration: none;
    color: #333;
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
</style>
