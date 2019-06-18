 <template>
  <div>
    <!-- <button @click="show=!show">点击</button> -->
    <transition-group name="fade">
     
        <!-- 登录 -->
        <div id="box" v-show="beal" :key="1">
          <div id="top">
            <i>上海</i>
            <b @click="main"></b>
            <span @click="car"></span>
          </div>
          <div v-show="bool">
            <p>账号密码登录</p>
            <form>
              <input type="text" name="user" v-model="loginName" placeholder="填写用户名">
              <input type="password" name="upwd" v-model="password" placeholder="填写密码" >
              <button @click.prevent="login" :disabled="!loginName || !password">登录</button>
            </form>
            <a href="#">忘记密码</a>
            <a href="#" @click="quzhuce">去注册</a>
          </div>
          <div v-show="!bool">
            <img :src="imgs" >
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

        <!-- 注册 -->
        <div id="box2" v-show="!beal" :key="2">
          <div id="top2">
            <i>上海</i>
            <b @click="main"></b>
            <span @click="car"></span>
          </div>
          <div class="bottom">
            <p>用户注册</p>
            <div>请选择登录头像</div>
            <form>
              <img
                v-for="(item,index) in someimg"
                :key="index"
                :src="item"
                alt
                :class="{selected:tab==index}"
                @click="xuanzhong(index)"
              >
              请填写真名
              <input type="text" name="user" v-model="mingzi">
              请填写用户名
              <input type="text" name="user" v-model="user">
              请填写密码
              <input type="text" name="upwd" v-model="mima">
              <button @click.prevent="register">注册</button>
            </form>
          </div>
        </div>
     
    </transition-group>
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
      show: "",
      loginName: "",
      password: "",
      data: {},
      bool: true,
      uname: "",
      imgs: "",
      beal: true,
      mingzi: "",
      user: "",
      mima: "",
      tab: 0,
      someimg: [
        "../../../static/1.jpg",
        "../../../static/3.jpg",
        "../../../static/4.jpg",
        "../../../static/2.jpg"
      ]
    };
  },
  mounted() {
    this.pageInit();
    
  },
  methods: {
    pageInit() {
      if (Store.get("userInfo")=='[]') {
        this.beal=true;
        this.bool = true;
        this.imgs = Store.get("userInfo").avatar;
        this.uname = Store.get("userInfo").name;
      } else {
         this.beal=true;
         this.bool = false;
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
              this.beal = false;
            })
            .catch(err => {});
        }
      });
    },
    quzhuce() {
      this.beal = false;
    },
    xuanzhong(index) {
      this.tab = index;
    },
    register() {
      var data = {
        username: this.user,
        password: this.mima,
        avatar: this.someimg[this.tab],
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
            this.beal = true;
          })
          .catch(err => {});
      });
    },
    tuichu() {
      this.bool = true;
      Store.set("userInfo", []);
    }
  }
};
</script>
<style scoped>
.fade-enter-active {
  animation: bounce-in 3s;
}
.fade-leave-active {
  animation: bounce-out 3s;
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
    transform: translate(200px, 200px);
  }
}
li{
  list-style: none;
}
#box,
#box2 {
  width: 300px;
  height: 550px;
  margin: auto;
}
#top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 12px;
}
#top2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 12px;
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
#top b {
  display: inline-block;
  height: 25px;
  width: 30px;
  background: url("../../../static/lo.png") no-repeat center;
  background-size: cover;
}
#top2 b {
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
#box2 .bottom form img {
  margin: 5px;
  width: 56px;
  height: 56px;
  padding: 3px;
}
#box2 .bottom form .selected {
  border: 1px solid #442818;
}
</style>
 