<template>
  <el-row style="padding-right:15px">
    <el-col :span="9">
              <div>
                  <div class="title" style="background:#dfe6ec;padding-left:10px">已选</div>
                  <div class="content"  style="border:1px solid #dfe6ec;width:100%;height:250px">
                      <div class="nodata" v-if="multipleSelection.length==0">
                        暂无数据
                      </div>
                      <div class="selected" v-if="multipleSelection.length!=0">
                          <div class="selected-item" v-for="(item,index) in multipleSelection" :key="index">
                              <div class="selected-name">{{item.name}}</div>
                              <div class="selected-operation" @click="deleteSelected(item,index)"><i class="el-icon-error" /></div>
                          </div>
                      </div>
                  </div>
              </div>
          </el-col>
          <el-col :span="15">
             <div>
                  <div class="title" style="background:#dfe6ec;padding-left:10px;margin-left:15px;">请选择</div>
                  <div class="content" >
                      <el-table
                      :data="robotData"
                      border
                      @selection-change="handleSelectionChange"
                      ref="multipleTable"
                      height="250px"
                      style="width: 100%;margin-left:15px;">
                      <el-table-column
                      type="selection"
                      align="center">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="点赞机器人">
                      </el-table-column>
                      <el-table-column
                        prop="description"
                        label="描述">
                      </el-table-column>
                    </el-table>
                  </div>
              </div>
              
          </el-col>
  </el-row>
</template>

<script>
export default {
  name:'',
  data(){
    return{
      robotData:[],
      multipleSelection:[],
    }
  },
   created(){
     this.robotData=[];
     this.multipleSelection=[];
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
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    deleteSelected(row,index){
      this.$refs.multipleTable.toggleRowSelection(row,false);	
      this.multipleSelection.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .nodata{
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  .selected{
    padding: 0 6px;
    height: 100%;
    overflow-y: scroll;
    .selected-item{
      padding: 6px 10px;
      display: flex;
      border-bottom: 1px solid #f1f1f1;
      justify-content: space-between;
      .selected-operation{
        cursor: pointer;
        color: #ff4949;
      }
    }
  }
</style>