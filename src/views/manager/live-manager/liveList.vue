<template>
  <div class="app-container">
    <div class="filter-container">
          <el-input placeholder="请输入直播间名称" style="width:200px" class="filter-item"/>
          <el-input placeholder="请输入主播名称" style="width:200px" class="filter-item"/>
          <el-select  placeholder="类别" clearable style="width: 150px" class="filter-item">
            <el-option  label="item" value="item" />
          </el-select>
          <el-select  placeholder="状态" clearable style="width: 150px" class="filter-item">
            <el-option  label="item" value="item" />
          </el-select>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">
            搜索
          </el-button>
    </div>
    <!--  -->
    <div class="operation-container filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus">
            新建直播间
      </el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
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
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="主播名称"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="classification"
        label="分类"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="visitors_num"
        label="访问量"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="visitors_multiple"
        label="访问倍数"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="comment_num"
        label="评论数"
        align="center"
        >
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            Publish
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name:'liveList',
  components:{},
  data(){
    return{
       tableData: [
        {
          id: '1',
          name: '慢性咳嗽与呼吸道感染诊治高峰论坛',
          url:"xxx.xxx.xxx",
          user_name:"主播1",
          classification:"分类1",
          visitors_num:900,
          visitors_multiple:2,
          comment_num:2000
        },{
          id: '2',
          name: '慢性咳嗽与呼吸道感染诊治高峰论坛',
          url:"xxx.xxx.xxx",
          user_name:"主播1",
          classification:"分类1",
          visitors_num:900,
          visitors_multiple:2,
          comment_num:2000
        }, {
          id: '3',
          name: '慢性咳嗽与呼吸道感染诊治高峰论坛',
          url:"xxx.xxx.xxx",
          user_name:"主播1",
          classification:"分类1",
          visitors_num:900,
          visitors_multiple:2,
          comment_num:2000
        }, {
          id: '4',
          name: '慢性咳嗽与呼吸道感染诊治高峰论坛',
          url:"xxx.xxx.xxx",
          user_name:"主播1",
          classification:"分类1",
          visitors_num:900,
          visitors_multiple:2,
          comment_num:2000
        }]
    }
  },
  created(){

  },
  watch:{

  },
  methods:{

  }

}
</script>

<style lang="scss" scoped>
.filter-item{
  margin-right: 10px;
}
</style>