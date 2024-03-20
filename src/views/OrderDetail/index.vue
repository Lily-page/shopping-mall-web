<template>
  <div class="order-detail">
    <div class="detail-top">
      <div class="secondary-nav" style="padding-top:10px;">
        <span>
          <router-link to="/">首页</router-link>
        </span>
        <span>
          <router-link to="/personalCenter/orderList">个人中心</router-link>
        </span>
        <span>
          <router-link to="/personalCenter/orderList">全部订单</router-link>
        </span>
        <span>
          <a>订单详情</a>
        </span>
      </div>
    </div>
    <div class="detail-panel clearfix">
      <div class="fl panel-left">
        <div class="info-top">
          <h3>订单信息</h3>
        </div>
        <ul class="info-con">
          <li class="clearfix info-item">
            <div class="fl info-title">收货地址：</div>
            <div class="fl info-txt">{{shippingAddress}}</div>
          </li>
          <li class="clearfix info-item">
            <div class="info-title">订单编号：{{order.outTradeNo}}</div>
            <div class="info-txt"></div>
          </li>
        </ul>
      </div>
      <div class="fl panel-right">
        <div class="status-tit">
          <div class="fl status-icon"><i class="el-icon-circle-check status"></i></div>
          <h3 class="fl">订单状态：已评价</h3>
        </div>
        <div class="delivery-info">
          <div class="delivery-detail">
            <span v-if="order.expressType">物流：{{order.expressType}}快递</span>
            <span v-if="order.expressNo">运单号：{{order.expressNo}}</span>
          </div>
          <div class="delivery-time" v-if="order.updatedAt">
            {{order.updatedAt | formatTime}}
          </div>
        </div>
      </div>
    </div>

    <el-table :data="goods" style="width: 100%; font-size: 12px;" :header-cell-style="{
        background: '#eef1f6',
        textAlign: 'center',
        'font-size': '12px',
      }" :cell-style="{ textAlign: 'center' }">
      <el-table-column prop="outTradeNo" label="商品">
        <template slot-scope="scope">
          <div class="content-goods clearfix">
            <div class="goods-img">
              <img :src="scope.row.goodsImageBig" alt="商品图片" />
            </div>
            <div class="goods-name" :title="scope.row.goodsName">
              {{ scope.row.goodsName }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="salePrice" label="单价" width="160">
        <template slot-scope="scope">
          <span>¥</span>{{scope.row.salePrice | keepTwoNum}}
        </template>
      </el-table-column>
      <el-table-column prop="goodsNum" label="数量" width="160" />
      <el-table-column prop="orderState" label="交易状态" width="160">
        <template>
          <div>{{showOrderState[order.orderState]}}</div>
        </template>
      </el-table-column>
    </el-table>

    <div class="order-sum">
      <div class="sum-item">
        <span class="sum-tit">商品总价：</span>
        <span class="sum-price">¥{{totalAmount | keepTwoNum}}</span>
      </div>
      <div class="sum-item">
        <span class="sum-tit">运费：</span>
        <span class="sum-price">¥0.00</span>
      </div>
      <div class="sum-item">
        <span class="real_pay-tit">实付款：</span>
        <span class="real_pay-price">¥{{totalAmount | keepTwoNum}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { showOrderState } from "@/utils/common";
export default {
  props: {
    id: {},
  },
  data() {
    return {
      showOrderState: showOrderState,
      order: {},
      address: {},
      goods: [],
    };
  },
  computed: {
    shippingAddress() {
      return `${this.address.name}, ${this.address.tel}, ${this.address.region}${this.address.address}, ${this.address.zipcode}`;
    },
    totalAmount() {
      return this.goods.reduce((pre, cur) => {
        return (pre += cur.salePrice * cur.goodsNum);
      }, 0);
    },
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/order/${this.id}`);
      this.order = res.data;
      this.address = res.data?.address;
      this.goods = res.data?.goods;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style/index.scss";
</style>