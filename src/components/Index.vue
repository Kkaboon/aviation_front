<template>
  <div id="index_back" :style="bg" style="height: 874px;" align="center">

  </div>
</template>

<script>
  export default {
    name: "Index",
    mounted() {
      document.getElementById('index_back').style.backgroundSize = '100% 100%';
    },
    data() {
      return {
        bg: {
          background: 'url(' + require('../assets/012.jpg') + ') no-repeat'
        }
      }
    }
  }
</script>

<style scoped>

</style>
