<template>
  <div style="height: 875px; padding-top: 20px;" :style="bg" align="center">
    <el-table
      ref="singleTable"
      :data="datatable"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 95%; margin-top: 50px"
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
        width=90px>
      </el-table-column>
      <el-table-column
        align="center"
        property="2"
        sortable
        label="性别"
        width=90px>
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
      <el-table-column
        align="center"
        property="7"
        sortable
        label="航空公司"
        width=auto>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button round
                     @click="window(scope.row)"
                     icon="el-icon-goods"
                     size="medium"
                     type="primary">修改权限
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
    <el-dialog title="航空公司选择" :visible.sync="dialogChangeVisible" style="width: 55%;  padding-left: 400px">

      <div style="margin:0 auto;padding-top: 20px;width: 80%;position: center">
        <el-select v-model="airline" placeholder="请选择" @focus="getairlines()">
          <el-option
            v-for="item in airlines"
            :key="item.airlineno"
            :label="item.airlinename"
            :value="item.airlineno">
          </el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogQueryVisible = false">取 消</el-button>
        <el-button type="primary" @click="modify()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "AllUsers",
    data() {
      return {
        dialogChangeVisible:false,
        bg: {
          background: 'url(' + require('../../assets/002.jpg') + ') no-repeat',
          backgroundSize: "100% 100%",
        },
        datatable: [],
        airlines:[{
          airlineno:'',
          airlinename:''
        }],
        airline:'',
        idno:''
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
      window(currentUser){
        this.idno=currentUser[0];
        this.dialogChangeVisible = true
      },
      getairlines(){
        this.$ajax.get('http://localhost:8080/airline/findAll').then(response=>{
          console.log(response);
          //for(let i=0;i<response.data.length;i++)
          this.airlines=response.data;
        })
      },
      modify(){
        console.log(this.idno);
        console.log(this.airline);
        this.$ajax.get('http://localhost:8080/passenger/modifyPassenger?idno='+this.idno+'&airno='+this.airline,).then(
          response=>{
            console.log(response);
            if (response.data==='success'){
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          }
        ).then(() => {
          location.reload();})
      },
      getps() {
        this.$ajax.get('http://localhost:8080/passenger/findall').then(responese => {
          console.log(responese);
          for (let i = 0; i < responese.data.length; i++) {
            this.datatable.push(responese.data[i]);
            let ad;
            if (responese.data[i][6] === false && responese.data[i][7] === '无') {
              ad = '乘客';
            } else if (responese.data[i][6] === true) {
              ad = '管理员';
            } else {
              ad = '航空公司员工';
            }
            this.datatable[i][6] = ad;
          }
        })
      },
      removed(currentUser) {
        console.log("删除用户");
        this.$confirm(
          "此操作将永久删除用户, 是否继续?",
          "提示",
          {
            type: "warning"
          }
        ).then(() => {
          console.log("确认删除用户");
          // 向请求服务端删除
          let idno = currentUser[0];
          console.log(idno);
          this.$ajax.get('http://localhost:8080/passenger/deletePassenger?idno='+idno).then(response => {
            console.log(response);
            if (response.data === "success") {
              this.$message.success("删除成功");
            }
          }).catch(function (error) {
            console.log(error)
          });
        }).catch(() => {
          this.$message.info("canceled");
        }).then(() => {
          location.reload();
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
