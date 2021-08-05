<template>
  <div class="app-container">
    <div class="filter-container">
          <el-input placeholder="请输入专家名称" style="width:200px" class="filter-item" v-model="listQuery.professor_name"/>
          <el-input placeholder="职称" style="width:200px" class="filter-item" v-model="listQuery.professor_title"/>
          <el-input placeholder="专家分类" style="width:200px" class="filter-item" v-model="listQuery.professor_classification"/>
          <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="search">
            搜索
          </el-button>
    </div>
    <!--  -->
    <div class="operation-container filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate"> 
            新建专家
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
        >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="classification"
        label="专家名称"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.professor_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="professor_title"
        label="职称"
        align="center" 
        >
        <template slot-scope="{row}">
          <span>{{ row.professor_title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="professor_place"
        label="医院"
        align="center" 
        >
        <template slot-scope="{row}">
          <span>{{ row.professor_place}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="professor_avatar"
        label="头像"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.professor_avatar}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="professor_shortcut"
        label="简介"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.professor_shortcut}}</span>
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="专家名称" prop="professor_name">
          <el-col :span="24">
             <el-input v-model="temp.professor_name" />
          </el-col>
        </el-form-item>
         <el-form-item label="职称" prop="professor_title">
            <el-col :span="24">
                <el-input v-model="temp.professor_title" />
          </el-col>
        </el-form-item>
        <el-form-item label="头像">
           <el-col :span="24">
             <uploadImg></uploadImg>
          </el-col>
        </el-form-item>
        <el-form-item label="医院">
            <el-col :span="24">
                <el-input v-model="temp.professor_classification" />
          </el-col>
        </el-form-item>
        <el-form-item label="简介">
            <el-col :span="24">
                <el-input v-model="temp.professor_shortcut" />
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
import { getProfessorsList,createProfessor,updateProfessor } from '@/api/manager'
import { parseTime } from '@/utils'
import uploadImg from '../components/uploadImg'
export default {
  name:'liveList',
  components:{Pagination,uploadImg},
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
        professor_name: [{ required: true, message: '专家名称不能为空', trigger: 'change' }],
        professor_title:[{ required: true, message: '职称不能为空', trigger: 'change' }],
        professor_avatar:[{ required: true, message: '头像不能为空', trigger: 'change' }]
      },
      temp: {
        id: undefined,
        professor_name: '',
        professor_title:'',
        professor_avatar:'',
        professor_classification:'',
        professor_shortcut:'',
      },
      test:[1,2,3,4],
      multipleSelection:[],
      total:100,
      listQuery: {
        page: 1,
        limit: 10,
        professor_name: '',
        professor_title: '',
        professor_classification: '',
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
        professor_name: '',
        professor_title:'',
        professor_avatar:'',
        professor_classification:'',
        professor_shortcut:'',
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
          if(this.temp.parent_status=='0'){
            this.temp.parent=""
          }
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createProfessor(this.temp).then(() => {
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
    // 编辑
    updateData(){
     this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if(this.temp.parent_status=='0'){
            this.temp.parent=""
          }
          const tempData = Object.assign({}, this.temp)
          updateProfessor(tempData).then(() => {
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
      getProfessorsList(this.listQuery).then(response => {
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