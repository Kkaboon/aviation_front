<template>
  <div  style="height: 875px;" :style="bg">
    <div style="margin:0 auto;padding-top: 100px;width: 40%;position: center">
      <el-main>
        <el-form ref="form" :model="form"  >
          <el-form :inline="true" >
            <el-form-item label="出发机场">
              <el-select v-model="form.departure" placeholder="请选择活动区域">
                <el-option label="北京首都国际机场" value="北京首都国际机场"></el-option>
                <el-option label="上海浦东国际机场" value="上海浦东国际机场"></el-option>
                <el-option label="上海虹桥机场" value="上海虹桥机场"></el-option>
                <el-option label="广州白云机场" value="广州白云机场"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="到达机场">
              <el-select v-model="form.arrival" placeholder="请选择活动区域">
                <el-option label="北京首都国际机场" value="北京首都国际机场"></el-option>
                <el-option label="上海浦东国际机场" value="上海浦东国际机场"></el-option>
                <el-option label="上海虹桥机场" value="上海虹桥机场"></el-option>
                <el-option label="广州白云机场" value="广州白云机场"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <el-form-item label="出发时间" lable-width="40px">
            <el-col span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>

        </el-form>
        <div align="right"style="padding-right: 80px">
        <el-button  type="primary" icon="el-icon-search" @click="query">搜索</el-button>
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
  import moment from "moment";
  import {formatDate} from '../../resources/date.js';
  export default {
    name: "Ticket",
    methods: {
      query(){
        for (let i = 0; i <= this.datatable.length; i++) {
          this.datatable.pop();
        }
        let date = moment(this.form.date1).format('YYYYMMDD');
        console.log(this.form.departure);
        console.log(this.form.arrival);
        console.log(date);
        this.$ajax.get('http://localhost:8080/flight/findbyairportandtime?da='+this.form.departure+'&aa='+this.form.arrival+'&date='+date).then(response=>
        {
          console.log(response);
          for (let i = 0; i < response.data.length; i++) {
            let d = new Date(response.data[i][3]);
            this.datatable.push(response.data[i]);
            console.log(d);
            let times = formatDate(d, 'yyyy-MM-dd hh : mm');
            console.log(times);
            this.datatable[i][3] = times;
          }
        })
      },
      buyTicket(row) {
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
        })
      }
        else {
          this.$message.error('请先登陆！');
        }
      }
    },
    data() {
      return {
        bg: {
          background: 'url(' + require('../../assets/002.jpg') + ') no-repeat',
          backgroundSize: "100% 100%",
        },
        form: {
          departure:'',
          arrival:'',
          date1: '',
        },
        datatable:[]
      }
    }
  }
</script>

<style scoped>

</style>
