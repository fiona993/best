<template>
<div >
  <mt-tabbar v-model="selected" :fixed="true" class="hello">
      <mt-tab-item v-for="(item,index) in arrPath" :id="item.key"  :key="index"  @click.native="tab(index)">
      <p><i :class="item.ico" ></i></p>
      {{item.uname}}
      </mt-tab-item>
    </mt-tabbar>
</div>
</template>

<script>
export default {
  data () {
    return {
      selected:"",
      arrPath:[
        {uname: '首页', path: '/main', key: 'main', ico:'fa fa-bank fa-lg' },
        {uname: '分类', path: '/fenlei', key: 'fenlei', ico:'fa fa-th-list fa-lg' },
        {uname: '购物车', path: '/car', key: 'car' , ico:'fa fa-shopping-cart fa-lg'},
        {uname: '我的', path: '/login', key: 'login', ico:'fa fa-user-o fa-lg' }
      ]
    }
  },
  methods:{
    tab(index){
      this.$router.push({
        path:this.arrPath[index].path,
        query:{bound:true}
      })
    }
  }
}
</script>
<style scoped>

p{
  margin:10px;
}

</style>