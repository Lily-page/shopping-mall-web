<template>
  <div class="order-info">
    <div class="header-warpper">
      <h3 class="header-title">确认订单信息</h3>
    </div>
    <el-table
      :data="goodsList"
      tooltip-effect="dark"
      style="width: 100%; font-size: 12px"
    >
      <el-table-column label="商品">
        <template slot-scope="scope">
          <div class="content-goods">
            <div class="goods-img">
              <img :src="scope.row.goodsImageBig" alt="商品图片" />
            </div>
            <div class="goods-name">{{ scope.row.goodsName }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="商品属性" width="220">
      </el-table-column>
      <el-table-column prop="salePrice" label="单价" width="120">
      </el-table-column>
      <el-table-column prop="goodsNum" label="数量" width="120">
      </el-table-column>
      <el-table-column label="小计" width="180">
        <template slot-scope="scope">
          <span>¥</span>
          <span class="Subtotal">
            {{
              (scope.row.salePrice * scope.row.goodsNum)
                | keepTwoNum
            }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="settlement">
      <div class="account">
        <span>总商品金额：</span>
        <span class="account-content">{{ `¥ ${sum}` }}</span>
      </div>
      <div class="account">
        <span>运费：</span>
        <span class="account-content">{{ `¥ 0.00` }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    sum() {
      let amount = this.goodsList?.reduce((pre, cur) => {
        return (pre += cur.goodsNum * parseFloat(cur.salePrice));
      }, 0);
      amount = String(amount.toFixed(2));
      let data = {
        amount,
        goodsList: this.goodsList,
      };
      this.$bus.$emit("sum", data);
      return amount;
    },
  },
  data() {
    return {
      goodsList: [],
    };
  },
  mounted() {
    //待完善：不让参数显示url上
    this.goodsList = JSON.parse(this.$route.query.goodsList);
  },
};
</script>
<style lang="scss" scoped>
@import "./style/index.scss";
</style>
