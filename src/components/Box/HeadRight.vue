<template>
  <el-menu
    :active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#750000"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item class="left_tab" index="1">{{tabInfo.left}}</el-menu-item>
    <el-menu-item class="right_tab" index="2">{{tabInfo.right}}</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "HeadRight",
    data() {
      return {
        activeIndex: "",
        tabInfo: {
          left: "登录",
          right: "注册"
        }
      };
    },
    mounted() {
      if (sessionStorage.getItem('login_state')==='true') {
        this.tabInfo.left = sessionStorage.getItem('pname');
        this.tabInfo.right = '注销登录';
      }
      console.log(window.location.href);
      let path = window.location.href.split("/");
      if (path[path.length - 2].toLowerCase() !== 'account')
        this.activeIndex = '';
      else if (path[path.length - 1].toLowerCase() === 'login')
        this.activeIndex = '1';
      else this.activeIndex = '2';
    },
    methods: {
      handleSelect(key) {
        if (key === '1') {
          if (this.tabInfo.left === '登录')
            this.$router.push({path: '/Account/login'});
          else this.$router.push({path: '/User/Modify'});
        } else {
          if (this.tabInfo.right === '注册')
            this.$router.push({path: '/Account/Register'});
          else this.userLogout();
        }
      },
      userLogout() {
        sessionStorage.clear();
        this.tabInfo.left = '登录';
        this.tabInfo.right = '注册';
      }
    },
    watch: {
      '$route'() {
        console.log('hello');
        if (sessionStorage.getItem('login_state')==='true') {
          this.tabInfo.left = sessionStorage.getItem('pname');
          this.tabInfo.right = '注销登录';
        }
        let path = window.location.href.split("/");
        if (path[path.length - 2].toLowerCase() !== 'account') {
          console.log('sss');
          this.activeIndex = '3';
        }

        else if (path[path.length - 1].toLowerCase() === 'login')
          this.activeIndex = '1';
        else this.activeIndex = '2';
      }
    }
  }
</script>

<style scoped>
  .left_tab {
    text-align: center;
    width: 50%;
  }

  .right_tab {
    text-align: center;
    width: 50%;
  }

  .left_tab:hover,
  .right_tab:hover {
    background-color: #545c64;
  }
</style>
