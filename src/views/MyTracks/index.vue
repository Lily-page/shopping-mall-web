<template>
  <div class="my-tracks">
    <div class="tracks-container">
      <div class="con-header">
        <div class="header-main container clearfix">
          <div class="fl nav-box-logo">
            <router-link to="/home"><img src="@/assets/img/s-logo.webp" /></router-link>
          </div>
          <div class="fl track-title">我的足迹</div>
        </div>
      </div>
      <div class="con-content">
        <div class="content-ctr">
          <div class="ctr-container">
            <span class="ctr-btn" :model="showBtn" @click="batchDel"><i class="el-icon-delete"></i>
              批量删除</span>
          </div>
        </div>
        <div class="content-main">
          <div class="main-item" v-for="(item, index) in dateList" :key="index">
            <fieldset>
              <legend><span>{{item.date}}</span> {{`${item.trackList.length}件宝`}}</legend>
            </fieldset>
            <div class="item-con">
              <el-card v-for="(o, i) in item.trackList" :key="i" shadow="always" :body-style="{ padding: '0px' }">
                <img :src="o.goodsImageBig" class="image" @click="toDetail(o)">
                <div class="more_info">
                  <p class="more_info_name">{{o.goodsName}}</p>
                  <div class="more_info_price more_info_plus">
                    <div class="mod_price">
                      <i>¥</i>
                      <span class="more_info_price_txt">{{Number(o.salePrice).toFixed(2)}}</span>
                    </div>
                    <span ref="modBtn" class="mod-btn" @click="delBtn(item.date,o.goodsId)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getStore } from "@/utils/storage";
export default {
  data() {
    return {
      dateList: [],
      showBtn: false,
    };
  },
  created() {
    getStore("id") ? this.getMyTracks() : this.$router.push({ path: "/login" });
  },
  methods: {
    toDetail(item) {
      this.$router.push({
        path: `goodsDetail?goodsId=${item.goodsId}`,
      });
    },

    batchDel() {
      this.showBtn = !this.showBtn;
      let arr = this.$refs.modBtn;
      if (this.showBtn) {
        arr.forEach((item) => {
          item.style.opacity = "1";
        });
      } else {
        arr.forEach((item) => {
          item.style.opacity = "0";
        });
      }
    },

    async delBtn(date, id) {
      const res = await this.$http.delete("delTrack", {
        data: {
          userId: getStore("id"),
          date: date,
          goodsId: id,
        },
      });
      if (res.status === 200) {
        this.getMyTracks();
      }
    },

    async getMyTracks() {
      const res = await this.$http.get("/myTracks");
      this.dateList = res.data?.dateList;
    },
  },
};
</script>
<style lang="scss" scoped>
.con-header {
  background-color: #f4f4f4;

  .header-main {
    height: 90px;
    line-height: 90px;

    .nav-box-logo {
      width: 401.5px;
      height: 90px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .track-title {
      color: rgb(104, 147, 223);
      font-size: 18px;
    }
  }
}

.con-content {
  .content-ctr {
    background-color: #ddd;
    border-color: #ccc;

    .ctr-container {
      width: 1120px;
      margin: 0 auto;

      .ctr-btn {
        display: inline-block;
        left: 91.5%;
        margin: 0 auto;
        width: 100px;
        height: 50px;
        text-align: center;
        font-size: 16px;
        line-height: 50px;
        color: #3c3c3c;
        position: relative;

        &:hover {
          color: #fff;
          background-color: rgb(153, 153, 153);
        }
      }
    }
  }

  .content-main {
    width: 1120px;
    margin: 0 auto;
  }
}

.item-con {
  display: flex;
  flex-wrap: wrap;
}

fieldset {
  border: 0;
  border-top: 1px solid #ccc;
  text-align: left;
  margin-top: 20px;

  legend {
    padding: 0 2%;
    font-family: "Microsoft YaHei", SimSun, "\5b8b\4f53", sans-serif;

    span {
      font-size: 30px;
      color: #333333;
      margin-right: 5px;
      font-weight: 700;
    }
  }
}

.el-card.is-always-shadow {
  width: 212px;
  height: 296px;
  margin: 0 5px 10px;

  img {
    width: 100%;
  }

  &:hover {
    .mod-btn {
      /* display: block; */
      opacity: 1;
    }
  }
}

.more_info {
  clear: both;
  line-height: 24px;
  padding: 0 20px;
  height: 65px;
}

.more_info_name {
  height: 22px;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  color: #666;
  transition: color 0.2s ease;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

p {
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.more_info_price {
  margin-top: 10px;
}

.more_info_plus .mod_price {
  float: left;
  width: 75px;
  text-align: left;
}

.mod_price {
  display: inline-block;
  font-size: 16px;
  line-height: 18px;
  height: 18px;
  color: #e1251b;
}

.more_info_price_txt {
  font-size: 16px;
  font-weight: 700;
  font-family: arial, sans-serif;
}

.del-btn {
  float: right;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);

  &:hover {
    color: #fff;
    background-color: rgb(245, 108, 108);
  }
}

.mod-btn {
  /* display: none; */
  float: right;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;

  &:hover {
    color: #fff;
    background-color: rgb(245, 108, 108);
  }
}
</style>