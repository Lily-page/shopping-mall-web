<template>
  <div class="payment container">
    <div class="order-info clearfix">
      <div class="fl order-info-left">
        {{ orderTips }}
      </div>
      <div class="fr order-info-right">
        <strong class="pay-price">{{ total | keepTwoNum }}</strong>
        <em>元</em>
      </div>
    </div>
    <div class="pay-cashier">
      <h3 class="pay-title">支付方式</h3>
      <div class="pay-pattern">
        <img
          src="https://t.alipayobjects.com/images/rmsweb/T1.a4gXo4sXXXXXXXX.png"
        />
      </div>
    </div>
    <div class="trade-btn">
      <el-button type="primary" @click="toPay">立即支付</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderId: "",
      total: "",
      goods: [],
    };
  },
  computed: {
    orderTips() {
      return `订单提交成功，请尽快付款！ 订单号：${this.orderId}`;
    },
  },
  mounted() {
    this.orderId = this.$route.query.orderId;
    this.total = this.$route.query.total;
    this.goods = this.$route.query.goods && JSON.parse(this.$route.query.goods);
  },
  methods: {
    async toPay() {
      let data = {
        orderId: this.orderId,
        total: String(this.total)
      };
      const res = await this.$http.post("/pcAlipay", this.$qs.stringify(data), {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });
      window.location.href = res.data.result;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style/index.scss";
</style>
