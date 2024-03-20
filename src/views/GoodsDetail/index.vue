<template>
  <div class="detail">
    <div class="container">
      <div>
        <div class="header clearfix">
          <div class="banner clearfix">
            <div class="main fl">
              <img :src="goodsImageBig" />
            </div>
            <div class="thumb fr">
              <div class="thumb-container">
                <div class="thumb-pic" :style="{
                    'border-color':
                      item === goodsImageBig
                        ? 'rgb(132,95,63)'
                        : 'rgb(236, 236, 236)',
                  }" v-for="(item, index) in goodsImageSmall" :key="index" @click="handlerClick(item)">
                  <img :src="item" />
                </div>
              </div>
            </div>
          </div>
          <div class="sku-container">
            <div class="name clearfix">
              <div class="good-name fl">{{ goods.goodsName }}</div>
            </div>
            <div class="summary">{{ goods.subTitle }}</div>
            <!-- <div class="promotion-box"></div> -->
            <div class="card">
              <div class="price-line">
                <h5 class="sku-title">售价</h5>
                <div class="price">
                  <span class="money-symbol">¥</span>
                  <span class="value">{{
                    Number(goods.salePrice).toFixed(2)
                  }}</span>
                  <s v-if="goods.salePrice" class="market-price">{{
                    `¥${Number(goods.marketPrice).toFixed(2)}`
                  }}</s>
                </div>
              </div>
              <div class="service-line">
                <h5 class="sku-title">服务</h5>
                <div class="introduce-container">
                  <p class="icon">!</p>
                  <!-- <div class="content content-show">
                                        <div class="cardmodal-outer-container">
                                            <div class="inner-container">
                                                <div class="container">
                                                    <div class="content-main">
                                                        <div class="text-item">
                                                            <p class="text-title">满69包邮</p>
                                                            <p class="text-content">本商品满69元可包邮，不足69元收取运费10元</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="size">
                                                <div class="content-main">
                                                    <div class="text-item">
                                                        <p class="text-title">满69包邮</p>
                                                        <p class="text-content">本商品满69元可包邮，不足69元收取运费10元</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> -->
                </div>
                <div class="service">
                  <div class="service-item" v-for="(serviceItem, i) in goods.service" :key="i">
                    <a class="m-icons m-icons-service"></a>
                    <span class="service-item-text">{{ serviceItem }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="address-line">
              <h5 class="sku-title">配送地区</h5>
              <div class="address">
                <div>
                  <span>{{deliveryArea}}</span>
                  <span>&nbsp;有货</span>
                  <a @click="dialogFormVisible = true">修改</a>
                </div>
              </div>
            </div>
            <div>
              <div style="overflow: hidden; padding: 0px 0px 12px"></div>
              <div class="count-line">
                <h5 class="sku-title count-title">数量</h5>
                <div class="count-container">
                  <div>
                    <div class="minus-btn" :style="[
                        { cursor: num === 1 ? 'not-allowed' : 'pointer' },
                      ]" @click="num !== 1 && subtractNum()">
                      <div style="
                          width: 30px;
                          height: 30px;
                          transform: scale(0.5);
                          line-height: 24px;
                          cursor: default;
                        ">
                        <svg fill="#ccc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 4">
                          <rect width="40" height="4" rx="2" ry="2"></rect>
                        </svg>
                      </div>
                    </div>
                    <input type="text" class="count-input" :value="num" />
                    <div class="minus-btn-active" :style="[
                        {
                          cursor:
                            num === goods.limitNum ? 'not-allowed' : 'pointer',
                        },
                      ]" @click="num !== goods.limitNum && addNum()">
                      <div style="
                          width: 30px;
                          height: 30px;
                          transform: scale(0.5);
                          cursor: default;
                        ">
                        <svg fill="#9f8052" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                          <path d="M38,17.1H22V2a2,2,0,0,0-4,0V17.1H2a2,2,0,0,0-2,2H0a2,2,0,0,0,2,2H18V38a2,2,0,0,0,4,0V21.1H38a2,2,0,0,0,2-2h0A2,2,0,0,0,38,17.1Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="virtual-line"></div>
            </div>
            <div class="btn-line">
              <div class="buy-btn-container">
                <a class="m-btns m-btn-middle m-btn-blue" @click="
                    addCar(
                      goods._id,
                      goods.salePrice,
                      goods.goodsName,
                      goodsImageBig
                    )
                  ">加入购物车</a>
                <a class="m-btns m-btn-middle m-btn-blue-stroke" @click="toSettlement(goods._id, goods.salePrice, goods.goodsName, goodsImageBig)">
                  立即购买
                </a>
              </div>
              <div v-if="!isFavor" class="favor-btn" @click="
                  addFavor(
                    goods._id,
                    goods.salePrice,
                    goods.goodsName,
                    goodsImageBig
                  )
                ">
                <div>
                  <a class="m-icons m-icons-collection"></a>
                  <p>收藏</p>
                </div>
              </div>
              <div v-else class="remove-favor-btn" @click="cancelFavor(goods._id)">
                <div>
                  <a class="m-icons m-icons-collection"></a>
                  <p>取消收藏</p>
                </div>
              </div>
              <!-- <div class="favor-service-btn favor-btn">
                                <div>
                                    <a class="m-icons m-icons-service-detail"></a>
                                    <p>客服</p>
                                </div>
                            </div> -->
              <!-- <div class="favor-service-btn favor-btn">
                <div class="favor-follow">
                  <div class="follow iconfont icon-a-tianjiaguanzhuguanzhu"></div>
                  <p>关注</p>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <detail-content :detail="goods.detail"></detail-content>
      </div>
    </div>

    <el-dialog title="配送地区" :visible.sync="dialogFormVisible">
      <div>
        <el-col :span="23">
          <el-cascader size="large" :options="options" v-model="selectedOptions" :show-all-levels="true" @change="handleChange">
          </el-cascader>
        </el-col>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { regionData, CodeToText } from "element-china-area-data";
import DetailContent from "./detail-content";

export default {
  components: {
    DetailContent,
  },
  data() {
    return {
      goods: {
        detail: {},
        _id: "",
      },
      goodsImageSmall: [],
      goodsImageBig: "",
      num: 1,
      isFavor: false,
      deliveryArea: "",
      options: regionData,
      selectedOptions: [],
      dialogFormVisible: false,
    };
  },
  computed: {
    ...mapState(["login"]),
  },
  watch: {
    "goods._id": {
      handler(val) {
        this.getFavor(val);
      },
    },
  },
  created() {
    this.getGoodsDetail();
  },
  methods: {
    handleChange(value) {
      (value || []).map(
        (item) => (this.deliveryArea += CodeToText[item] + " ")
      );
    },
    //立即购买
    toSettlement(goodsId, salePrice, goodsName, goodsImageBig) {
      const goodsList = [
        {
          goodsId,
          salePrice,
          goodsName,
          goodsImageBig,
          goodsNum: this.num,
        },
      ];
      this.login
        ? this.$router.push({
            path: "/settlement",
            query: { goodsList: JSON.stringify(goodsList) },
          })
        : this.$router.push("/login");
    },
    //加入收藏夹
    addFavor(goodsId, salePrice, goodsName, goodsImageBig) {
      if (this.login) {
        this.$confirm("确认收藏该宝贝？", {
          confirmButtonText: "保存",
        })
          .then(async () => {
            await this.$http.post("/addFavor", {
              goodsId,
              salePrice,
              goodsName,
              goodsImageBig,
            });
            this.$message({
              type: "success",
              message: "收藏成功",
            });
            this.getFavor(goodsId);
          })
          .catch((action) => {
            this.$message({
              type: "info",
              message: "取消收藏",
            });
          });
      } else {
        this.$router.push("login");
      }
    },
    async cancelFavor(id) {
      const res = await this.$http.post(`/cancelFavor/${id}`);
      this.getFavor(id);
    },
    //加入购物车
    async addCar(id, price, name, img) {
      if (this.login) {
        //用户已登录
        await this.$store.dispatch("addItemToCarList", {
          goodsId: id,
          goodsNum: this.num
        });
        this.$store.dispatch("getCarList")
       
        this.$router.push({
          name: "addCarSuccess",
          params: { id, name, img },
        });
      } else {
        this.$router.push("login");
      }
    },
    subtractNum() {
      this.num--;
    },
    addNum() {
      this.num++;
    },
    handlerClick(src) {
      this.goodsImageBig = src;
    },

    async getFavor(id) {
      const res = await this.$http.get("/favorList");
      this.isFavor = res.data?.favorList.some((v) => v.goodsId == id);
    },

    async getGoodsDetail() {
      const res = await this.$http.get(`AllGoods/${this.$route.query.goodsId}`);
      this.goods = res.data;
      this.goodsImageSmall = res.data?.goodsImageSmall;
      this.goodsImageBig = this.goodsImageSmall[0];
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style/index.scss";
</style>
