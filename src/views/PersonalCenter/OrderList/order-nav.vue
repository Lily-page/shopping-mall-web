<template>
  <section>
    <div class="personal-selector">
      <ul>
        <li v-for="(item, key) in orderNav" :key="key" :class="{ active : underline == key}" @click="changeNav(key)">
          <a v-if="key == 'trash'" class="m-icons m-icons-trash-hover"></a>
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { orderNav, orderNavAndState } from "@/utils/common";
export default {
  data() {
    return {
      orderNav: orderNav,
      underline: "allOrders",
    };
  },
  methods: {
    changeNav(key) {
      this.underline = key;
      this.$bus.$emit("changeTable", orderNavAndState[key]);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../style/order-list.scss";
</style>
