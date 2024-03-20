<template>
  <div class="order-address">
    <div class="header-warpper">
      <h3 class="fl header-title">选择收货地址</h3>
      <div class="fr extra">
        <a class="extra-btn" @click="addAddress">新增收货地址</a>
      </div>
    </div>
    <div
      class="address-list list-off"
      :style="{ height: showHeight ? listHeight : '42px' }"
    >
      <ul>
        <li
          class="addr-item-wrapper clearfix"
          @mouseenter="enterBlock($event)"
          @mouseleave="leaveBlock($event)"
          v-for="(item, index) in showList"
          :key="index"
        >
          <div
            class="fl addr-item"
            :class="{ 'item-selected': selectedAddr == index }"
            @click="selecteItem(index)"
          >
            <span :title="item.name">{{ item.name }}</span>
            <b class="iconfont icon-jiaobiaoxuanzhong"></b>
          </div>
          <div class="fl addr-detail">
            <span class="addr-name" :title="item.name">{{ item.name }}</span>
            <span
              class="addr-info"
              :title="`${item.region + ' ' + item.address}`"
              >{{ item.region + " " + item.address }}</span
            >
            <span class="addr-tel">{{ item.tel | hideTel }}</span>
          </div>
          <div class="fr op-btns">
            <a class="extra-btn" @click.stop="editAddress(item)">编辑</a>
            <a class="extra-btn" @click.stop="delAddrress(item)">删除</a>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="addressList && addressList.length > 1" class="addr-switch" @click="showMore($event)">
      <span>更多地址</span>
      <b class="iconfont icon-shousuoxiajiantou"></b>
    </div>
    <div v-if="addressList && addressList.length > 1" class="addr-switch hide" @click="closeMore($event)">
      <span>收起地址</span>
      <b class="iconfont icon-shousuoshangjiantou"></b>
    </div>
    <address-form
      :dialogForm="dialogFormVisible"
      :formData="formData"
      @formSave="dialogFormVisible = false"
      @formClose="dialogFormVisible = false"
    />
  </div>
</template>
<script>
import AddressForm from "../PersonalCenter/Address/address-form.vue";
export default {
  components: {
    AddressForm,
  },
  inject: ["reload"],
  data() {
    return {
      addressList: [],
      showList: [],
      showHeight: false,
      selectedAddr: 0,
      dialogFormVisible: false,
      formData: {},
    };
  },
  computed: {
    listHeight() {
      return `${this.showList.length * 42}px`;
    },
  },
  created() {
    this.getAddressList();
  },
  methods: {
    selecteItem(index) {
      this.selectedAddr = index;
      this.$bus.$emit("selectedAddress", this.showList[index]);
    },
    showMore(event) {
      event.currentTarget.className = "addr-switch hide";
      event.currentTarget.nextElementSibling.className = "addr-switch";
      this.showHeight = !this.showHeight;
      this.showList = this.addressList;
    },
    closeMore(event) {
      event.currentTarget.className = "addr-switch hide";
      event.currentTarget.previousElementSibling.className = "addr-switch";
      this.showHeight = !this.showHeight;
      this.showList = this.addressList.slice(0, 1);
    },
    enterBlock(event) {
      event.currentTarget.className = "addr-item-wrapper clearfix li-hover";
    },
    leaveBlock(event) {
      event.currentTarget.className = "addr-item-wrapper clearfix";
    },
    addAddress() {
      this.dialogFormVisible = true;
      this.formData = {};
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
    async getAddressList() {
      const res = await this.$http.get(`/addresses`);
      this.addressList = res?.data || [];
      this.showList = this.addressList.slice(0, 1);
      this.$bus.$emit("selectedAddress", this.showList[this.selectedAddr]);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style/index.scss";
</style>
