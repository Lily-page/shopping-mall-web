<template>
  <div class="order-list">
    <el-table v-if="orderList && orderList.length" :data="orderList" style="width: 100%; font-size: 12px;" :header-cell-style="{
        background: '#eef1f6',
        textAlign: 'center',
        'font-size': '12px',
      }" :cell-style="{ textAlign: 'center' }">
      <el-table-column prop="outTradeNo" label="商品">
        <template slot-scope="scope">
          <div class="row-header clearfix item">
            <span class="row-header-date" :title="scope.row.date | formatDate">{{scope.row.date | formatDate}}</span>
            <span class="row-header-number">
              订单号：<a class="cell-oprate" href="#">{{scope.row.outTradeNo}}</a>
            </span>
            <!-- <span class="row-header-shop" :title="scope.row.shop">{{scope.row.shop}}</span> -->
            <a class="iconfont icon-lianximaijia" href="#" title="联系客服"></a>
            <a class="row-header-del m-icons m-icons-trash-hover" title="删除订单" @click="delOrder(scope.row._id)"></a>
          </div>
          <div class="content-goods clearfix" v-for="(item,index) in scope.row.goods" :key="index">
            <div class="goods-img">
              <img :src="item.goodsImageBig" alt="商品图片" />
            </div>
            <div class="goods-name" :title="item.goodsName">
              {{ item.goodsName }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="goods.salePrice" label="单价" width="80">
        <template slot-scope="scope">
          <div class="content-item" v-for="(item,index) in scope.row.goods" :key="index">{{item.salePrice}}</div>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="80">
        <template slot-scope="scope">
          <div class="content-item" v-for="(item,index) in scope.row.goods" :key="index">{{item.goodsNum}}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="商品操作" width="100">
        <template slot-scope="scope">
          <a class="cell-oprate" href="#">申请售后</a>
        </template>
      </el-table-column> -->
      <el-table-column prop="salePrice" label="实付款" width="80">
        <template slot-scope="scope">
          <span>¥</span>{{total(scope.row.goods) | keepTwoNum}}
        </template>
      </el-table-column>
      <el-table-column prop="orderState" label="交易状态" width="100" align="bottom">
        <template slot-scope="scope">
          <div v-if="scope.row.orderState >= 3">交易成功</div>
          <div>{{showOrderState[scope.row.orderState]}}</div>
          <a class="cell-oprate" @click="$router.push(`/orderDetail/${scope.row._id}`)">订单详情</a>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="100">
        <template slot-scope="scope">
          <a v-if="scope.row.orderState == 4 && navTitleNum != 5" class="cell-oprate">追加评论</a>
          <a v-if="scope.row.orderState == 1 && navTitleNum != 5" class="cell-oprate" @click="toPay(scope.row)">去支付</a>
          <a v-if="scope.row.orderState == 2 && navTitleNum != 5" class="cell-oprate" @click="confirmOrder(scope.row._id)">确认收货</a>
          <a v-if="scope.row.orderState == 3 && navTitleNum != 5" class="cell-oprate" @click="$router.push(`/evaluation/${scope.row._id}`)">去评价</a>
          <a v-if="navTitleNum == 5" class="cell-oprate" @click="recoverOrder(scope.row._id)">恢复订单</a>
          <!-- <a class="cell-oprate" href="#">申请开票</a> -->
        </template>
      </el-table-column>
    </el-table>
    <order-empty v-else></order-empty>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { showOrderState } from "@/utils/common";
import OrderEmpty from "./order-empty.vue";
export default {
  components: {
    OrderEmpty,
  },
  filters: {
    keepTwoNum(value) {
      value = Number(value);
      return value.toFixed(2);
    },
  },
  data() {
    return {
      showOrderState: showOrderState,
      orderList: [],
      multipleSelection: [],
      checked: false,
      search: "",
      navTitleNum: 0,
    };
  },
  computed: {
    ...mapState(["login"]),
  },
  watch: {
    navTitleNum: {
      handler(val) {
        this.getOrderList();
      },
    },
  },
  mounted() {
    this.login ? this.getOrderList() : this.$router.push({ path: "/login" });
    this.$bus.$on("changeTable", (data) => {
      this.navTitleNum = data;
    });
  },
  methods: {
    async recoverOrder(id) {
      await this.$http.post(`/order/${id}`);
      this.getOrderList();
    },
    total(goods) {
      let sum = 0;
      goods.forEach((item) => {
        sum += item.salePrice * item.goodsNum;
      });
      return sum;
    },
    async toPay(item) {
      let data = {
        orderId: item.outTradeNo,
        total: String(this.total(item.goods)),
      };
      const res = await this.$http.post("/pcAlipay", this.$qs.stringify(data), {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });
      window.location.href = res.data.result;
    },
    confirmOrder(id) {
      this.$confirm("确认收到货了吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.$http.delete(`/confirmOrder/${id}`);
        this.$message({
          type: "success",
          message: "收货成功，赶紧去评价吧!",
        });
        this.getOrderList();
      });
    },
    delOrder(id) {
      this.$confirm("确定要删除吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        if (this.navTitleNum == 5) {
          await this.$http.delete(`/eliminateOrder/${id}`);
        } else {
          await this.$http.delete(`/order/${id}`);
        }
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.getOrderList();
      });
    },
    async getOrderList() {
      const res = await this.$http.get(`/orderList/${this.navTitleNum}`);
      this.orderList = res.data?.orderList;
    },
  },
};
</script>
<style scoped>
.el-table--enable-row-transition >>> .el-table__body td {
  padding-top: 10px;
}
/deep/ .el-table tr {
  position: relative;
  width: 100%;
}

.item {
  width: 870px;
  background: #eeeeee;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  margin-top: 10px;
}
</style>
<style lang="scss" scoped>
@import "../style/order-list.scss";

.content-footer {
  .footer-num {
    float: right;
    margin-right: 50px;

    span {
      font-size: 16px;
      color: #e1251b;
    }
  }

  .footer-total {
    float: right;
    margin-right: 50px;

    span {
      color: #e1251b;
      font-size: 18px;
    }
  }

  .footer-pay {
    float: right;
  }
}
</style>
