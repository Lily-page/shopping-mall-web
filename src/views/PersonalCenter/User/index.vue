<template>
  <div class="user">
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="头像" style="margin-top: 0.5rem;">
        <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false" :on-success="res => $set(model, 'avatar', res.url)">
          <img v-if="model.avatar" :src="model.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名">
        <el-col :span="8">
          <el-input v-model="model.username"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      model: {
        username: "",
        avatar: "",
      },
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  mounted() {
    this.model.username = this.userInfo.username;
    this.model.avatar = this.userInfo.avatar;
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.model.avatar = URL.createObjectURL(file.row);
    },
    async save() {
      const res = await this.$http.post("/user", this.model);
      if(res) {
        this.$message({
          type:'success',
          message:'修改成功'
        })
      }
    },
  },
};
</script>
<style lang="scss" >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  min-width: 5rem;
  height: 5rem;
  display: block;
}
</style>