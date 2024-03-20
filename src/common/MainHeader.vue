<template>
  <div class="header-box">
    <div>
      <header class="m-site-top">
        <div class="container clearfix">
          <div class="fl nav-location">
            <!-- <span class="iconfont icon-shouye"></span>
                        <span>广东</span> -->
            <router-link to="/">商城首页</router-link>
          </div>
          <div class="fr">
            <div class="fl site-item m-user-con">
              <div v-if="!login" class="m-no-login">
                <router-link to="/login">登录</router-link>
                <router-link to="/register">注册</router-link>
              </div>
              <div v-else class="m-login-info" @mouseenter="enterBlock($event)" @mouseleave="leaveBlock($event)">
                <a href="#" class="m-safe-anchor m-user">
                  <span class="m-icons m-icons-user-active h-icons h-user-icon" data-src :style="{
                      background:
                        'url(' +
                        userInfo.avatar +
                        ') center center / 100% no-repeat',
                      'border-radius': '50%',
                    }"></span>
                  <span class="m-username">{{ userInfo.username }}</span>
                  <div class="h-icons h-down-icon h-down-icon-new">
                    <div style="width: 13px; height: 13px; cursor: default">
                      <svg fill="#ccc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 22.5">
                        <path d="M39.28.72h0a2.49,2.49,0,0,0-3.5,0L20,16.53,4.23.72A2.48,2.48,0,0,0,.72,4.23L18.24,21.78A2.48,2.48,0,0,0,20,22.5a2.52,2.52,0,0,0,1.77-.72L39.28,4.23A2.5,2.5,0,0,0,39.28.72Z"></path>
                      </svg>
                    </div>
                  </div>
                </a>
                <div class="site-item-nav hidden">
                  <ul class="site-nav">
                    <li>
                      <router-link to="/personalCenter/user">个人中心</router-link>
                    </li>
                    <li>
                      <router-link to="/personalCenter/orderList">我的订单</router-link>
                    </li>
                    <!-- <li>
                      <a class="m-safe-anchor">退款/售后</a>
                    </li> -->
                    <li>
                      <router-link to="/personalCenter/favorList">我的收藏</router-link>
                    </li>
                    <li>
                      <router-link to="/personalCenter/address">地址管理</router-link>
                    </li>
                    <li><a @click="logout">退出登录</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- <span class="fl m-line"></span>
            <div class="fl m-help">
              <a href="#">帮助中心</a>
            </div>
            <span class="fl m-line"></span>
            <div class="fl m-clauses-con" @mouseenter="enterBlock($event)" @mouseleave="leaveBlock($event)">
              <div class="m-clauses">
                <a href="#" class="m-safe-anchor">资质证照&nbsp;/&nbsp;协议规则</a>
                <div class="h-icons h-down-icon h-down-icon-new">
                  <div style="width: 13px; height: 13px; cursor: default">
                    <svg fill="#ccc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 22.5">
                      <path d="M39.28.72h0a2.49,2.49,0,0,0-3.5,0L20,16.53,4.23.72A2.48,2.48,0,0,0,.72,4.23L18.24,21.78A2.48,2.48,0,0,0,20,22.5a2.52,2.52,0,0,0,1.77-.72L39.28,4.23A2.5,2.5,0,0,0,39.28.72Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="site-item-nav hidden">
                <ul class="site-nav">
                  <li>
                    <a href="https://daren.xiaomiyoupin.com/ewen/pageFromId?id=gurkg3d4bh7bbe6q" class="m-safe-anchor">资质证照</a>
                  </li>
                  <li>
                    <a href="https://daren.xiaomiyoupin.com/ewen/pageFromId?id=ytf4mzipem9cr7fj" class="m-safe-anchor">协议规则</a>
                  </li>
                </ul>
              </div>
            </div> -->
          </div>
        </div>
      </header>
      <slot name="nav" v-if="this.$route.meta.showSlot">
        <div class="nav-box">
          <div class="main-box clearfix">
            <div class="fl nav-box-logo">
              <router-link to="/home"><img src="../assets/img/logo4.png" /></router-link>
            </div>
            <div class="nav-box-search">
              <input placeholder="搜索Shopping商城商品" v-model.trim="searchKeyWord" size="100" @keyup.enter.prevent="search($event)" />
              <button @click.prevent="searchBtn()">
                <i class="iconfont icon-sousuo"></i>
              </button>
            </div>
            <div class="nav-box-gouwuche" @mouseenter="carShowState(true)" @mouseleave="carShowState(false)" @click="toCar">
              <button>
                <i class="iconfont icon-gouwuche"></i>
                <span class="nav-box-gouwuche-count" v-if="totalNum">{{
                  totalNum
                }}</span>购物车
              </button>
              <!-- 购物车显示 -->
              <div v-show="showCar"></div>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { removeStore, setStore } from "@/utils/storage";

export default {
  data() {
    return {
      productInfo: "",
      searchKeyWord: "",
    };
  },
  computed: {
    ...mapState(["login", "userInfo", "carList", "showCar"]),
    totalNum() {
      return (
        this.carList &&
        this.carList.reduce((total, item) => {
          total += item.goodsNum;
          return total;
        }, 0)
      );
    },
  },
  watch: {
    login: {
      handler(val) {
        if (val) {
          this.$store.dispatch("getCarList");
        }
      },
      immediate: true,
    }
  },
  methods: {
    ...mapMutations(["SHOWCAR", "SEARCHLIST"]),
    enterBlock(event) {
      event.currentTarget.firstElementChild.nextElementSibling.classList.remove(
        "hidden"
      );
      event.currentTarget.firstElementChild.nextElementSibling.classList.add(
        "show"
      );
    },
    leaveBlock(event) {
      event.currentTarget.firstElementChild.nextElementSibling.classList.remove(
        "show"
      );
      event.currentTarget.firstElementChild.nextElementSibling.classList.add(
        "hidden"
      );
    },
    async searchBtn() {
      const res = await this.$http.post("/like_search", {
        value: this.searchKeyWord,
      });
      if (res.data.result === 0) {
        this.$router.push({
          path: `searchGoods`,
        });
        this.SEARCHLIST(res.data);
      } else {
        //补充查询错误提示
      }
    },
    async search(e) {
      let keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        const res = await this.$http.post("/like_search", {
          value: this.searchKeyWord,
        });
        if (res.data.result === 0) {
          this.$router.push({
            path: `searchGoods`,
          });
          this.SEARCHLIST(res.data);
        } else {
          //补充查询错误提示
        }
      }
    },
    toCar() {
      if (this.login) {
        this.$router.push({
          path: "/carDetail",
        });
      } else {
        this.$router.push("login");
      }
    },
    carShowState(state) {
      this.SHOWCAR({
        showCar: state,
      });
    },
    logout() {
      removeStore("token");
      removeStore("id");
      removeStore("userInfo");
      window.location.href = "/";
    }
  },
};
</script>
<style lang="scss" scoped>
@import "./style/main-header.scss";
</style>
