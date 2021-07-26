<template>
  <div class="app-container">
    <div class="filter-container">
          <el-input placeholder="请输入分类名称" style="width:200px" class="filter-item" v-model="listQuery.classification"/>
          <el-select  placeholder="请选择分类状态" clearable style="width: 150px" class="filter-item" v-model="listQuery.status">
            <el-option label="已启用" value="1"/>
            <el-option label="未启用" value="0"/>
          </el-select>
          <el-select  placeholder="请选择分类级别" clearable style="width: 150px" class="filter-item" v-model="listQuery.classification_level">
            <el-option v-for="item in test" :key="item" :label="item" :value="item" />
          </el-select>
          <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="search">
            搜索
          </el-button>
    </div>
    <!--  -->
    <div class="operation-container filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate"> 
            新建分类
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
        prop="classification"
        label="分类名称"
        align="center"
        width="400px"
        >
        <template slot-scope="{row}">
          <span>{{ row.classification }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="分类状态"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="classification_level"
        label="分类级别"
        align="center"
        width="200px"
        >
        <template slot-scope="{row}">
          <span>{{ row.classification_level}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="分类描述"
        align="center"
        width="200px"
        >
        <template slot-scope="{row}">
          <span>{{ row.description}}</span>
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
    <!-- 新建-编辑直播间信息 弹框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="分类名称" prop="classification">
          <el-input v-model="temp.classification" />
        </el-form-item>
        <el-form-item label="分类状态" prop="status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select" style="width:100%">
            <el-option v-for="item in test" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
         <el-form-item label="分类级别">
          <el-select v-model="temp.classification_level" class="filter-item" placeholder="Please select" style="width:100%">
            <el-option v-for="item in test" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input v-model="temp.description" />
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
import { getClassificationList,createClassification,updateClassification } from '@/api/manager'
import { parseTime } from '@/utils'
export default {
  name:'liveList',
  components:{Pagination},
  data(){
    return{
       tableData: [],
        // 新建弹框
        dialogFormVisible:false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '新建'
       },
      //  
       rules: {
        classification: [{ required: true, message: '请填写分类名称', trigger: 'change' }]
      },
      temp: {
        id: undefined,
        classification: '',
        status: '',
        description:'',
        classification_level: '',
      },
      test:[1,2,3,4],
      multipleSelection:[],
      total:100,
      listQuery: {
        page: 1,
        limit: 10,
        classification: undefined,
        status: undefined,
        classification_level: undefined,
        sort: '+id'
      },
    }
  },
  created(){
    this.getList()
  },
  watch:{

  },
  methods:{
    resetTemp() {
      this.temp = {
        id: undefined,
        classification: '',
        status: '',
        description:'',
        classification_level: '',
      }
    },
    // 新建分类
    handleCreate(){
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 编辑分类
    handleUpdate(row){
      this.temp = Object.assign({}, row) // copy obj
      this.temp.telecase_time = new Date(this.temp.telecase_time)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 新增
    createData(){
       this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createClassification(this.temp).then(() => {
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
    // 编辑
    updateData(){
     this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateClassification(tempData).then(() => {
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
      getClassificationList(this.listQuery).then(response => {
        this.tableData = response.data.data
        this.total = response.data.total
      })
    },
    // 搜索按钮点击
    search(){
      this.getList()
    }
  }

}
</script>

<style lang="scss" scoped>
.filter-item{
  margin-right: 10px;
}
</style>