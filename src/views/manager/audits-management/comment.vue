<template>
  <div class="app-container">
    <div class="filter-container">
          <el-select  placeholder="状态" clearable style="width: 150px" class="filter-item">
            <el-option  label="未审核" value="0" />
            <el-option  label="已审核" value="1" />
            <el-option  label="审核失败" value="2" />
          </el-select>
          <el-button  class="filter-item" type="primary" icon="el-icon-search">
            搜索
          </el-button>
    </div>
    <!--  -->
    <div class="operation-container filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-check" :disabled="multipleSelection.length==0"> 
            审核通过
      </el-button>
      <el-button class="filter-item" type="warning" icon="el-icon-close" :disabled="multipleSelection.length==0"> 
            审核失败
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
        prop="user_name"
        label="用户名"
        align="center"
        width="400px"
        >
        <template slot-scope="{row}">
          <span>{{ row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="comment"
        label="评论内容"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.comment }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        width="200px"
        >
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="更新时间"
        align="center"
        >
        <template slot-scope="{row}">
          <span>{{ row.update_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-tooltip content="审核通过" placement="top" effect="light">
             <el-button type="primary" icon="el-icon-check" circle >
             </el-button>
          </el-tooltip>
          <el-tooltip content="审核失败" placement="top" effect="light">
             <el-button type="warning" icon="el-icon-close" circle>
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
          user_name:"主播1",
          comment:"分类1",
          status:"未开始",
          update_time:"2021-08-10 18:00"
        },{
          id: '2',
          user_name:"主播1",
          comment:"分类1",
          status:"未开始",
          update_time:"2021-08-10 18:00"
        }, {
          id: '3',
          user_name:"主播1",
          comment:"分类1",
          status:"已结束",
          update_time:"2021-08-10 18:00"
        }, {
          id: '4',
          user_name:"主播1",
          comment:"分类1",
          status:"直播中",
          update_time:"2021-08-10 18:00"
        }],
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
        status: 'published',
        visitors_num:'',
        visitors_multiple:'',
        visitors_setting:''
      }
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