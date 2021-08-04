<template>
  <div class="app-container">
    <div class="filter-container">
          <el-input v-model="listQuery.robots_group_name" placeholder="请输入机器人组合" style="width:200px" class="filter-item" />
          <el-button  class="filter-item" type="primary" icon="el-icon-search" >
            搜索
          </el-button>
    </div>
    <!--  -->
    <div class="operation-container filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate"> 
            新建机器人组合
      </el-button>
      <el-button class="filter-item" type="danger" icon="el-icon-delete" :disabled="multipleSelection.length==0"> 
            删除
      </el-button>
    </div>
    <el-table
      :data="tableData"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
      type="selection"
      align="center"
      width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        sortable="custom"
        align="center"
        width="180">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="robots_group_name"
        label="机器人组合名称"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.robots_group_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="thumbs_group_name"
        label="点赞组合"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.thumbs_group_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="thumbs_space_time"
        label="点赞间隔时间"
        align="center"
        >
        <template slot-scope="{row}">
          <span>
            {{ row.thumbs_space_time }}
            <span v-if="row.thumbs_time_unit==0">时</span>
            <span v-if="row.thumbs_time_unit==1">分</span>
            <span v-if="row.thumbs_time_unit==2">秒</span>  
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="comments_group_name"
        label="评论组合"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.comments_group_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="comments_space_time"
        label="评论间隔时间"
        align="center"
        >
        <template slot-scope="{row}">
          <span>
            {{ row.comments_space_time }}
            <span v-if="row.comments_time_unit==0">时</span>
            <span v-if="row.comments_time_unit==1">分</span>
            <span v-if="row.comments_time_unit==2">秒</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="robots_group_description"
        label="组合描述"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.robots_group_description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-tooltip content="编辑" placement="top" effect="light">
             <el-button type="primary" icon="el-icon-edit" circle @click="handleUpdate(row)">
             </el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top" effect="light">
             <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(row,$index)">
             </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" style="margin-top:0;"/>
    <!-- 新建-编辑信息 弹框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="margin-left:50px;">
        <el-form-item label="机器人组合名称" prop="robots_group_name">
          <el-col :span="14">
             <el-input v-model="temp.robots_group_name" />
          </el-col>
        </el-form-item>
        <el-form-item label="点赞组合">
          <MultipleSelect></MultipleSelect>
        </el-form-item>
        <el-form-item label="点赞间隔时间">
          <el-col :span="14">
             <el-input type="number" v-model="temp.thumbs_space_time" />
          </el-col>
          <el-col :span="10">
            <el-radio-group v-model="temp.thumbs_time_unit" style="margin-left:15px">
              <el-radio :label="0">时</el-radio>
              <el-radio :label="1">分</el-radio>
              <el-radio :label="2">秒</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="评论组合">
          <MultipleSelect></MultipleSelect>
        </el-form-item>
        <el-form-item label="评论间隔时间">
          <el-col :span="14">
              <el-input type="number" v-model="temp.comments_space_time" />
          </el-col>
          <el-col :span="10">
            <el-radio-group v-model="temp.comments_time_unit" style="margin-left:15px">
              <el-radio :label="0">时</el-radio>
              <el-radio :label="1">分</el-radio>
              <el-radio :label="2">秒</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="组合描述">
          <el-col :span="14">
             <el-input v-model="temp.robots_group_description" />
          </el-col>         
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import MultipleSelect from '@/views/manager/components/multipleSelect.vue' // secondary package based on el-pagination
import { getRobotGroupList,createRobotGroup,updateRobotGroup } from '@/api/manager'
import { parseTime } from '@/utils'
export default {
  name:'thumbs',
  components:{Pagination,MultipleSelect},
  data(){
    return{
       tableData: [
        {
          id: '1',
          robots_group_name: '慢性咳嗽与呼吸道感染诊治高峰论坛',
          thumbs_group_name:'',
          thumbs_space_time:'',
          thumbs_time_unit:1,
          comments_group_name:'',
          comments_space_time:'',
          comments_time_unit:'',
          robots_group_description:'',
        },
        ],
        // 新建弹框
        dialogFormVisible:false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '新建'
       },
      //  
       rules: {
        robots_group_name: [{ required: true, message: '请填写组合名称', trigger: 'blur' }],
      },
      temp: {
        id: undefined,
        robots_group_name: '',
        thumbs_group_name: '',
        thumbs_space_time: '',
        thumbs_time_unit:1,
        comments_group_name: '',
        comments_space_time: '',
        comments_time_unit:1,
        robots_group_description: '',
      },
      test:[1,2,3,4],
      multipleSelection:[],
      total:100,
      listQuery: {
        page: 1,
        limit: 10,
        robots_group_name:undefined,
        sort: '+id'
      },
    }
  },
  created(){
    this.getList();
    for(let i=0;i<10;i++){
      let mock={
            id: i+1,
            name: '机器人名称'+(i+1),
            description:'描述描述'+(i+1),
        }
    this.robotData.push(mock)
    }
  },
  watch:{

  },
  methods:{
    resetTemp() {
      this.temp = {
        id: undefined,
        robots_group_name: '',
        thumbs_group_name: '',
        thumbs_space_time: '',
        thumbs_time_unit:1,
        comments_group_name: '',
        comments_space_time: '',
        comments_time_unit:1,
        robots_group_description: '',
      }
    },
    // 新建点赞机器人
    handleCreate(){
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 编辑点赞机器人
    handleUpdate(row){
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData(){
       this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          const tempData = Object.assign({}, this.temp)
          createRobotGroup(tempData).then(() => {
             this.tableData.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '提示',
              message: '新建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData(){
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateRobotGroup(tempData).then(() => {
            const index = this.tableData.findIndex(v => v.id === this.temp.id)
            this.tableData.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '提示',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 删除
    handleDelete(row, index) {
      this.$notify({
        title: '提示',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.tableData.splice(index, 1)
    },
    // 表格复选
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    // 获取列表数据
    getList(){
      getRobotGroupList(this.listQuery).then(response => {
        this.tableData = response.data.data
        this.total = response.data.total
      })
    },
  }

}
</script>

<style lang="scss" scoped>
.filter-item{
  margin-right: 10px;
}
.el-form{
  // .el-form-item{
  //   width: 400px;
  // }
}
</style>