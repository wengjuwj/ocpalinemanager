<template>
  <div class="app-container">
    <div class="filter-container">
          <el-input placeholder="请输入直播间名称" style="width:200px" class="filter-item"/>
          <el-input placeholder="请输入主播名称" style="width:200px" class="filter-item"/>
          <el-select  placeholder="类别" clearable style="width: 150px" class="filter-item">
            <el-option  label="1" value="1" />
          </el-select>
          <el-select  placeholder="状态" clearable style="width: 150px" class="filter-item">
            <el-option  label="1" value="1" />
          </el-select>
          <el-button  class="filter-item" type="primary" icon="el-icon-search" >
            搜索
          </el-button>
    </div>
    <!--  -->
    <div class="operation-container filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate"> 
            新建直播间
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
        label="直播间名称"
        align="center"
        width="400px"
        >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="主播名称"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="telecase_time"
        label="直播日期"
        align="center"
        width="200px"
        >
        <template slot-scope="{row}">
          <span>{{ row.telecase_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="classification"
        label="分类"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.classification }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="visitors_num"
        label="访问量"
        align="center"
       >
       <template slot-scope="{row}">
          <span>{{ row.visitors_num }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="visitors_multiple"
        label="访问倍数"
        align="center"
       >
       <template slot-scope="{row}">
          <span>{{ row.visitors_multiple }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="comment_num"
        label="评论数"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.comment_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-tooltip content="编辑" placement="top" effect="light">
             <el-button type="primary" icon="el-icon-edit" circle @click="handleUpdate(row)">
             </el-button>
          </el-tooltip>
          <el-tooltip content="评论审核" placement="top" effect="light">
             <el-button type="success" icon="el-icon-s-check" circle @click="handleComment(row)">
             </el-button>
          </el-tooltip>
          <el-tooltip content="数据分析" placement="top" effect="light">
             <el-button type="primary" icon="el-icon-s-data" circle @click="handleAnalysis(row)">
             </el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top" effect="light">
             <el-button type="danger" icon="el-icon-delete" circle>
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
        <el-form-item label="直播间名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="主播名称" prop="user_name">
          <el-input v-model="temp.user_name" />
        </el-form-item>
        <el-form-item label="直播时间" prop="telecase_time">
          <el-date-picker v-model="temp.telecase_time" type="datetime" placeholder="Please pick a date" style="width:100%"/>
        </el-form-item>
        <el-form-item label="分类" prop="classification">
          <el-select v-model="temp.classification" class="filter-item" placeholder="Please select" style="width:100%">
            <el-option v-for="item in test" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
         <el-form-item label="状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select" style="width:100%">
            <el-option v-for="item in test" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="当前访问量" prop="title">
          <el-input v-model="temp.visitors_num" />
        </el-form-item>
        <el-form-item label="访问倍数" prop="title">
          <el-input v-model="temp.visitors_multiple" />
        </el-form-item>
        <el-form-item label="互动配置">
          <el-select v-model="temp.visitors_setting" class="filter-item" placeholder="Please select" style="width:100%">
            <el-option v-for="item in test" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="推流/拉流地址">
           <el-input v-model="temp.url" />
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
export default {
  name:'liveList',
  components:{Pagination},
  data(){
    return{
       tableData: [
        {
          id: '1',
          name: '慢性咳嗽与呼吸道感染诊治高峰论坛',
          url:"xxx.xxx.xxx",
          user_name:"主播1",
          classification:"分类1",
          status:"未开始",
          visitors_num:900,
          visitors_multiple:2,
          comment_num:2000,
          telecase_time:"2021-08-10 18:00"
        },{
          id: '2',
          name: '慢性咳嗽与呼吸道感染诊治高峰论坛',
          url:"xxx.xxx.xxx",
          user_name:"主播1",
          classification:"分类1",
          status:"未开始",
          visitors_num:900,
          visitors_multiple:2,
          comment_num:2000,
          telecase_time:"2021-08-10 18:00"
        }, {
          id: '3',
          name: '慢性咳嗽与呼吸道感染诊治高峰论坛',
          url:"xxx.xxx.xxx",
          user_name:"主播1",
          classification:"分类1",
          status:"已结束",
          visitors_num:900,
          visitors_multiple:2,
          comment_num:2000,
          telecase_time:"2021-08-10 18:00"
        }, {
          id: '4',
          name: '慢性咳嗽与呼吸道感染诊治高峰论坛',
          url:"xxx.xxx.xxx",
          user_name:"主播1",
          classification:"分类1",
          status:"直播中",
          visitors_num:900,
          visitors_multiple:2,
          comment_num:2000,
          telecase_time:"2021-08-10 18:00"
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
        name: [{ required: true, message: '请填写直播间名称', trigger: 'blur' }],
        user_name: [{ type: 'date', required: true, message: '请填写主播名称', trigger: 'blur' }],
        telecase_time: [{ required: true, message: '请选择直播时间', trigger: 'blur' }],
        classification: [{ required: true, message: '请选择直播间分类', trigger: 'change' }]
      },
      temp: {
        id: undefined,
        name: 1,
        user_name: '',
        classification:'',
        telecase_time: new Date(),
        status: '',
        visitors_num:'',
        visitors_multiple:'',
        visitors_setting:'',
        url:''
       
      },
      test:[1,2,3,4],
      multipleSelection:[],
      total:100,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
    }
  },
  created(){

  },
  watch:{

  },
  methods:{
    resetTemp() {
      this.temp = {
        id: undefined,
        name: 1,
        user_name: '',
        classification:'',
        telecase_time: new Date(),
        status: '',
        visitors_num:'',
        visitors_multiple:'',
        visitors_setting:''
      }
    },
    // 新建直播间
    handleCreate(){
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 编辑直播间
    handleUpdate(row){
      this.temp = Object.assign({}, row) // copy obj
      this.temp.telecase_time = new Date(this.temp.telecase_time)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 评论审核
    handleComment(row){
      this.$router.push('/comment')
    },
    // 数据分析
    handleAnalysis(row){
      this.$router.push('/analysis')
    },
    createData(){
      this.dialogFormVisible=false;
    },
    updateData(){
      this.dialogFormVisible=false;
    },
    // 表格复选
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    // 获取列表数据
    getList(){}
  }

}
</script>

<style lang="scss" scoped>
.filter-item{
  margin-right: 10px;
}
</style>