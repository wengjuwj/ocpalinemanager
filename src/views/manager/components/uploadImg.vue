<template>
<div class="avatar-uploader">
  <el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :on-change="uploadChange"
  :on-error="handleUploadError"
  :on-remove="handleUploadRemove"
  >
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</div>
  
</template>

<script>
// import { getToken } from 'api/qiniu'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      // dialogVisible: false,
      listObj: {},
      fileList: [],
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isPic = false;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if(file.type === 'image/jpeg'||file.type === 'image/png'){
        isPic=trus;
      }
      if (!isPic) {
        this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isPic && isLt2M;
    },
    // 上传失败
    handleUploadError(err,file,fileList){
      this.$message.error('上传失败！');
    },
    // 文件列表移除
    handleUploadRemove(file,fileList){
      console.log(file, 'file')
    },
    // 上传状态改变
    uploadChange(file,fileList){
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    

  }
}
</script>

<style lang="scss" scoped>
 .avatar-uploader {
   ::v-deep .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409EFF;
      }
   }
   
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
