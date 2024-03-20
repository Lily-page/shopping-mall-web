<template>
  <section class="rc_container">
    <div v-if="fashionIconList && fashionIconList.length" class="rc_item fashionIcon" aria-label="时尚达人" tabindex="0">
      <div class="more">
        <div class="floorhd">
          <div class="grid_c1 floorhd_inner">
            <h3 class="floorhd_title">时尚达人</h3>
          </div>
        </div>
        <goods-list :goodsData="fashionIconList"></goods-list>
      </div>
    </div>

    <div v-if="recommendList && recommendList.length" class="rc_item recommend" aria-label="为你推荐" tabindex="0">
      <div class="more">
        <div class="floorhd">
          <div class="grid_c1 floorhd_inner">
            <h3 class="floorhd_title">为你推荐</h3>
          </div>
        </div>
        <goods-list :goodsData="recommendList"></goods-list>
      </div>
    </div>
  </section>
</template>
<script>
import GoodsList from "@/common/GoodsList";
export default {
  components: {
    GoodsList,
  },
  data() {
    return {
      fashionIconList: [],
      recommendList: [],
    };
  },
  created() {
    this.getRecommendGoods();
    this.getFashionIcon();
  },
  methods: {
    async getRecommendGoods() {
      const res = await this.$http.get("recommendGoods");
      this.recommendList = (res.data || []).map((item) => {
        item.price = Number(item.price).toFixed(2);
        item.price = [item.price.split(".")[0], item.price.split(".")[1]];
        return item;
      });
    },
    async getFashionIcon() {
      const res = await this.$http.get("fashionIcon");
      this.fashionIconList = (res.data || []).map((item) => {
        item.price = Number(item.price).toFixed(2);
        item.price = [item.price.split(".")[0], item.price.split(".")[1]];
        return item;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.rc_container {
  margin: 0 auto;
  width: 1190px;
}

// .grid_c1 {
//   margin: 0 auto;
//   width: 1190px;
// }

.more {
  min-height: 400px;
}

.floorhd {
  height: 65px;
}

.floorhd_title {
  position: relative;
  width: 210px;
  height: 45px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  line-height: 45px;
  padding: 0 30px;
  margin: 0 auto 20px;
  overflow: hidden;
  color: #333;
}

.floorhd_title::after,
.floorhd_title::before {
  background-image: url("https://misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/sprite/floor_hd/sprite.png");
  width: 25px;
  height: 20px;
  content: "";
  position: absolute;
  top: 50%;
  margin-top: -10px;
}

.floorhd_title::before {
  background-position: 0 0;
  left: 0;
}

.floorhd_title::after {
  background-position: -25px 0;
  right: 0;
}
</style>