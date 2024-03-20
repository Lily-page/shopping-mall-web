<template>
  <div>
    <el-result icon="success" :title="msg" subTitle="您已经成功付款，请继续关注后续进度">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="toHome">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg:''
    }
  },
  created() {
    this.getResult();
  },
  methods: {
    toHome(){
      this.$router.push('home')
    },
    async getResult() {
      let data = {
        out_trade_no: this.$route.query.out_trade_no,
        trade_no: this.$route.query.trade_no,
      };
      const res = await this.$http.post(
        "/queryOrder",
        this.$qs.stringify(data),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );
      this.msg = res.data.msg;
    },
  },
};
</script>
