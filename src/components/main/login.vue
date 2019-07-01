 <template>
  <div>
    <!-- 登录 -->
    <transition name="fade">
      <div id="box" v-show="bound">
        <div id="top">
         <div>
            <mark @click="retu">返回</mark>
           <span @click="car"></span>
         </div>
          <b @click="main"></b>
         <i>上海</i>
        </div>
        <div v-show="bool">
          <p>账号密码登录</p>
          <form>
            <input type="text" name="user" v-model="loginName" placeholder="填写用户名">
            <input type="password" name="upwd" v-model="password" placeholder="填写密码">
            <button @click.prevent="login" :disabled="!loginName || !password">登录</button>
          </form>
          <a href="#">忘记密码</a>
          <a href="#" @click="quzhuce">去注册</a>
        </div>
        <div v-show="!bool" id="login">
          <img :src="imgs">
          <p>
            欢迎
            <mark>{{uname}}</mark>加入贝思客蛋糕
          </p>
          <ul>
            <li>✪我的收藏</li>
            <li>✔我的订单</li>
            <li>✚收货地址</li>
            <li>❤我的关注</li>
          </ul>
          <a href="#" @click="tuichu">退出登录</a>
        </div>
      </div>
    </transition>
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
      loginName: "",
      password: "",
      data: {},
      bool: true,
      uname: "",
      imgs: "",
      bound: false
    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.bound = this.$route.query.bound;
      if(this.$route.query.username){
        this.loginName=this.$route.query.username;
        this.password=this.$route.query.password
      }
      if (Store.get("userInfo").length == 0) {
        this.bool = true;
        if (this.$route.data) {
          console.log(this.$route.data);
        }
      } else {
        this.bool = false;
        this.imgs = Store.get("userInfo").avatar;
        this.uname = Store.get("userInfo").name;
      }
    },
    main() {
      this.$router.push({
        path: "/main"
      });
    },
    car() {
      this.$router.push({
        path: "/car"
      });
    },
    retu() {
      this.bound = false;
      setTimeout(() => {
        this.$router.push({
          path: "/car"
        });
      }, 1000);
    },
    login() {
      var data = {
        username: this.loginName,
        password: this.password
      };
      this.$apis.mockTest(data).then(res => {
        if (res.data.code == 1) {
          this.bool = false;
          this.imgs = res.headers.avatar;
          this.uname = res.headers.name;
          Store.set("userInfo", res.headers);
        } else if (res.data.code == 2) {
          alert(res.data.msg);
        } else {
          MessageBox.confirm("", {
            message: "登录失败",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "去注册",
            cancelButtonText: "再看看"
          })
            .then(action => {
               this.$router.push({
              path: "/register"
      });
            })
            .catch(err => {});
        }
      });
    },
    quzhuce() {
      this.$router.push({
        path: "/register"
      });
    },
    xuanzhong(index) {
      this.tab = index;
    },

    tuichu() {
      Store.set("userInfo", []);
      this.bool = true;
    }
  }
};
</script>
<style scoped>
.fade-enter-active {
  animation: bounce-in 1s;
}
.fade-leave-active {
  animation: bounce-out 1s;
}
@keyframes bounce-in {
  0% {
    transform: translate(200px, 0px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
@keyframes bounce-out {
  0% {
    transform: translate(0px, 0px);
  }
  100% {
    transform: translate(200px, 0px);
  }
}
li {
  list-style: none;
}
#box {
  width: 300px;
  height: 550px;
  margin: auto;
}
#box #login img {
  display: block;
  height: 100px;
  width: 100px;
  margin: 20px auto;
  border-radius: 50%;
}
#top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 12px;
}
#top div{
  display: flex;
  justify-content: center;
}
#top mark{
  display: inline-block;
  background: #fff;
  color:#333;
  font-size:14px
}
#top i {
  display: inline-block;
  background: url("../../../static/address.png") no-repeat left center;
  background-size: 12px 15px;
  height: 16px;
  line-height: 16px;
  width: 40px;
  font-style: normal;
  padding-left: 12px;
}

#top b {
  display: inline-block;
  height: 25px;
  width: 30px;
  background: url("../../../static/lo.png") no-repeat center;
  background-size: cover;
}

#top span {
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
form button {
  width: 100%;
  height: 42px;
  background: #442818;
  color: #fff;
  font-size: 14px;
  border: none;
  margin-top: 30px;
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
</style>
 