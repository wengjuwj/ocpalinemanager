<template>
  <div class="app-container">
    <div class="filter-container">
          <el-input placeholder="请输入点赞机器人名称" style="width:200px" class="filter-item"/>
          <el-button  class="filter-item" type="primary" icon="el-icon-search" >
            搜索
          </el-button>
    </div>
    <!--  -->
    <div class="operation-container filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate"> 
            新建点赞机器人
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
        prop="name"
        label="点赞机器人名称"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
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
    <!-- 新建-编辑点赞机器人信息 弹框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="点赞机器人名称" prop="name">
          <el-col :span="24">
            <el-input v-model="temp.name" />
          </el-col>
        </el-form-item>
         <el-form-item label="点赞机器人头像">
          <el-col :span="24">
           <uploadImg></uploadImg>
          </el-col>
        </el-form-item>
        <el-form-item label="描述">
          <el-col :span="24">
            <el-input v-model="temp.description" />
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
import { getThumbsList,createThumbs,updateThumbs } from '@/api/manager'
import { parseTime } from '@/utils'
import uploadImg from '../components/uploadImg'
export default {
  name:'thumbs',
  components:{Pagination,uploadImg},
  data(){
    return{
       tableData: [
        {
          id: '1',
          name: '慢性咳嗽与呼吸道感染诊治高峰论坛',
          description:''
        },{
          id: '2',
          name: '慢性咳嗽与呼吸道感染诊治高峰论坛',
          description:''
        }, {
          id: '3',
          name: '慢性咳嗽与呼吸道感染诊治高峰论坛',
          description:''
        }, {
          id: '4',
          name: '慢性咳嗽与呼吸道感染诊治高峰论坛',
          description:''
        }],
        // 新建弹框
        dialogFormVisible:false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '新建'
       },
      //  
       rules: {
        name: [{ required: true, message: '请填写点赞机器人名称', trigger: 'blur' }],
      },
      temp: {
        id: undefined,
        name: '',
        description: ''
      },
      test:[1,2,3,4],
      multipleSelection:[],
      total:100,
      listQuery: {
        page: 1,
        limit: 10,
        name:undefined,
        sort: '+id'
      },
    }
  },
  created(){
    this.getList();
  },
  watch:{

  },
  methods:{
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        description: ''
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
          createThumbs(tempData).then(() => {
             this.tableData.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
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
          updateThumbs(tempData).then(() => {
            const index = this.tableData.findIndex(v => v.id === this.temp.id)
            this.tableData.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
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
        title: 'Success',
        message: 'Delete Successfully',
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
      getThumbsList(this.listQuery).then(response => {
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
</style>