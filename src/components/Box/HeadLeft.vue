<template>

  <div @mouseover="mouseOver" @mouseleave="mouseLeave" :style="active">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#750000"
      text-color="#FFF"
      active-text-color="#FFF"
    >
      <el-menu-item index="1" style="font-size: 24px;">
        <img :src="donghua" width="50" height="50" style="vertical-align: center;">
        &nbsp;&nbsp;东华航空
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">机票</template>
        <el-menu-item index="2-1">城市查询</el-menu-item>
        <el-menu-item index="2-2">航班查询</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">后台管理</template>
        <el-menu-item index="3-1">订单查询</el-menu-item>
        <el-menu-item index="3-2">用户信息</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">我的</template>
        <el-menu-item index="4-1">信息修改</el-menu-item>
        <el-menu-item index="4-2">订单记录</el-menu-item>
      </el-submenu>
      <el-menu-item index="5">航班管理</el-menu-item>
    </el-menu>
  </div>

</template>

<script>

  export default {
    name: "HeadLeft",
    data() {
      return {
        dialogCreateVisible: false,
        activeIndex: '1',
        SectionInfo: [],
        donghua: require('../../assets/logo.jpg')
      };
    },
    mounted() {
      this.loadSections();
    },
    methods: {
      mouseOver: function () {
        this.active = 'background-color: #ff0000';
      },
      mouseLeave: function () {
        this.active = '';
      },
      handleSelect(key) {
        switch (key) {
          case '1':
            this.$router.push({path: '/Index'});
            break;
          case '2-1':
            this.$router.push({path:'/Ticket/CityTicket'});
            break;
          case '2-2':
            this.$router.push({path:'/Ticket/AcTicket'});
            break;
          case '3-1':
            this.$router.push({path: '/BackStage/UserQuery'});
            break;
          case '3-2':
            this.$router.push({path: '/BackStage/AllUsers'});
            break;
          case '4-1':
            this.$router.push({path:'/User/Modify'});
            break;
          case '4-2':
            this.$router.push({path:'/User/PersonalOrder'});
            break;
          case '5':
            this.$router.push({path: '/FlightCRUD/Flights'});
            break;
          default:
            if (key.length === 3 && key.substr(0, 2) === '2-')
              this.processSection(parseInt(key.substr(2, 1)));
            break;
        }
      },
      processSection(id) {
        console.log(id);
        this.$router.push({path: '/Post/PostList?section=' + id});
      },
      loadSections() {
        this.SectionInfo = [];
        this.$ajax({
          method: 'get',
          url: global_.server_host + '/section/findAll',
        }).then(response => {
          console.log(response.data);
          for (let i = 0; i < response.data.length; i++) {
            response.data[i]['indexId'] = '2-' + response.data[i].sectionId;
            this.SectionInfo.push(response.data[i]);
          }
        });
      }
    },
    watch: {
      '$route'() {
        let path = window.location.href.split("/");
        console.log(path);
        if (path.length >= 2 && path[path.length - 2].toLowerCase() === 'admin' &&
          path[path.length - 1].toLowerCase() === 'setting#') {
          this.loadSections();
          this.$router.push({path: '/Admin/Setting'});
        }
      }
    }
  }


</script>

<style scoped>

</style>
