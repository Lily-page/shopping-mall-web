<template>
  <div>
    <section>
      <router-link to="/personalCenter/user" tag="div" class="personal-profile">
        <div
          class="m-icons m-icons-per-user personal-profile-photo"
          :style="{
            'background-image': 'url(' + userInfo.avatar + ')',
            'background-position': 'center center',
            'background-size': '100%',
          }"
        ></div>
        <p class="personal-profile-username">
          {{ userInfo.username || "-" }}
        </p>
      </router-link>
    </section>
    <section>
      <div class="personal-functional-list-box">
        <ul>
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="{ active: showNav == navListPath[index] }"
          >
            <span :class="{ circle: showNav == navListPath[index] }"></span>
            <router-link :to="navListPath[index]">{{
              item
            }}</router-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { navList, navListPath } from "@/utils/common";
export default {
  data() {
    return {
      navList: navList,
      navListPath: navListPath,
      showNav: 0,
      active: "active",
      circle: "circle",
    };
  },
  watch:{
      $route: {
          handler(val) {
              this.showNav = val.path;
              this.$emit("navChange", val.path)
          },
          immediate:true,
          deep:true
      }
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
@import "./style/list-box.scss";
</style>
