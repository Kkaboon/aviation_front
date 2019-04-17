<template>
  <div id="app">
    <el-container>
      <el-header style="padding: 0; background-color: #750000;">
        <router-view class="head_left" name="head_left"></router-view>
        <router-view class="head_right" name="head_right"></router-view>
      </el-header>
      <el-container>
        <el-main>
          <router-view name="main"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

body {
   margin: 0 auto;
   padding: 0 auto;
}

.mainContainer {

  display: flex;
  min-height: 100%;
}


.el-main {
  background-color: #ffffff00;
  padding: 0;
  margin: 0 auto;

}
.head_left {
  width: 500px;
  float: left;
  display: block;
}

.head_right {
  width: 240px;
  float: right;
  display: block;
}
</style>
