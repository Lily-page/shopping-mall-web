<template>
  <div class="car-detail">
    <div class="header-nav"></div>
    <div class="content">
      <el-table ref="multipleTable" :data="carList" :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
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
        <el-table-column prop="salePrice" label="单价" width="80">
        </el-table-column>
        <el-table-column prop="goodsNum" label="数量" width="180">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.goodsNum" size="mini" @change="handleChange" :min="1" :max="scope.row.limitNum"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="小计" width="120">
          <template slot-scope="scope">
            <span>¥</span>{{
              (scope.row.sum = scope.row.salePrice * scope.row.goodsNum)
                | keepTwoNum
            }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="100">
          <template slot-scope="scope">
            <a @click="deleteGoods(scope.row.goodsId)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="content-footer" style="margin-top: 20px">
        <el-checkbox v-model="checked" @change="toggleSelection">全选</el-checkbox>
        <el-button class="footer-pay" :disabled="!totalNum" @click="toSettlement()">去结算</el-button>
        <div class="footer-total">
          总价：<span>¥ {{ sum | keepTwoNum }}</span>
        </div>
        <div class="footer-num">
          已选择 <span>{{ totalNum }}</span> 件商品
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      multipleSelection: [],
      checked: false,
    };
  },
  computed: {
    ...mapState(["login", "carList"]),
    sum() {
      return this.multipleSelection?.reduce((pre, cur) => {
        return (pre += cur.goodsNum * cur.salePrice);
      }, 0);
    },
    totalNum() {
      return this.multipleSelection?.reduce((pre, cur) => {
        return (pre += cur.goodsNum);
      }, 0);
    },
  },
  methods: {
    getGoodsNum: _.debounce(function () {
      let data = {
        carList: this.carList,
      };
      this.$store.dispatch("updateCarListNum", data);
    }, 500),
    handleChange(value) {
      this.getGoodsNum();
    },
    toSettlement() {
      this.login
        ? this.$router.push({
            path: "/settlement",
            query: { goodsList: JSON.stringify(this.multipleSelection) },
          })
        : this.$router.push("/login");
    },
    deleteGoods(id) {
      this.$confirm("确定要删除吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async() => {
        await this.$store.dispatch("deleteCarListById", id);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.$store.dispatch('getCarList')
      });
    },
    toggleSelection() {
      if (this.carList) {
        this.$refs.multipleTable.clearSelection();
        this.carList.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.checked = this.multipleSelection.length === this.carList.length;
    },
  },
};
</script>
<style lang="scss" scoped>
.car-detail {
  width: 80%;
  margin-left: 10%;
}

.content-goods {
  display: flex;
  flex-wrap: nowrap;

  .goods-img {
    width: 80px;
    height: 80px;

    img {
      width: 100%;
    }
  }

  .goods-name {
    margin-left: 20px;
    flex: 1;
  }
}

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
