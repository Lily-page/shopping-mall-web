<template>
  <div class="login">
    <div class="box">
      <span class="title">使用账号 登录shopping商城</span>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <div class="geetest"></div>
        <el-form-item>
          <span class="tip">
            还没有账号？赶紧去
            <router-link to="/register">注册</router-link>
            吧!
          </span>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { setStore } from "@/utils/storage";
export default {
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await this.$http.post("/login", this.ruleForm);
          let { token, id } = res.data;
          //持久化存储
          setStore("token", token);
          setStore("id", id);
          this.$router.push({
            name: "home",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  position: relative;
  overflow: visible;
  background: #ededed;

  .box {
    width: 450px;
    border: 1px solid #dadada;
    border-radius: 10px;
    position: absolute;
    top: 160px;
    left: 50%;
    padding: 50px 50px 50px 10px;
    margin-left: -225px;
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 10px 20px -10px rgba(0, 0, 0, 0.04);
    text-align: center;

    form {
      margin-top: 30px;
    }

    span {
      color: #333;
      font-weight: 400;
    }
  }
}

.tip {
  float: left;
  a {
    color: rgb(0, 159, 232);
  }
}

.title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 20px;
}
</style>
