<template>
  <section class="page-footer clearfix">
    <div class="trade-footer">
      <div class="price-info">
        <span class="price-tit">应付总额：</span>
        <span class="price-num">¥{{ sum | keepTwoNum }}</span>
      </div>
      <div class="address-info">
        <span class="sendAddr">{{ receiveAddress }}</span>
        <span class="sendMobile">{{ receivePerson | hideTel }}</span>
      </div>
    </div>
    <div class="trade-btn">
      <el-button type="primary" @click="toPayment">提交订单</el-button>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      addressItem: {},
      sum: "",
      goods: [],
    };
  },
  computed: {
    ...mapState(["login"]),
    receiveAddress() {
      return `寄送至：${
        this.addressItem.region + " " + this.addressItem.address
      }`;
    },
    receivePerson() {
      return `收货人：${this.addressItem.name + " " + this.addressItem.tel}`;
    },
  },
  mounted() {
    this.$bus.$on("selectedAddress", (data) => {
      this.addressItem = data;
    });
    this.$bus.$on("sum", (data) => {
      this.sum = data.amount;
      this.goods = data.goodsList;
    });
  },
  methods: {
    async toPayment() {
      if (this.login) {
        let data = {
          goods: this.goods,
          address: this.addressItem._id,
        };
        const res = await this.$http.post("/order", data);
        let outTradeNo = res.data.outTradeNo;
        this.$router.push({
          path: "/payment",
          query: {
            orderId: outTradeNo,
            total: this.sum,
            goods: JSON.stringify(this.goods),
          },
        });
      } else {
        this.$dialog
          .confirm({
            title: "温馨提示",
            message: "您还未登录或者登录状态失效，请登录后再来操作",
          })
          .then(() => {
            this.$router.push("login");
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style/index.scss";
</style>
