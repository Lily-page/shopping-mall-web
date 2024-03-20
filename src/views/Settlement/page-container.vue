<template>
  <section class="page-container">
    <order-address />
    <div class="hr"></div>
    <order-info/>
  </section>
</template>
<script>
import OrderAddress from "./order-address.vue";
import OrderInfo from './order-info.vue'
export default {
  components: {
    OrderAddress,
    OrderInfo
  },
};
</script>
<style lang="scss" scoped>
@import './style/index.scss';
</style>
