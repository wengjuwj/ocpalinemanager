<template>
  <div class="app-container">

        <el-form ref="form" :model="form" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="直播名称">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="主播名称" prop="user_name">
                <el-input v-model="form.user_name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="直播时间" prop="telecase_time">
                <el-date-picker v-model="form.telecase_time" type="datetime" placeholder="请选择直播时间" style="width:100%"/>
              </el-form-item>
            </el-col>
          </el-row>
           <el-row>
            <el-col :span="24">
               <el-form-item label="直播分类">
                  <el-select v-model="form.classification" placeholder="请选择分类" style="width:100%">
                    <el-option label="分类一" value="分类一" />
                    <el-option label="分类二" value="分类一" />
                  </el-select>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
               <el-form-item label="直播封面">
                  <uploadImg></uploadImg>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
               <el-form-item label="详细介绍图">
                  <uploadImg></uploadImg>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item label="互动配置">
                <el-select v-model="form.visitors_setting" class="filter-item" placeholder="Please select" style="width:100%">
                  <el-option v-for="item in test" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="24">
              <el-form-item label="推流/拉流地址">
                <el-input v-model="form.url" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
          
        
          <!-- <el-form-item label="即时配送">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item> -->
          <!-- <el-form-item label="活动性质">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
              <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
        </el-form>
    
  </div>
</template>

<script>
import uploadImg from '../components/uploadImg'
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      
    }
  },
  components:{
    uploadImg
  },
  created(){
    let id=this.$route.params && this.$route.params.id
    if(id){
      document.title="编辑直播间"
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },

  }
}
</script>
<style lang="scss" scoped>
.el-form{
  .el-row{
    width: 600px;
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
