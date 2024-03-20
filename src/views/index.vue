<template>
  <div class="index">
    <main-header />
    <div class="main">
      <router-view />
    </div>
    <main-footer />
  </div>
</template>
<script>
import MainHeader from "@/common/MainHeader.vue";
import MainFooter from "@/common/MainFooter.vue";
export default {
  components: {
    MainHeader,
    MainFooter,
  },
};
</script>
<style lang="scss" scoped>
.main {
  height: auto;
}
</style>

