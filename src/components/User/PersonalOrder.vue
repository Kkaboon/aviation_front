<template>
  <div style="height: 875px;" :style="bg ">
    <div style="padding-top: 50px;" align="center">
      <el-table
        :data="datatable"
        style="width: 1050px; margin: 0 auto;"
        :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass">
        <el-table-column
          align="center"
          label="机票编号"
          prop="0"
          sortable
          width="auto">
        </el-table-column>
        <el-table-column
          align="center"
          label="航班号"
          prop="1"
          sortable
          width="auto">
        </el-table-column>
        <el-table-column
          align="center"
          label="出发时间"
          prop="2"
          sortable
          width="auto">
        </el-table-column>
        <el-table-column
          align="center"
          label="出发机场"
          prop="3"
          sortable
          width="auto">
        </el-table-column>
        <el-table-column
          align="center"
          label="到达机场"
          prop="4"
          sortable
          width="auto">
        </el-table-column>
        <el-table-column
          align="center"
          label="机票价格(CNY)"
          prop="5"
          sortable
          width="auto">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '../../resources/date.js';

  export default {
    name: "PersonalOrder",
    methods: {
      getRowClass({row, column, rowIndex, columnIndex}) {
        return "background-color: rgba(255,255,255,0.1); font-weight: bold; font-color:#FFFFFF;"
      },
      gettickets() {
        let idno = sessionStorage.getItem("idno");
        this.$ajax.get('http://localhost:8080/ticket/findown?idno=' + idno).then(response => {
          console.log(response);
          for (let i = 0; i < response.data.length; i++) {
            let d = new Date(response.data[i][2]);
            /*let times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            this.datatable.push(times);*/
            this.datatable.push(response.data[i]);
            console.log(d);
            //let times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + (d.getHours()-8) + ':' + d.getMinutes() + ':' + d.getSeconds();
            //let times =moment(d).format('YYYY-MM-DD HH:mm:ss');
            let times = formatDate(d, 'yyyy-MM-dd hh : mm');
            console.log(times);
            this.datatable[i][2] = times;

          }
        })
      }
    },
    mounted() {
      this.gettickets();
    },
    data() {
      return {
        bg: {
          background: 'url(' + require('../../assets/002.jpg') + ') no-repeat',
          backgroundSize: "100% 100%",
        },
        datatable: []
      }
    }
  }
</script>

<style scoped>
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
