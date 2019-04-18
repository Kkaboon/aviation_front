<template>
  <div style="height: 875px;" :style="bg">
    <div style="margin:0 auto;padding-top: 100px;width: 35%; padding-left: 200px">
      <el-main>
        <el-form ref="form" :model="form" label-width="70px" invisible="false">
          <el-form-item label="航班号">
            <el-col span=11>
              <el-input id="flightno" v-model="form.fno" placeholder="请输入航班号">
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="出发时间" lable-width="40px">
            <el-col span=11>
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>

          </el-form-item>
        </el-form>
        <div style="padding-left: 80px">
          <el-button type="primary" icon="el-icon-search" @click="queryFlights">搜索</el-button>
        </div>
      </el-main>
    </div>
    <el-main style="padding-top: 50px;position: center ">
      <el-table
        :data="datatable"
        style="width: 90%; margin: 0 auto;"
        :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass">
        <el-table-column
          align="center"
          label="航班号"
          prop="0"
          width="auto">
        </el-table-column>
        <el-table-column
          align="center"
          label="出发机场"
          prop="1"
          width="auto">
        </el-table-column>
        <el-table-column
          align="center"
          label="到达机场"
          prop="2"
          width="auto">
        </el-table-column>
        <el-table-column
          align="center"
          label="出发时间"
          prop="3"
          width="auto">
        </el-table-column>
        <el-table-column
          align="center"
          label="剩余座位数"
          prop="4"
          width="auto">
        </el-table-column>
        <el-table-column
          align="center"
          label="价格"
          prop="5"
          width="auto">
        </el-table-column>
        <el-table-column
          align="center"
          label="航空公司"
          prop="6"
          width="auto">
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              @click="buyTicket(scope.row)"
              icon="el-icon-info"
              size="mini"
              type="info">购票
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
  import moment from 'moment';
  import {formatDate} from '../../resources/date.js';

  export default {
    name: "Ticket",

    methods: {
      getRowClass({row, column, rowIndex, columnIndex}) {
        return "background-color: rgba(255,255,255,0.1); font-color:#FFFFFF;"
      },
      flightnoValidation() {

      },
      queryFlights() {
        for (let i = 0; i <= this.datatable.length; i++) {
          this.datatable.pop();
        }
        this.flightnoValidation();
        let date = moment(this.form.date1).format('YYYYMMDD');
        console.log(date);
        this.$ajax.get('http://localhost:8080/flight/findbyfnoandtime?fno=' + this.form.fno + '&date=' + date)
          .then(response => {
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
              let d = new Date(response.data[i][3]);
              this.datatable.push(response.data[i]);
              console.log(d);
              let times = formatDate(d, 'yyyy-MM-dd hh : mm');
              console.log(times);
              this.datatable[i][3] = times;
            }
          }).catch(function (error) {
          console.log(error);
        })
      },
      buyTicket(row) {
        console.log(sessionStorage.getItem('login_state'));
        if (sessionStorage.getItem('login_state')==='true'){
        console.log(row);
        console.log(row[0]);
        let idno = sessionStorage.getItem("idno");
        let flightno = row[0];
        this.$ajax.post('http://localhost:8080/ticket/addone?idno=' + idno + '&fno=' + flightno).then(respense => {
          console.log(respense);
          if (respense.data === 'success') {
            this.$message({message: '购票成功！', type: 'success'});
          } else {
            this.$message.error('购票失败!');
          }
        })}
        else
        {
          this.$message.error('请先登陆！');
        }
      }
    },
    data() {
      return {
        bg: {
          background: 'url(' + require('../../assets/002.jpg') + ') no-repeat',
          backgroundSize: "100% 100%"
        },
        form: {
          fno: '',
          date1: ''
        },
        datatable: []
      }
    }
  }
</script>

<style scoped>
  .el-table,
  .el-table__expanded-cell {
    background-color: rgba(255, 255, 255, 0.7);
  }

  .el-table:hover,
  .el-table__expanded-cell:hover {
    background-color: rgba(63, 94, 100, 0.5);
  }
</style>
