<template>
  <el-row style="padding-right:15px">
    <el-col :span="4">
      <el-select placeholder="请选择分类" style="margin-right:10px">
          <el-option v-for="(item,index) in typeArr" :key="index" :label="item.label" :value="item.value" />
      </el-select>
    </el-col>
    <el-col :span="6">
              <div>
                  <div class="title" style="background:#dfe6ec;padding-left:10px">已选</div>
                  <div class="content"  style="border:1px solid #dfe6ec;width:100%;">
                      <div v-if="multipleSelection.length==0" class="nodata">
                        暂无数据
                      </div>
                      <div v-if="multipleSelection.length!=0" class="selected">
                          <div class="selected-item" v-for="(item,index) in multipleSelection" :key="index">
                              <div class="selected-name">{{item.name}}</div>
                              <div class="selected-operation" @click="deleteSelected(item,index)"><i class="el-icon-error" /></div>
                          </div>
                      </div>
                  </div>
              </div>
          </el-col>
          <el-col :span="14">
             <div>
                  <div class="title" style="background:#dfe6ec;padding-left:10px;margin-left:15px;">请选择</div>
                  <div class="content" >
                      <el-table
                      :data="robotData"
                      border
                      @selection-change="handleSelectionChange"
                      ref="multipleTable"
                      max-height="250px"
                      style="width: 100%;margin-left:15px;">
                      <el-table-column
                      type="selection"
                      align="center">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        :label="typeText">
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
  props:{
    typeArr:{
      type:Array,
      default:()=>{
        return []
      }
    },
    renderType:{
      type:String,
      default:"1"
    },
    typeText:{
      type:String,
      default:"机器人"
    }
  },
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
    max-height:250px;
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