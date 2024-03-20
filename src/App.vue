<template>
  <div id="app">
    <router-view class="main" v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="scss">
@import "./assets/style/reset.scss";

#app {
  height: 100%;
}

.main {
  background-color: #f4f4f4;
  overflow: hidden;
  height: 100%;
}
</style>
