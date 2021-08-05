<template>
  <div class="app-container">

        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="直播名称" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="专家名称" prop="professors">
                <el-button  icon="el-icon-plus" size="mini" type="primary" @click="dialogProfessorsVisible=true">
                    选择
                </el-button>
                <div>
                  <div class="content" >
                      <el-table
                      :data="form.professors"
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
               <el-form-item label="直播分类" prop="classification">
                  <el-select v-model="form.classification" placeholder="请选择分类" style="width:100%">
                    <el-option label="分类一" value="分类一" />
                    <el-option label="分类二" value="分类一" />
                  </el-select>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
               <el-form-item label="直播封面" prop="bg_image">
                  <uploadImg></uploadImg>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
               <el-form-item label="详情介绍" prop="content">
                  <tinymce v-model="form.content"></tinymce>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
               <el-form-item label="相关视频" prop="relation_videoes">
                  <el-button  icon="el-icon-plus" size="mini" type="primary" @click="dialogFormVisible=true">
                    选择
                  </el-button>
                <div>
                  <div class="content" >
                      <el-table
                      :data="form.relation_videoes"
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
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
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
import dialogSelect from '../components/dialogSelect'
import tinymce from '../../../components/Tinymce'
export default {
  data() {
    return {
      form: {
        name: '',
        professors:'',
        telecase_time:'',
        classification:'',
        bg_image:'',
        content:'',
        relation_videoes:''
      },
      rules:{
        name:[{ required: true, message: '直播名称不能为空', trigger: 'change' }],
        professors:[{ required: true, message: '专家名称不能为空', trigger: 'change' }],
        telecase_time:[{ required: true, message: '请选择直播时间', trigger: 'change' }],
        bg_image:[{ required: true, message: '请上传直播封面', trigger: 'change' }],
        classification:[{ required: true, message: '请选择直播分类', trigger: 'change' }],
      },
      // 选择视频弹框
      relationData:[],
      dialogFormVisible:false,
      multipleSelection:[],
      // 选择专家弹框
      professorsData:[],
      dialogProfessorsVisible:false,
      multipleProfessors:[],
    }
  },
  components:{
    uploadImg,
    tinymce,
    dialogSelect
  },
  created(){
    let id=this.$route.params && this.$route.params.id
    if(id){
      document.title="编辑直播间"
    }
    this.getRelationData();
  },
  methods: {
    onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    //  选择视频
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    // 选择专家
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
        this.form.relation_videoes=this.multipleSelection;
        this.dialogFormVisible = false
      }
      if(type==2){
        this.form.professors=this.multipleProfessors;
        this.dialogProfessorsVisible = false
      }
    },
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
