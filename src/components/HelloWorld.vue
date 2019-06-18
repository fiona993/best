<template>
  <div>
    <layfoot v-if="!($route.path=='/xiangqing')"></layfoot>
    <router-view v-wechat-title="$route.meta.title" img-set="/static/logo.png" />
  </div>
</template>

<script>
import layfoot from '@/components/layout/layfoot'
export default {
 
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
   this.$eventHub.$on("sub",(val)=>{
              //  console.log(val)
      });
   this.$store.commit("vuexInit");
  },
  components:{
    layfoot
  }
}
</script>
<style scoped>


</style>
