<template>
  <div class="favorlist">
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部宝贝" name="first">
        <favor-goods-list :goodsData="goodsList"></favor-goods-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from "vuex";
import FavorGoodsList from "@/common/FavorGoodsList";
export default {
  components: {
    FavorGoodsList,
  },
  data() {
    return {
      activeName: "first",
      goodsList: [],
    };
  },
  computed: {
    ...mapState(["login"]),
  },
  created() {
    this.login ? this.getFavorList() : this.$router.push({ path: "/login" });
  },
  methods: {
    async getFavorList() {
      const res = await this.$http.get("/favorList");
      this.goodsList = res.data?.favorList;
    },
  },
};
</script>
<style lang="scss" scoped>
.favorlist {
  margin: 0 auto;
  // width: 1130px;
  width: 870px;
}
</style>