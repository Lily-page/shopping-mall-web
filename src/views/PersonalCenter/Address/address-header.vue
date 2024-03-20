<template>
  <section class="address-header">
    <el-button
      type="primary"
      @click="addAddress"
      size="small"
      plain
      icon="el-icon-plus"
      >新增收货地址</el-button
    >
    <span class="address-tip">
      您已经保存了
      <span class="address-number">{{addressLength}}</span>
      个收货地址，还能保存
      <span class="address-number">{{restLength}}</span>
      个
    </span>
    <address-form
      :dialogForm="dialogFormVisible"
      :formData="formData"
      @formSave="dialogFormVisible = false"
      @formClose="dialogFormVisible = false"
    />
  </section>
</template>
<script>
import AddressForm from "./address-form";
export default {
  components: {
    AddressForm,
  },
  data() {
    return {
      dialogFormVisible: false,
      addressLength: 0,
      formData: {}
    };
  },
  computed: {
    restLength() {
      return 20 - this.addressLength
    }
  },
  mounted() {
    this.$bus.$on("sendLength", (data) => {
      this.addressLength = data;
    });
  },
  methods: {
     addAddress() {
      this.dialogFormVisible = true;
      this.formData = {};
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../style/address.scss";

.el-button--primary.is-plain {
  color: #009fe8;
  background: #ecf5ff;
  border-color: #9cf;
}

.el-button--primary.is-plain:focus,
.el-button--primary.is-plain:hover {
  background: #009fe8;
  border-color: #009fe8;
  color: #fff;
}
</style>
