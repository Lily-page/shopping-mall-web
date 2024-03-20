<template>
  <div class="evaluation">
    <div class="evaluate-hd">
      <h2 class="hd-title">评价</h2>
      <p class="hd-txt">快乐的你分享完美的使用心得~</p>
    </div>
    <div class="evaluate-main">
      <div class="content clearfix" v-for="(item,i) in goods" :key="i">
        <div class="fl item-left">
          <div class="item-img">
            <img :src="item.goodsImageBig" alt="商品图片">
          </div>
        </div>
        <div class="fl item-right" :model="item.goodsId">
          <h3 class="item-name">{{item.goodsName}}</h3>
          <el-rate v-model="item.score" style="margin: 20px 0;" show-text :texts="scoreText"></el-rate>
          <p>您还没有填写评价内容</p>
          <el-input type="textarea" class="item-text" :rows="4" placeholder="写写你的感受吧，一不小心就成了评论高手。" v-model="item.content" maxlength="500" show-word-limit>
          </el-input>
          <el-upload :action="uploadUrl" :headers="getAuthHeaders()" list-type="picture-card" :on-remove="handleRemove.bind(null, {'index': i,'data': item})" :on-success="handleAvatarSuccess.bind(null, {'index': i})">
            <i class="el-icon-camera"></i>
          </el-upload>
        </div>
      </div>
    </div>

    <div class="evaluate-operate">
      <el-button type="primary" @click="publish">发表</el-button>
      <el-checkbox class="operate-checkbox" v-model="isAnonymous">匿名评价</el-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      goods: [],
      isAnonymous: false,
      scoreText: ["很差", "差", "一般", "好", "很好"],
      dialogImageUrl: "",
      dialogVisible: false,
      model: {
        score: null,
        content: "",
        contentImg: [],
      },
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async publish() {
      const data = {
        comment: this.goods,
        isAnonymous: this.isAnonymous,
        orderId: this.id,
      };
      const res = await this.$http.post("/comment", data);
      if (res) {
        this.$message({
          type: "success",
          message: "评论成功",
        });
        this.$router.push("/personalCenter/orderList");
      }
    },
    handleRemove(obj, res) {
      this.goods[obj.index].contentImg.forEach((v, i) => {
        if (v == res.response.url) {
            this.goods[obj.index].contentImg.splice(i,1);
        }
      })
    },

    handleAvatarSuccess(obj, res) {
      this.goods[obj.index].contentImg.push(res.url);
    },

    async fetch() {
      const res = await this.$http.get(`/order/${this.id}`);
      this.goods = (res.data?.goods || []).map((v,i) => {
        let model = JSON.parse(JSON.stringify(this.model))
        return {...v, ...model};
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style/index.scss";

.item-text ::v-deep {
  width: 650px;
  margin: 20px 0;
  font-size: 12px;
}

::v-deep .el-upload--picture-card {
  width: 50px;
  height: 50px;
  line-height: 62px;
}

::v-deep .el-upload-list--picture-card {
  .el-upload-list__item {
    width: 50px;
    height: 50px;
  }

  .el-upload-list__item-actions {
    .el-upload-list__item-preview {
      display: none;
    }

    span + span {
      margin-left: 0px;
    }
  }
}
</style>