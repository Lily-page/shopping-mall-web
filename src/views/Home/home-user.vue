<template>
  <div class="home-user">
    <div class="user-view info">
      <a>
        <img :src="userAvatar" alt="用户头像" />
        <span class="user-view">{{ userName }}</span>
      </a>
    </div>
    <div class="news">
      <a><img quality="normal" data-once="true" :src="banner" style="width: 356px; height: 141px; border-radius: 6px" /></a>
    </div>
    <div class="notice">
      <div class="notice-title"><b>公告</b> 新鲜的事都在这里~</div>
      <div class="notice-item" v-for="(item, index) in noticeList" :key="index">
        <router-link :to="{path:`/notice/${item._id}`}">
          <span class="iconfont icon-daochu1024-07"></span>
          <span class="notice-item-right">{{ item.title }}</span>
        </router-link>
      </div>
    </div>
    <div class="myShopping">
      <div>
        <router-link to="/personalCenter/favorList">
          <i class="iconfont icon-shoucang user-icon"></i>
          <div>收藏的宝贝</div>
        </router-link>
      </div>
      <div>
        <router-link to="/personalCenter/orderList">
          <i class="iconfont icon-wodedingdan user-icon"></i>
          <div>我的订单</div>
        </router-link>
      </div>
      <div>
        <router-link to="/personalCenter/address">
          <i class="iconfont icon-huoyunzhandizhiguanli user-icon"></i>
          <div>地址管理</div>
        </router-link>
      </div>
      <div>
        <router-link to="/myTracks">
          <i class="iconfont icon-zuji user-icon"></i>
          <div>我的足迹</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      banner: "",
      noticeList: [],
      defaultAvatar:
        "data:image/png;base64,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",
    };
  },
  computed: {
    ...mapState(["login", "userInfo", "carList", "showCar"]),
    userAvatar() {
      return this.userInfo ? this.userInfo.avatar : this.defaultAvatar;
    },
    userName() {
      return this.userInfo
        ? `Hi! ${this.userInfo.username}`
        : "Hi~ 欢迎逛shopping商城!";
    },
  },
  created() {
    this.getNoticeList();
  },
  methods: {
    async getNoticeList() {
      const res = await this.$http.get("notice");
      const res2 = await this.$http.get("/ads");
      this.noticeList = res?.data[0]?.noticeList;
      this.banner = res2?.data[2]?.items[0]?.src;
    },
  },
};
</script>
<style lang="scss" scoped>
.home-user {
  width: 32.3%;
  background: #ededed;
  border-radius: 10px;
}

.user-view {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-content: flex-start;
  border: 0 solid #000;
  margin: 0;
  padding: 0;
  min-width: 0;
}

.info {
  margin: 20px auto 0;

  img {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    margin: 0px auto;
    display: block;
  }

  span {
    color: #333;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    margin-top: 10px;
  }
}

.news {
  margin-top: 17px;
  margin-left: 14px;
  padding-bottom: 0px;

  a {
    width: 100%;
  }
}

.notice {
  margin: 27px 0 0 14px;

  .notice-title {
    color: #666;
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 12px;
  }

  .notice-item {
    margin-bottom: 8px;
    width: 295px;
    overflow: hidden;
    white-space: nowrap;
    text-align: ellipsis;

    a {
      font-size: 12px;
      color: #666666;

      .notice-item-right {
        color: #666;
        font-size: 12px;
        line-height: 12px;
      }

      &:hover .notice-item-right {
        color: rgb(104, 147, 223);
      }
    }
  }
}

.icon-daochu1024-07 {
  color: rgb(255, 123, 21);
}

.myShopping {
  box-sizing: border-box;
  margin: 20px 23px 0 32px;
  width: 100%;
  overflow: hidden;
  color: #333;
}

.myShopping > div {
  float: left;
  margin-right: 34px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;

  a {
    text-decoration: none;
    color: #333;

    .user-icon {
      color: rgb(51, 51, 51);
      font-size: 22px;
      -webkit-font-smoothing: antialiased;
    }

    div {
      font-size: 12px;
    }

    &:hover {
      color: rgb(104, 147, 223);
    }

    &:hover .user-icon {
      color: rgb(104, 147, 223);
    }
  }
}
</style>
