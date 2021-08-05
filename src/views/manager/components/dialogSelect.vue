<template>
  <el-dialog title="选择视频" :visible.sync="dialogVisible" @close="callback">
    <div class="relation_class">
      <el-row>
        <el-select placeholder="请选择分类">
          <el-option label="分类一" value="分类一" />
          <el-option label="分类二" value="分类一" />
        </el-select>
      </el-row>
    </div>
    <el-table
      :data="relationData"
      border
      @selection-change="handleSelectionChange"
      ref="multipleTable"
      max-height="250px"
      style="width: 100%;">
      <el-table-column
      type="selection"
      align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="直播名称">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="专家">
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="eventEmit">
        取消
      </el-button>
      <el-button type="primary" @click="eventEmit">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name:'',
  props:{
    dialogVisible:{
      type:Boolean,
      default:false
    },
    relationData:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  watch:{
    dialogVisible:function(){
      console.log('dialogVisible', this.dialogVisible)
    }
  },
  data() {
    return {
      multipleSelection:[]
    }
  },
  methods:{
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    eventEmit(){
      this.$emit('eventEmit');
    },
    callback(action){
      this.eventEmit();
    }
  }
}
</script>

<style>

</style>