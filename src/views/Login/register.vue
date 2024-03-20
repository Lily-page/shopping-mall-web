<template>
  <div class="register">
    <div class="form_container">
      <div class="manage_tip">
        <span class="title">shopping商城</span>
        <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerUser.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        username: "",
        // email: '',
        password: "",
        password2: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 30,
            message: "长度在2到30个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在6到30之间", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在6到30之间", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post("/register", this.registerUser);
          if (res) {
            //注册成功
            this.$message({
              message: "账号注册成功！",
              type: "success",
            });
            this.$router.push("/login");
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.register {
  /* position: relative; */
  width: 100%;
  height: 100vh;
  background: url(../../assets/img/bg.png) no-repeat center center;
  background-size: 100% 100%;
}

.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -180px;
  margin-left: -185px;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}

.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}

.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>