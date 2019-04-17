<template>
  <div style="height: 875px; padding-top: 20px;" :style="bg" align="center">
    <el-table
      ref="singleTable"
      :data="datatable"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 80%; margin-top: 50px"
      align="center"
      :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass">
      <el-table-column
        align="center"
        property="0"
        sortable
        label="身份证号"
        width=auto>
      </el-table-column>
      <el-table-column
        align="center"
        property="1"
        sortable
        label="姓名"
        width=auto>
      </el-table-column>
      <el-table-column
        align="center"
        property="2"
        sortable
        label="性别"
        width=auto>
      </el-table-column>
      <el-table-column
        align="center"
        property="3"
        sortable
        label="电话号码"
        width=auto>
      </el-table-column>
      <el-table-column
        align="center"
        property="4"
        sortable
        label="地址"
        width=auto>
      </el-table-column>
      <el-table-column
        align="center"
        property="5"
        sortable
        label="密码"
        width=auto>
      </el-table-column>
      <el-table-column
        align="center"
        property="6"
        sortable
        label="身份"
        width=auto>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "AllUsers",
    data() {
      return {
        bg: {
          background: 'url(' + require('../../assets/002.jpg') + ') no-repeat',
          backgroundSize: "100% 100%",
        },
        datatable: []
      }
    },
    mounted() {
      if (sessionStorage.getItem('login_state') === 'true') {
        this.isAd();
        this.getps();
      } else {
        this.$message.error('请先登陆！');
        this.$router.go(-1);
        return;
      }
    },
    methods: {
      isAd() {
        console.log('是否是管理员：' + sessionStorage.getItem('isAd'));
        if (sessionStorage.getItem('isAd') === 'false') {
          this.$message({
            message: '您不是管理员',
            type: 'error'
          });
          this.$router.go(-1);
          return;
        }
      },
      getRowClass({row, column, rowIndex, columnIndex}) {
        return "background-color: rgba(255,255,255,0.1);"
      },
      getps() {
        this.$ajax.get('http://localhost:8080/passenger/findall').then(responese => {
          console.log(responese);
          for (let i = 0; i < responese.data.length; i++) {
            this.datatable.push(responese.data[i]);
            let ad;
            if (responese.data[i][6] === false) {
              ad = '乘客';
            } else {
              ad = '管理员';
            }
            this.datatable[i][6] = ad;
          }
        })
      }
    },

  }

</script>

<style scoped>
  .el-table,
  .el-table__expanded-cell {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .el-table:hover,
  .el-table__expanded-cell:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
</style>
