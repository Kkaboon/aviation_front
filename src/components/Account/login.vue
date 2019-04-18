<template>
  <div id="login_back" :style="bg" style="height: 874px;">
    <div class="innerDialog">
      <div class="mainBox">
        <el-row class="orderTitle">
          <el-col style="padding-left: 180px;">
            <b>本地账户登录</b>
          </el-col>
        </el-row>
        <el-row class="sRow">
          <el-col class="sLbl"></el-col>
          <el-col class="sInp">
            <el-input id="tele" v-model="userInfo.tel" placeholder="请输入手机号">
              帐号
            </el-input>
          </el-col>
          <div hidden="hidden" id="setUserName">
            <el-tag class="sTag" size="small" id="TagUserName">{{tagInfo.tel}}</el-tag>
          </div>
        </el-row>
        <el-row class="sRow">
          <el-col class="sLbl"></el-col>
          <el-col class="sInp">
            <el-input id="pass" v-model="userInfo.password" type="password" placeholder="请输入密码">
              密码
            </el-input>
          </el-col>
          <div hidden="hidden" id="setPassword">
            <el-tag class="sTag" size="small" id="TagPassword">{{tagInfo.password}}</el-tag>
          </div>
        </el-row>
        <el-row class="sRow">
          <el-col class="sLbl"></el-col>
          <el-col class="sInp">
            <el-button class="sBtn sBtnSuc" @click="checktel">登录</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    name: "login",
    data() {
      return {
        bg: {
          background: 'url(' + require('../../assets/012.jpg') + ') no-repeat',
          backgroundSize: "100% 100%"
        },
        userInfo: {
          tel: "",
          password: "",
          identifier: "",
          success: ""
        },
        tagInfo: {
          tel: "",
          password: ""
        }
      }
    },
    methods: {
      checktel() {
        this.$ajax.get('http://localhost:8080/passenger/ispassengerexist?telephone=' + this.userInfo.tel).then(response => {
          console.log(response);
          if (response.data === 'exist') {
            this.userInfo.identifier = 'true';
          } else {
            this.userInfo.identifier = 'false';
            this.$message.error("账号不存在");
          }
        }).catch(function (error) {
          console.log(error);
        }).then(this.login)
        //console.log(this.userInfo.identifier);
      },
      login() {
        console.log(this.userInfo.tel);
        if (this.userInfo.identifier === 'true') {
          this.$ajax.get('http://localhost:8080/passenger/getpassenger?telephone=' + this.userInfo.tel).then(response => {
            console.log(response);
            let ps = response.data['password'];
            if (ps === this.userInfo.password) {
              console.log("!!!!");
              this.$message({message: "登陆成功", type: 'success'});
              this.userInfo.success = 'true';
              console.log(this.userInfo.success);
              sessionStorage.setItem("tel", this.userInfo.tel);
              sessionStorage.setItem("isAd", response.data['ad']);
              console.log('是否是管理员th：' + response.data['ad']);
              console.log("tel:" + this.userInfo.tel);
              sessionStorage.setItem("idno", response.data['identityno']);
              sessionStorage.setItem("pname", response.data['name']);
              console.log('用户姓名：' + sessionStorage.getItem("pname"));
              sessionStorage.setItem("login_state", 'true');
              sessionStorage.setItem("airlineno",response.data['airlineno'])
              console.log('跳转页面中');
              //this.reload();
              this.$router.push({path: '/Index'});
              location.reload();
            } else {
              this.$message.error("密码错误");
            }
          })//.then(this.router());
        } else {
          this.$message.error("账号不存在");
        }
        return;
      },
      /*setSession(){
        if (this.userInfo.success===true){
          this.$ajax.get('http://localhost:8080/passenger/getpassenger?telephone='+this.userInfo.tel).then(responese=>{
              console.log(responese);
              let idno=responese.data['identityno'];
              let pname=responese.data['name'];
              sessionStorage.setItem("idno",idno);
              sessionStorage.setItem("pname",pname);
              sessionStorage.setItem("login_state",'true');
            }
          )
        }
      },*/
      router() {
        console.log(this.userInfo.success);
        if (this.userInfo.success === 'true') {
          console.log('跳转页面中');
          //this.reload();
          this.$router.push({path: '/Index'});
          location.reload();
        }

      }

    },
  }
</script>

<style scoped>
  @import "../../resources/account.css";
</style>
