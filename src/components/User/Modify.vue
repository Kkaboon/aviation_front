<template>
  <div id="register_back" style="height: 874px" :style="bg">
    <div style="background-color: rgba(123,115,64,0);
         height: 300px;
         width: 600px;
         padding-left: 620px;
         padding-top: 75px;">
      <div class="mainBox">
        <el-row class="orderTitle">
          <!--标题-->
          <el-col style="padding-left: 180px;">
            <b>修改个人信息</b>
          </el-col>
        </el-row>
        <el-row class="sRow">
          <el-col class="sLbl"></el-col>
          <el-col class="sInp">
            <el-input id="Name" :disabled="true" placeholder="您的姓名" v-model="userInfo.name"></el-input>
          </el-col>
        </el-row>
        <el-row class="sRow">
          <el-col class="sLbl"></el-col>
          <el-col class="sInp">
            <el-input id="IdentityNo" :disabled="true" placeholder="您的身份证号"
                      v-model="userInfo.identityNo"></el-input>
          </el-col>
        </el-row>
        <el-row class="sRow">
          <el-col class="sLbl"></el-col>
          <el-col class="sInp">
            <el-input id="Password" placeholder="请输入修改后的密码" type="password" @change="checkPassword"
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
            <el-input id="TelInfo" :disabled="true" placeholder="请输入正确的手机号码" type="tel"
                      v-model="userInfo.telInfo"></el-input>
          </el-col>
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
            <el-button @click="userupdate" class="sBtn sBtnSuc">确认修改</el-button>
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
      runCheck() {
        let checkResult = this.checkConfirmPassword();
        checkResult = this.checkPassword() && checkResult;
        //console.log(checkResult);
        return checkResult && true;
      },
      userupdate() {
        console.log(this.runCheck());
        if (this.runCheck()) {
          console.log('s');
          let data = {
            identityno: this.userInfo.identityNo,
            name: this.userInfo.name,
            sex: this.userInfo.sexInfo,
            telephone: this.userInfo.telInfo,
            address: this.userInfo.address,
            password: this.userInfo.password,
            ad: this.userInfo.ad
          };

          console.log(data);
          this.$ajax.post('http://localhost:8080/passenger/updatePassenger', JSON.stringify(data),
            {
              headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }
          ).then(response => {
            console.log(response);
            this.userInfo.password = "";
            this.userInfo.confirmPassword = "";
            if (response.data === 'success') {
              this.openMessage('信息修改成功', 'success', true);
            } else this.openMessage('信息修改失败，请稍后重试', 'error');
          }).catch(function (error) {
            console.log(error);
            /*this.userInfo.password = "";
            this.userInfo.confirmPassword = "";
            this.userInfo.address = "";*/
            this.openMessage('链接服务器失败，请稍后重试', 'error');
          });
        } else {
          this.openMessage('信息修改失败，请稍后重试', 'error');
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
        document.getElementById('register_back').style.backgroundSize = '100% 100%';
        try {
          let inputs = document.getElementsByTagName('input');
          for (let i in inputs)
            inputs[i].style.backgroundColor = "rgba(64, 192, 100，0)";
        } catch (e) {
        }
      },
      getInfo() {
        let telno = sessionStorage.getItem("tel");
        this.$ajax.get('http://localhost:8080/passenger/getpassenger?telephone=' + telno).then(response => {
          console.log(response);
          this.userInfo.telInfo = response.data['telephone'];
          this.userInfo.name = response.data['name'];
          this.userInfo.identityNo = response.data['identityno'];
          this.userInfo.sexInfo = response.data['sex'];
          this.userInfo.ad = response.data['ad'];
        })
      }
    },
    mounted() {
      this.loadStyle();
      this.getInfo();
    },
    data() {
      return {
        bg: {
          background: 'url(' + require('../../assets/002.jpg') + ') no-repeat',
          backgroundSize: "100% 100%",
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
          checkall: "",
          ad: ""
        },
        tagInfo: {
          password: "*必填",
          confirmPassword: "*必填",
          telInfo: "*必填",
          identityNo: "*必填",
          name: "",
          address: ""
        },
        tagVisible: {
          userName: false
        }
      };
    }
  }
</script>

<style scoped>
  @import "../../resources/account.css";
</style>
