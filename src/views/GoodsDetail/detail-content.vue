<template>
  <div class="detail-content">
    <div class="info fl">
      <div class="nav-title">
        <ul class="info-nav clearfix">
          <li class="info-nav-item" v-for="(item, i) in detail.detailType" :key="i" @click="changeNav(item, i)">
            {{ item }}
          </li>
        </ul>
        <div class="nav-arr-container">
          <div class="nav-arr" style="left: 0; width: 128px"></div>
        </div>
      </div>
      <div class="main-body">
        <div class="body-content" v-if="detailShow == navList.goodsDetail" v-html="detail.goodsDetail"></div>
        <div v-if="detailShow == navList.comment">
          <comment v-if="detail.comment && detail.comment.length" :comment="detail.comment"></comment>
          <div class="comment-no-data" v-else>
            <div class="no-result">
              <div class="no-comment-img"></div>
              <p class="no-comment-info">暂无评论</p>
            </div>
          </div>
        </div>
        <div v-if="detailShow == navList.parameter">商品参数</div>
        <div class="body-content" v-if="detailShow == navList.commonProblem" v-html="detail.commonProblem">
          常见问题
        </div>
      </div>
    </div>
    <!-- <div class="best">
      <div class="flagship">
        <div class="icon-container"></div>
      </div>
      <div></div>
    </div> -->
  </div>
</template>
<script>
const navNum = {
  first: 1,
  second: 2,
  third: 3,
  four: 4,
};
const navList = {
  goodsDetail: "商品详情",
  comment: "评论",
  parameter: "产品参数",
  commonProblem: "常见问题",
};

import Comment from "../../common/component/comment.vue";
export default {
  components: {
    Comment,
  },
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      detailShow: "商品详情",
      navList: navList,
      navNum: navNum,
    };
  },
  methods: {
    changeNav(val, index) {
      let tabLine = document.getElementsByClassName("nav-arr")[0];
      this.detailShow = val;
      tabLine.style.left = index == 0 ? "0px" : `${index * 128 + 1}px`;
    },
  },
};
</script>
<style lang="scss" scoped>
@import './style/detail-content.scss';
</style>
