<template>
  <div class="home">
    <div class="floor_nav">
      <home-nav></home-nav>
      <div class="home-container">
        <home-menu />
        <div class="home-swiper">
          <swiper :carouselList="carouselList" :width="520" :height="280" />
          <swiper-two class="home-swiper-two" :slideImg="slideImg" :width="520" :height="206" />
        </div>
        <home-user />
      </div>
    </div>
    <recommend />
  </div>
</template>
<script>
import Swiper from "../../common/Swiper";
import SwiperTwo from "../../common/SwiperTwo";
import HomeNav from "./home-nav";
import HomeMenu from "./home-menu";
import HomeUser from "./home-user";
import Recommend from "./recommend";
export default {
  components: {
    Swiper,
    SwiperTwo,
    HomeNav,
    HomeMenu,
    HomeUser,
    Recommend,
  },
  data() {
    return {
      carouselList: [],
      slideImg: [],
    };
  },
  created() {
    this.getSwiperList();
  },
  methods: {
    async getSwiperList() {
      const res = await this.$http.get("/ads");
      this.carouselList = res.data[0].items;
      this.slideImg = res.data[1].items;
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 1190px;
  margin: 0 auto;
}

.floor_nav {
  background: #fff;
  padding-bottom: 15px;
}

.home-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.home-swiper {
  width: 45%;
}

.home-swiper-two {
  margin-top: -30px;
}
</style>