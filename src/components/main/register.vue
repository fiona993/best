<template>
  <div>
    <!-- 注册 -->
    <div id="box2">
      <div id="top2">
        <i>上海</i>
        <b ></b>
        <span></span>
      </div>
      <div class="bottom">
        <p>用户注册</p>
        <div>请选择登录头像</div>
        <form>
          <a href="#" v-fileUpload="setInputFile" >本地上传图片</a>
          <img :src="url" :style="{display:bool}">
          <br>请填写真名
          <input type="text" name="user" v-model="mingzi">
          请填写用户名
          <input type="text" name="user" v-model="user">
          请填写密码
          <input type="text" name="upwd" v-model="mima">
          <button @click.prevent="register" class="btn">注册</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
//加载提示框
import { MessageBox } from "mint-ui";
import Store from "storejs";
export default {
  name: "HelloWorld",
  data() {
    return {
      url: "",
      mingzi: "",
      user: "",
      mima: "",
      bool: "none",
      setInputFile: {
        fn: "fileUpload",
        multiple: false //设置是否多张上传
      }
    };
  },
  methods: {
    fileUpload(url) {
      this.url = url;
      this.bool = "block";
    },
    register() {
      var data = {
        username: this.user,
        password: this.mima,
        avatar: this.url,
        name: this.mingzi
      };
      this.$apis.mockTest2(data).then(res => {
        MessageBox.confirm("", {
          message: "注册成功",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "去登录",
          cancelButtonText: "再看看"
        })
          .then(action => {
            var query = {
              username: this.user,
              password: this.mima,
              bound:true
            };
            this.$router.push({
              path: "/login",
              query
            });
          })
          .catch(err => {});
      });
    }
  }
};
</script>
<style scoped>
li {
  list-style: none;
}

#box2 {
  width: 300px;
  height: 550px;
  margin: auto;
}
#top2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 12px;
}
#top2 i {
  display: inline-block;
  background: url("../../../static/address.png") no-repeat left center;
  background-size: 12px 15px;
  height: 16px;
  line-height: 16px;
  width: 40px;
  font-style: normal;
  padding-left: 12px;
}
#top2 b {
  display: inline-block;
  height: 25px;
  width: 30px;
  background: url("../../../static/lo.png") no-repeat center;
  background-size: cover;
}
#top2 span {
  display: inline-block;
  height: 19px;
  width: 19px;
  background: url("../../../static/cart.png") no-repeat center;
  background-size: cover;
}
p {
  padding: 30px 0;
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #442818;
}
form input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #d5d5d5;
  height: 26px;
  padding: 15px 0;
  line-height: 26px;
  outline: none;
  text-align: center;
  font-size: 14px;
  color: #442818;
  font-weight: 600;
}
form a{
  display: block;
   width: 60%;
  height: 42px;
  background: #442818;
  color: #fff;
  margin: 20px auto;
  font-size: 14px;
  border: none;
  line-height: 42px;
  border-radius: 45%

}
form button {
  width: 100%;
  height: 50px;
  background: #442818;
  color: #fff;
  font-size: 14px;
  border: none;
  margin-top: 30px;
}
form .btn {
  margin-bottom: 200px;
  
}
a {
  text-decoration: none;
  display: inline-block;
  line-height: 18px;
  cursor: pointer;
  color: #442818;
  margin: 20px 0;
  font-size: 12px;
}
p mark {
  background: #fff;
  color: peru;
  font-weight: 800;
}
#box2 .bottom form img {
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50%;
}
</style>
