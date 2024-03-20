<template>
  <el-dialog :title="title" :visible.sync="addressForm" @close="cancel">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-col :span="12">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-col :span="12">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="所在地区" required>
        <el-col :span="23">
          <el-cascader
            size="large"
            :options="options"
            v-model="form.selectedOptions"
            :show-all-levels="true"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-col :span="23">
          <el-input type="textarea" v-model="form.address"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="邮政编号">
        <el-col :span="8">
          <el-input v-model="form.zipcode" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="设为默认" prop="defaultAddress">
        <el-switch v-model="form.defaultAddress"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="save">{{ changeBtn }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { regionData, CodeToText } from "element-china-area-data";

export default {
  props: {
    dialogForm: {
      type: Boolean,
      required: true,
      default: false,
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  inject: ["reload"],
  watch: {
    dialogForm: {
      handler(val) {
        this.addressForm = val;
      },
      immediate: true,
    },
    formData: {
      handler(val) {
        if (val) {
          this.form = val;
        }
      },
      deep: true,
    },
  },
  computed: {
    title() {
      return (
        (JSON.stringify(this.formData) == "{}" ? "添加" : "编辑") + "收货地址"
      );
    },
    changeBtn() {
      return JSON.stringify(this.formData) == "{}" ? "确 定" : "更 改";
    },
  },
  data() {
    let telReg = /^1[345789]\d{9}$/;
    let validateTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号码"));
      }
      setTimeout(() => {
        if (!telReg.test(value)) {
          callback(new Error("手机格式有误"));
        } else {
          callback();
        }
      }, 100);
    };
    return {
      addressForm: false,
      options: regionData,
      form: {
        name: "",
        tel: "",
        selectedOptions: [],
        region: "",
        address: "",
        zipcode: "",
        defaultAddress: false,
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, message: "收货人姓名不能小于2个字符", trigger: "blur" },
        ],
        tel: [
          {
            required: true,
            validator: validateTel,
            trigger: "blur",
          },
        ],
        address: [
          { required: true, message: "街道地址不能为空", trigger: "blur" },
          { min: 5, message: "街道地址不能小于5个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async save() {
      this.form.zipcode = this.form.zipcode ? this.form.zipcode : "000000";
      JSON.stringify(this.formData) == "{}"
        ? await this.$http.put(`/addresses/${this.form._id}`, this.form)
        : await this.$http.post("/addresses", this.form);
      this.$emit("formSave", false);
      this.reload();
    },
    cancel() {
      this.formData = {};
      this.$emit("formClose", false);
    },
    handleChange(value) {
      let name = "";
      (value || []).map((item) => (name += CodeToText[item]));
      this.form.region = name;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-cascader {
  display: inline-block;
  position: relative;
  font-size: 14px;
  width: 100%;
  line-height: 40px;
}
</style>
