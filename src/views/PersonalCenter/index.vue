<template>
  <section class="personal-box">
    <div class="personal-section-box container">
      <div class="secondary-nav">
        <span>
          <router-link to="/">首页</router-link>
        </span>
        <span>
          <router-link to="/personalCenter/orderList">个人中心</router-link>
        </span>
        <span v-if="navTitle">
          <router-link :to="navPath">{{ navTitle }}</router-link>
        </span>
      </div>
      <div class="personal-list-box">
        <list-box @navChange="updateTitle" />
      </div>
      <div class="personal-container-box">
          <div class="personal-main-box">
              <router-view />
          </div>
      </div>
    </div>
  </section>
</template>
<script>
import ListBox from "./list-box.vue";
import { navList, navPathParameter } from "@/utils/common";
export default {
  components: {
    ListBox,
  },
  data() {
    return {
      navList: navList,
      navPathParameter: navPathParameter,
      navPath: "",
    };
  },
  computed: {
    navTitle() {
      let parameter = navPathParameter[this.navPath];
      return navList[parameter];
    },
  },
  methods: {
    updateTitle(e) {
      this.navPath = e;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style/index.scss";
</style>
