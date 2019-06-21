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
     
    }
  },
  mounted(){
   this.$store.commit("vuexInit");
  },
  components:{
    layfoot,
  }
}
</script>
<style scoped>


</style>
