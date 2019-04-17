<template>
  <div style="height: 875px; " :style="bg">
    <div style="padding-top: 20px;" align="center">
      <el-button type="primary" @click="dialogQueryVisible = true">查询</el-button>

      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 80%; margin-top: 50px"
        align="center"
        :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass">
        <el-table-column
          align="center"
          property="0"
          sortable
          label="姓名"
          width=auto>
        </el-table-column>
        <el-table-column
          align="center"
          property="1"
          sortable
          label="身份证号"
          width=auto>
        </el-table-column>
        <el-table-column
          align="center"
          property="2"
          sortable
          label="起飞时间"
          width=auto>
        </el-table-column>
        <el-table-column
          align="center"
          property="3"
          sortable
          label="机票号"
          width=auto>
        </el-table-column>
        <el-table-column
          align="center"
          property="4"
          sortable
          label="航班号"
          width=auto>
        </el-table-column>
        <el-table-column
          align="center"
          property="5"
          sortable
          label="价格"
          width=auto>
        </el-table-column>
      </el-table>

      <el-dialog title="订单查询" :visible.sync="dialogQueryVisible" style="width: 55%;  padding-left: 400px">

        <div style="margin:0 auto;padding-top: 20px;width: 80%;position: center">

          <el-form ref="form" :model="form" label-width="80px" invisible="false">
            <el-form-item label="航班号" lable-width="30px">
              <el-col :span="30">
                <el-input v-model="form.fno" placeholder="输入航班号">
                </el-input>
              </el-col>
              <el-tag class="sTag" size="small">选填</el-tag>
            </el-form-item>
            <el-form-item label="身份证号" lable-width="50px">
              <el-col :span="40">
                <el-input v-model="form.idno" placeholder="输入乘客身份证号"></el-input>
              </el-col>
              <el-tag class="sTag" size="small">选填</el-tag>
            </el-form-item>
          </el-form>
        </div>
        <div id="dia" slot="footer" class="dialog-footer">
          <el-button @click="dialogQueryVisible = false">取 消</el-button>
          <el-button type="primary" @click="query">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '../../resources/date.js';

  export default {
    name: "UserQuery",
    data() {
      return {
        bg: {
          background: 'url(' + require('../../assets/002.jpg') + ') no-repeat',
          backgroundSize: "100% 100%",
        },
        dialogQueryVisible: false,
        form: {
          fno: "",
          idno: ""
        },
        tableData: [],
        currentRow: null
      }
    },
    mounted() {
      if (sessionStorage.getItem('login_state') === 'true') {
        this.isAd();
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
        return "background-color: rgba(255,255,255,0.1);";
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      query() {
        console.log(this.tableData.length);
        for (let i = 0; i <= 100; i++) {
          this.tableData.pop();
        }
        //this.tableData.cleanup();
        let flight = this.form.fno;
        let identity = this.form.idno;
        if (flight === "") {
          flight = 0;
        }
        if (identity === "") {
          identity = 0;
        }
        this.$ajax.get('http://localhost:8080/ticket/findorder?fno=' + flight + '&idno=' + identity).then(response => {
          console.log(response);
          for (let i = 0; i < response.data.length; i++) {
            let d = new Date(response.data[i][2]);
            this.tableData.push(response.data[i]);
            let times = formatDate(d, 'yyyy-MM-dd hh : mm');
            console.log(times);
            this.tableData[i][2] = times;
          }
        }).then(this.close());
      },
      close() {
        this.dialogQueryVisible = false;
        //this.$refs['form'].resetFields();
      }
    }
  }
</script>

<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .orderTitle {
    border-bottom: 2px #409eff solid;
    font-size: 24px;
    padding-bottom: 10px;
  }

  .el-table,
  .el-table__expanded-cell {
    background-color: rgba(63, 94, 100, 0.1);
  }

  .el-table:hover,
  .el-table__expanded-cell:hover {
    background-color: rgba(63, 94, 100, 0.1);
  }
</style>
