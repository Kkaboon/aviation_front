<template>
  <div style="height: 875px; padding-top: 20px;" :style="bg" align="center">
    <div align="right" style="padding-right: 200px; padding-top: 30px">
      <el-button type="primary" @click="dialogAddVisible = true">添加航班</el-button>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 90%; margin-top: 50px"
      align="center"
      :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass">
      <el-table-column
        align="center"
        property="0"
        sortable
        label="航班号"
        width=auto>
      </el-table-column>
      <el-table-column
        align="center"
        property="1"
        sortable
        label="出发机场"
        width=auto>
      </el-table-column>
      <el-table-column
        align="center"
        property="2"
        sortable
        label="达到机场"
        width=auto>
      </el-table-column>
      <el-table-column
        align="center"
        property="3"
        sortable
        label="出发时间"
        width=auto>
      </el-table-column>
      <el-table-column
        align="center"
        property="4"
        sortable
        label="剩余座位"
        width=auto>
      </el-table-column>
      <el-table-column
        align="center"
        property="5"
        sortable
        label="飞机型号"
        width=auto>
      </el-table-column>
      <el-table-column
        align="center"
        property="6"
        sortable
        label="机票价格"
        width=auto>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button round
                     @click="window(scope.row)"
                     icon="el-icon-goods"
                     size="medium"
                     type="primary">修改航班信息
          </el-button>
          <el-button round
                     @click="removed(scope.row)"
                     icon="el-icon-warning"
                     size="medium"
                     type="danger">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加航班" :visible.sync="dialogChangeVisible" style="width: 60%;  padding-left: 400px" align="center">
      <div style="margin:0 auto;padding-top: 20px;width: 80%;position: center">
        <el-form ref="form" :model="flights" invisible="false" label-position="left">
          <el-form-item label="出发时间">
            <el-tag class="sTag" size="small">选填</el-tag>
            <el-col :span="15">
              <el-date-picker
                v-model="flights.datetime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="机票价格">
            <el-col :span="15">
              <el-input v-model="flights.price" placeholder="修改后的价格"></el-input>
            </el-col>
            <el-tag class="sTag" size="small">选填</el-tag>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChangeVisible = false">取 消</el-button>
        <el-button type="primary" @click="ModifyFlight()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加航班" :visible.sync="dialogAddVisible" style="width: 1000px; " align="center">
      <el-form ref="Flight" :model="Flight" invisible="false" label-position=left>
        <el-form-item label="航班号">
          <el-input v-model="Flight.fl_no" placeholder="请输入航班号"></el-input>
        </el-form-item>
        <el-form-item label="出发机场">
          <el-select v-model="Flight.departure">
            <el-option label="北京首都国际机场" value="北京首都国际机场"></el-option>
            <el-option label="上海浦东国际机场" value="上海浦东国际机场"></el-option>
            <el-option label="上海虹桥机场" value="上海虹桥机场"></el-option>
            <el-option label="广州白云机场" value="广州白云机场"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到达机场">
          <el-select v-model="Flight.arrival">
            <el-option label="北京首都国际机场" value="北京首都国际机场"></el-option>
            <el-option label="上海浦东国际机场" value="上海浦东国际机场"></el-option>
            <el-option label="上海虹桥机场" value="上海虹桥机场"></el-option>
            <el-option label="广州白云机场" value="广州白云机场"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出发时间">
          <el-date-picker
            v-model="Flight.datetime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="剩余座位">
          <el-input v-model="Flight.seats" placeholder="剩余座位"></el-input>
        </el-form-item>
        <el-form-item label="飞机型号">
          <el-input v-model="Flight.plane_no" placeholder="飞机型号"></el-input>
        </el-form-item>
        <el-form-item label="机票价格">
          <el-input v-model="Flight.price" placeholder="机票价格"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddFlight()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {formatDate} from '../../resources/date.js';
  import moment from "moment";

  export default {
    name: "Flights",
    data() {
      return {
        dialogChangeVisible: false,
        dialogAddVisible: false,
        bg: {
          background: 'url(' + require('../../assets/002.jpg') + ') no-repeat',
          backgroundSize: "100% 100%",
        },
        tableData: [],
        flights: {
          fno: '',
          datetime: '',
          price: '',
        },
        Flight: {
          fl_no: '',
          departure: '',
          arrival: '',
          seats: '',
          plane_no: '',
          datetime: '',
          price: '',
        },
      }
    },
    methods: {
      getRowClass({row, column, rowIndex, columnIndex}) {
        return "background-color: rgba(255,255,255,0.1);"
      },
      findflights() {
        let airlineno = sessionStorage.getItem("airlineno");
        this.$ajax.get('http://localhost:8080/flight/findflights?airno=' + airlineno).then(res => {
          console.log(res);
          for (let i = 0; i < res.data.length; i++) {
            this.tableData.push(res.data[i]);
            let d = new Date(res.data[i][3]);
            let times = formatDate(d, 'yyyy-MM-dd hh : mm');
            this.tableData[i][3] = times;
          }
        })
      },
      window(CurrentUser) {
        this.flights.fno = CurrentUser[0];
        this.dialogChangeVisible = true;
      },
      ModifyFlight() {
        console.log(this.flights.fno);
        console.log(this.flights.price);
        if (this.flights.datetime === '') {
          this.$ajax.get('http://localhost:8080/flight/modifybyprice?price=' + this.flights.price).then(res => {
            console.log(res);
            if (res.data === 'success') {
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          }).then(() => {
            location.reload();
          })
        } else {
          let date = moment(this.flights.datetime).format('YYYYMMDDHHmmss');
          console.log(date);
          this.$ajax.get('http://localhost:8080/flight/modifyflight?fno=' + this.flights.fno + '&dtime=' + date + '&price=' + this.flights.price).then(res => {
            console.log(res);
            if (res.data === 'success') {
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          }).then(() => {
            location.reload();
          })
        }

      },
      AddFlight() {
        let date = moment(this.Flight.datetime).format('YYYYMMDDHHmmss');
        let flightno = this.Flight.fl_no;
        let departureairport = this.Flight.departure;
        let arrivalairport = this.Flight.arrival;
        let departuretime = date;
        let sr=this.Flight.seats;
        let planeno = this.Flight.plane_no;
        let price = this.Flight.price;

        this.$ajax.get('http://localhost:8080/flight/addOne?fno='+flightno+'&dpt='+departureairport+'&apt='+arrivalairport+'&dtime='+departuretime+'&sr='+sr+'&pno='+planeno+'&price='+price).then(res => {
          console.log(res);
          if (res.data === 'success') {
            this.$message.success("增加成功");
          } else {
            this.$message.error("增加失败");
          }
        }).then(() => {
          location.reload();
        })
      },
      removed(currentUser) {
        console.log("删除航班");
        this.$confirm(
          "此操作将永久删除航班, 是否继续?",
          "提示",
          {
            type: "warning"
          }
        ).then(() => {
          console.log("确认删除航班");
          // 向请求服务端删除
          let fno = currentUser[0];
          console.log(fno);

          this.$ajax.get('http://localhost:8080/flight/deleteflight?fno=' + fno).then(response => {
            console.log(response);
            if (response.data === "success") {
              this.$message.success("删除成功");
            }
          }).catch(function (error) {
            console.log(error)
          });
        }).catch(() => {
          this.$message.info("canceled");
        }).then(() => {location.reload();})
      },
      check(){
        if (sessionStorage.getItem("airlineno")==='0') {
          this.$message({
            message: '您不是航空公司人员',
            type: 'error'
          });
          this.$router.go(-1);
          return;
        }
      }
    },
    mounted() {
      this.check();
      this.findflights();
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
