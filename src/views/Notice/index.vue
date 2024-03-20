<template>
  <div class="notice">
    <div class="notice-main">
      <h1>{{model.title}}</h1>
      <div class="notice-content" v-html="model.body"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "notice",
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/notice/${this.id}`);
      this.model = res.data;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.notice {
  width: 1080px;
  margin: 0 auto;
  background-color: map-get($colors, "white");

  .notice-main {
    padding: 80px 100px;
  }

  .notice-content {
    margin-top: 30px;
    white-space: pre-wrap;
    color: map-get($colors, "grey");
    
    ::v-deep p {
        margin-bottom: 20px;
        line-height: 22px;
    }
  }
}
</style>