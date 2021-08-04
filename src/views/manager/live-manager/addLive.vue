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
              <el-form-item label="专家名称" prop="user_name">
                <el-button  icon="el-icon-plus" size="mini" type="primary" @click="dialogProfessorsVisible=true">
                    选择
                </el-button>
                <div>
                  <div class="content" >
                      <el-table
                      :data="confimProfessorsData"
                      border
                      ref="multipleTable"
                      max-height="250px"
                      style="width: 100%;">
                      <el-table-column
                        prop="professor_name"
                        label="专家名称">
                      </el-table-column>
                      <el-table-column
                        prop="professor_title"
                        label="职称">
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
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
               <el-form-item label="详情介绍">
                  <tinymce v-model="form.content"></tinymce>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
               <el-form-item label="相关视频">
                  <el-button  icon="el-icon-plus" size="mini" type="primary" @click="dialogFormVisible=true">
                    选择
                  </el-button>
                <div>
                  <div class="content" >
                      <el-table
                      :data="confimRelationData"
                      border
                      ref="multipleTable"
                      max-height="250px"
                      style="width: 100%;">
                      <el-table-column
                        prop="name"
                        label="直播名称">
                      </el-table-column>
                      <el-table-column
                        prop="user_name"
                        label="专家">
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="推流/拉流地址">
                <el-input v-model="form.url" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
        </el-form>
        <!-- 选择视频 -->
        <el-dialog title="选择视频" :visible.sync="dialogFormVisible">
          <div class="relation_class">
            <el-row>
              <el-select v-model="form.classification" placeholder="请选择分类">
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
            <el-button @click="dialogFormVisible = false">
              取消
            </el-button>
            <el-button type="primary" @click="confirmSelect(1)">
              确定
            </el-button>
          </div>
        </el-dialog>
        <!-- 选择专家 -->
        <el-dialog title="选择专家" :visible.sync="dialogProfessorsVisible">
          <div class="relation_class">
            <el-row>
              <el-select v-model="form.classification" placeholder="请选择分类">
                <el-option label="分类一" value="分类一" />
                <el-option label="分类二" value="分类一" />
              </el-select>
            </el-row>
          </div>
          <el-table
            :data="professorsData"
            border
            @selection-change="handleProfessorsChange"
            ref="multipleTable"
            max-height="250px"
            style="width: 100%;">
            <el-table-column
            type="selection"
            align="center">
            </el-table-column>
            <el-table-column
              prop="professor_name"
              label="专家名称">
            </el-table-column>
            <el-table-column
              prop="professor_title"
              label="职称">
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogProfessorsVisible = false">
              取消
            </el-button>
            <el-button type="primary" @click="confirmSelect(2)">
              确定
            </el-button>
          </div>
        </el-dialog>
    
  </div>
</template>

<script>
import { getLiveList,getProfessorsList } from '@/api/manager'
import uploadImg from '../components/uploadImg'
import tinymce from '../../../components/Tinymce'
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
        desc: '',
        content:'',
        relation_video:''
      },
      // 选择视频弹框
      relationData:[],
      confimRelationData:[],
      dialogFormVisible:false,
      multipleSelection:[],
      // 选择专家弹框
      professorsData:[],
      confimProfessorsData:[],
      dialogProfessorsVisible:false,
      multipleProfessors:[],
    }
  },
  components:{
    uploadImg,
    tinymce
  },
  created(){
    let id=this.$route.params && this.$route.params.id
    if(id){
      document.title="编辑直播间"
    }
    this.getRelationData();
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      console.log('富文本编辑器', this.content)
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    handleProfessorsChange(val){
      this.multipleProfessors = val;
    },
    getRelationData(){
      getLiveList().then(response => {
        this.relationData = response.data.data
      });
      getProfessorsList().then(response => {
        this.professorsData = response.data.data
      });
    },
    confirmSelect(type){
      if(type==1){
        this.confimRelationData=this.multipleSelection;
        this.dialogFormVisible = false
      }
      if(type==2){
        this.confimProfessorsData=this.multipleProfessors;
        this.dialogProfessorsVisible = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form{
  .el-row{
    width: 700px;
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
.relation_class{
  margin-bottom: 15px;
}
</style>
