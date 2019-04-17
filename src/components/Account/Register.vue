<template>
  <div id="register_back" style="height: 874px" :style="bg">
    <div class="innerDialog" style="padding-top: 64px;">
      <div class="mainBox">
        <el-row class="orderTitle">
          <!--标题-->
          <el-col style="padding-left: 180px;">
            <b>注册本地账户</b>
          </el-col>
        </el-row>
        <el-row class="sRow">
          <el-col class="sLbl"></el-col>
          <el-col class="sInp">
            <el-input id="Name" placeholder="您的姓名" v-model="userInfo.name"></el-input>
          </el-col>
          <el-tag class="sTag" size="small" id="TagName">{{tagInfo.name}}</el-tag>
        </el-row>
        <el-row class="sRow">
          <el-col class="sLbl"></el-col>
          <el-col class="sInp" style="margin-top: 10px; margin-left: 20px;">
            <el-radio type="radio" label="1" v-model="userInfo.sexInfo">先生</el-radio>
            <el-radio type="radio" label="2" v-model="userInfo.sexInfo">女生</el-radio>
          </el-col>
        </el-row>
        <el-row class="sRow">
          <el-col class="sLbl"></el-col>
          <el-col class="sInp">
            <el-input id="IdentityNo" placeholder="您的身份证号" @change="checkIdentityNo"
                      v-model="userInfo.identityNo"></el-input>
          </el-col>
          <el-tag class="sTag" size="small" id="TagIdentityNo">{{tagInfo.identityNo}}</el-tag>
        </el-row>
        <el-row class="sRow">
          <el-col class="sLbl"></el-col>
          <el-col class="sInp">
            <el-input id="Password" placeholder="请输入登录密码" type="password" @change="checkPassword"
                      v-model="userInfo.password"></el-input>
          </el-col>
          <el-tag class="sTag" size="small" id="TagPassword">{{tagInfo.password}}</el-tag>
        </el-row>
        <el-row class="sRow">
          <el-col class="sLbl"></el-col>
          <el-col class="sInp">
            <el-input id="ConfirmPassword" placeholder="请再次输入密码" type="password" @change="checkConfirmPassword"
                      v-model="userInfo.confirmPassword"></el-input>
          </el-col>
          <el-tag class="sTag" size="small" id="TagConfirmPassword">{{tagInfo.confirmPassword}}</el-tag>
        </el-row>
        <el-row class="sRow">
          <el-col class="sLbl"></el-col>
          <el-col class="sInp">
            <el-input id="TelInfo" placeholder="请输入正确的手机号码" type="tel" @change="queryIdentifier"
                      v-model="userInfo.telInfo"></el-input>
          </el-col>
          <el-tag class="sTag" size="small" id="TagTelInfo">{{tagInfo.telInfo}}</el-tag>
        </el-row>
        <el-row class="sRow">
          <el-col class="sLbl"></el-col>
          <el-col class="sInp">
            <el-input id="Address" placeholder="您的住址" v-model="userInfo.address"></el-input>
          </el-col>
        </el-row>
        <el-row class="sRow">
          <el-col class="sLbl"></el-col>
          <el-col class="sInp">
            <el-button @click="userRegister" class="sBtn sBtnSuc">注册</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    name: "Register",
    inject: ['reload'],
    methods: {
      queryIdentifier() {
        console.log("registerstate" + this.userInfo.registerState);
        if (this.checkTel() === false) return false;
        if (this.checkTelInfo() === false) return false;
        this.$ajax.get('http://localhost:8080/passenger/ispassengerexist?telephone=' + this.userInfo.telInfo).then
        (response => {
          console.log(response);
          if (response.data === 'exist') {
            document.getElementById("TelInfo").style.border = "1px solid red";
            document.getElementById("TagTelInfo").classList.add("el-tag--danger");
            this.tagInfo.telInfo = "手机号已存在";
            console.log("TagTelInfo:" + this.tagInfo.telInfo);
            this.userInfo.registerState = 'tel exists';
          } else {
            document.getElementById("TelInfo").removeAttribute("style");
            document.getElementById("TagTelInfo").classList.remove("el-tag--danger");
            document.getElementById("TagTelInfo").classList.add("el-tag--success");
            this.tagInfo.telInfo = "手机号可用";
            this.userInfo.registerState = 'clear';
            this.loadStyle();
          }
        }).catch(function (error) {
          console.log(error);
          //this.userInfo.registerState = error;
        });
        return true;
      },
      checkTel() {
        if (this.userInfo.telInfo === "") {
          let telText = document.getElementById("Telinfo");
          telText.style.border = "1px solid red";
          telText.focus();
          document.getElementById("TagTelInfo").classList.add("el-tag--danger");
          this.tagInfo.telInfo = "请填写手机号";
          return false;
        } else {
          /*document.getElementById("TelInfo").removeAttribute("style");
          document.getElementById("TagTelInfo").classList.remove("el-tag--danger");
          document.getElementById("TagTelInfo").classList.add("el-tag--success");
          this.tagInfo.telInfo = "手机号可用";
          console.log("telInfo:"+this.tagInfo.telInfo);*/
          this.loadStyle();
          return true;
        }
      },
      checkPassword() {
        if (this.userInfo.password === "") {
          let passwordText = document.getElementById("Password");
          passwordText.style.border = "1px solid red";
          passwordText.focus();
          document.getElementById("TagPassword").classList.add("el-tag--danger");
          this.tagInfo.password = "请填写登录密码";
          return false;
        } else {
          document.getElementById("Password").removeAttribute("style");
          document.getElementById("TagPassword").classList.remove("el-tag--danger");
          document.getElementById("TagPassword").classList.add("el-tag--success");
          this.tagInfo.password = "登录密码可用";
          this.loadStyle();
          return true;
        }
      },
      checkConfirmPassword() {
        if (this.userInfo.confirmPassword === "") {
          let confirmPasswordText = document.getElementById("ConfirmPassword");
          confirmPasswordText.style.border = "1px solid red";
          confirmPasswordText.focus();
          document.getElementById("TagConfirmPassword").classList.add("el-tag--danger");
          this.tagInfo.confirmPassword = '请输入确认密码';
          return false;
        } else if (this.userInfo.confirmPassword !== this.userInfo.password) {
          let confirmPasswordText = document.getElementById("ConfirmPassword");
          confirmPasswordText.style.border = "1px solid red";
          confirmPasswordText.focus();
          document.getElementById("TagConfirmPassword").classList.add("el-tag--danger");
          this.tagInfo.confirmPassword = '两次密码输入不一致';
          return false;
        } else {
          document.getElementById("ConfirmPassword").removeAttribute("style");
          document.getElementById("TagConfirmPassword").classList.remove("el-tag--danger");
          document.getElementById("TagConfirmPassword").classList.add("el-tag--success");
          this.tagInfo.confirmPassword = '密码确认成功';
          this.loadStyle();
          return true;
        }
      },
      checkIdentityNo() {
        if (this.userInfo.identityNo === '') {
          let identityNo = document.getElementById("IdentityNo");
          identityNo.style.border = "1px solid red";
          identityNo.focus();
          document.getElementById("TagIdentityNo").classList.add("el-tag--danger");
          this.tagInfo.identityNo = '请输入身份证号';
          return false;
        }
        let identityNo = this.userInfo.identityNo;
        let pattern = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        console.log(pattern.test(identityNo));
        if (!pattern.test(identityNo) || pattern.exec(identityNo)[0] !== this.userInfo.identityNo) {
          let identityNo = document.getElementById("IdentityNo");
          identityNo.style.border = "1px solid red";
          document.getElementById("TagIdentityNo").classList.add("el-tag--danger");
          this.tagInfo.identityNo = "格式不正确";
          return false;
        } else {
          //document.getElementById("identityNo").removeAttribute("style");
          document.getElementById("TagIdentityNo").classList.remove("el-tag--danger");
          document.getElementById("TagIdentityNo").classList.add("el-tag--success");
          this.tagInfo.identityNo = '格式正确';
          this.loadStyle();
          return true;
        }
      },
      checkTelInfo() {
        if (this.userInfo.telInfo === '') {
          let telInfo = document.getElementById("TelInfo");
          telInfo.style.border = "1px solid red";
          telInfo.focus();
          document.getElementById("TagTelInfo").classList.add("el-tag--danger");
          this.tagInfo.telInfo = '请输入电话号码';
          return false;
        }
        let telInfo = this.userInfo.telInfo;
        let pattern = /^1(3|4|5|7|8|9)\d{9}$/;
        if (!pattern.test(telInfo) || pattern.exec(telInfo)[0] !== this.userInfo.telInfo) {
          let telInfo = document.getElementById("TelInfo");
          telInfo.style.border = "1px solid red";
          document.getElementById("TagTelInfo").classList.add("el-tag--danger");
          this.tagInfo.telInfo = "格式不正确";
          return false;
        } else {
          document.getElementById("TelInfo").removeAttribute("style");
          document.getElementById("TagTelInfo").classList.remove("el-tag--danger");
          document.getElementById("TagTelInfo").classList.add("el-tag--success");
          this.tagInfo.telInfo = '电话号码可用';
          this.loadStyle();
          return true;
        }

      },
      runCheck() {
        let checkResult = this.checkTelInfo();
        checkResult = this.checkIdentityNo() && checkResult;
        checkResult = this.checkConfirmPassword() && checkResult;
        checkResult = this.checkPassword() && checkResult;
        //checkResult = this.queryIdentifier() && checkResult;
        console.log("checkresult:" + checkResult);
        console.log("registerState:" + this.userInfo.registerState);
        if (this.userInfo.registerState === 'clear' && checkResult) {
          this.userInfo.checkall = 'true';
          return checkResult && true;
        } else return false;
        /*if (checkResult) return true;
        else return false;*/
      },
      userRegister() {
        //this.queryIdentifier();
        /*/!*let flag2=this.queryIdentifier();
        let flag3=flag1&&flag2;*!/
        console.log("各项数据："+flag1);
        if (!flag1) return;*/
        console.log("checkall:" + this.userInfo.checkall);
        if (this.runCheck()) {
          console.log('s');
          if (this.userInfo.sexInfo === '1')
            this.userInfo.sexInfo = "男";
          else
            this.userInfo.sexInfo = "女";
          let data = {
            identityno: this.userInfo.identityNo,
            name: this.userInfo.name,
            sex: this.userInfo.sexInfo,
            telephone: this.userInfo.telInfo,
            address: this.userInfo.address,
            password: this.userInfo.password,
            ad: false
          };

          console.log(data);
          this.$ajax.post('http://localhost:8080/passenger/register', JSON.stringify(data),
            {
              headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }
          ).then(response => {
            console.log(response);
            this.userInfo.password = "";
            this.userInfo.confirmPassword = "";
            if (response.data === 'success') {
              this.openMessage('注册成功', 'success', true);
              //sessionStorage.setItem('after_register_user', this.userInfo.userName);
              this.$router.push({path: '/Account/Login'});
            } else this.openMessage('注册失败，请稍后重试', 'error');
          }).catch(function (error) {
            console.log(error);
            this.userInfo.password = "";
            this.userInfo.confirmPassword = "";
            this.openMessage('链接服务器失败，请稍后重试', 'error');
          });
          //let username = sessionStorage.getItem('user_name');
          //this.$ajax.get(global_.server_host + '/dialog/append/' + username+ '注册');
        } else {
          this.openMessage('注册失败，请稍后重试', 'error');
        }

      },

      openMessage(messageText, messageType, withReload = false) {
        this.$message({
          message: messageText,
          type: messageType
        });
        if (withReload) this.reload();
      },
      loadStyle() {
        document.getElementById('register_back').style.backgroundSize = '45% 95%';
        try {
          let inputs = document.getElementsByTagName('input');
          for (let i in inputs)
            inputs[i].style.backgroundColor = "rgba(64, 192, 100，0)";
        } catch (e) {
        }
      }
    },
    mounted() {
      this.loadStyle();
    },
    data() {
      return {
        bg: {
          background: 'url(' + require('../../assets/001.jpg') + ') no-repeat right 100px center '
        },
        visible: false,
        userInfo: {
          name: "",
          identityNo: "",
          password: "",
          confirmPassword: "",
          sexInfo: "3",
          telInfo: "",
          address: "",
          registerState: "",
          checkall: ""
        },
        tagInfo: {
          password: "*必填",
          confirmPassword: "*必填",
          telInfo: "*必填",
          identityNo: "*必填",
          name: "*必填",
          address: ""
        }
      };
    }
  }
</script>

<style scoped>
  @import "../../resources/account.css";
</style>
