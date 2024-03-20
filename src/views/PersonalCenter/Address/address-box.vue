<template>
  <section>
    <el-row type="flex" style="flex-wrap: wrap">
      <el-col
        :md="24"
        class="address-col"
        v-for="(item, index) in addressList"
        :key="index"
      >
        <div class="ads-title clearfix">
          <h1 class="fl ads-name">{{ item.name }}</h1>
          <div class="fr ads-del">
            <a class="el-icon-close" @click="delAddrress(item)"></a>
          </div>
        </div>
        <div class="address-container clearfix">
          <div class="address-item clearfix">
            <span class="fl address-label">收货人：</span>
            <div class="fl">{{ item.name }}</div>
          </div>
          <div class="address-item clearfix">
            <span class="fl address-label">手机：</span>
            <div class="fl">{{ item.tel | hideTel }}</div>
          </div>
          <div class="address-item clearfix">
            <span class="fl address-label">所在地区：</span>
            <div class="fl">{{ item.region }}</div>
          </div>
          <div class="address-item clearfix">
            <span class="fl address-label">详细地址：</span>
            <div class="fl">{{ item.address }}</div>
          </div>
          <div class="address-item clearfix">
            <span class="fl address-label">邮编：</span>
            <div class="fl">{{ item.zipcode }}</div>
          </div>
          <div class="fr address-operate">
            <a
              class="operate-btn"
              href="#"
              v-if="!item.defaultAddress"
              @click="handleDefault(item)"
              >设为默认</a
            >
            <a class="operate-btn" @click="editAddress(item)">编辑</a>
          </div>
        </div>
      </el-col>
    </el-row>
    <address-form
      :dialogForm="dialogFormVisible"
      :formData="formData"
      @formSave="save"
      @formClose="close"
    />
  </section>
</template>
<script>
import AddressForm from "./address-form";
export default {
  components: {
    AddressForm,
  },
  inject: ["reload"],
  data() {
    return {
      addressList: [],
      dialogFormVisible: false,
      formData: {},
    };
  },
  created() {
    this.getAddressList();
  },
  methods: {
    save() {
      this.dialogFormVisible = false;
    },
    close() {
      this.dialogFormVisible = false;
    },
    editAddress(item) {
      this.dialogFormVisible = true;
      this.formData = item;
    },
    delAddrress(item) {
      this.$confirm("确定要删除该收货地址吗?", "删除", {
        confirmButtonText: "确定",
        cancelButtonClass: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`addresses/${item._id}`);
        this.$message({
          type: "success",
          message: "删除成功！",
        });
        this.reload();
      });
    },
    async handleDefault(item) {
      item.defaultAddress = !item.defaultAddress;
      await this.$http.put(`/addresses/${item._id}`, item);
      this.reload();
    },
    async getAddressList() {
      const res = await this.$http.get(`/addresses`);
      this.addressList = res?.data || [];
      this.$bus.$emit("sendLength", this.addressList.length);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../style/address.scss";
</style>
