<template>
  <div class="grid_c1 more_inner">
    <div>
      <ul class="more_list">
        <li class="more_item more_item_good hover-on" v-for="(item, index) in goodsData" :key="index" @click="toDetail(item)">
          <span class="more_item_dot"></span>
          <a class="more_lk" :title="item.title" :aria-label="item.title">
            <div class="lazyimg lazyimg_loaded more_img">
              <img class="lazyimg_img" :src="item.src" :alt="item.title" />
            </div>
            <div class="more_info">
              <p class="more_info_name">{{ item.title }}</p>
              <div class="more_info_price more_info_plus">
                <div class="mod_price">
                  <i>¥</i>
                  <span class="more_info_price_txt">
                    {{ item.price[0] }}.<span class="more_info_price_txt-decimal">{{ item.price[1] }}</span>
                  </span>
                </div>
              </div>
            </div>
            <!-- <div class="more_item_hover">
                            <div class="more_item_delete" title="不喜欢"></div>
                            <div class="more_item_hd" title>
                                <div class="more_item_btn more_btn_find enable">
                                    <i class="more_btn_icon"></i>
                                    <span>找相似</span>
                                </div>
                            </div>
                        </div> -->
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getStore } from "@/utils/storage";
export default {
  props: {
    goodsData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    async toDetail(item) {
      this.$router.push({
        path: `goodsDetail?goodsId=${item._id}`,
      });

      const res = await this.$http.post("/addTracks", {
        goodsId: item._id,
        goodsName: item.goodsName,
        goodsImageBig: item.goodsImageBig,
        salePrice: item.salePrice,
        trackDate: new Date().toLocaleDateString(),
      });
    },
  },
};
</script>
<style scoped>
.more_list {
  margin: 0 -5px;
}

.more_item {
  background: #fff;
  position: relative;
  float: left;
  width: 230px;
  height: 322px;
  margin: 0 5px 10px;
}

li {
  list-style: none;
}

.more_lk {
  display: inline-block;
  width: 100%;
  height: 100%;
}

a {
  color: #666;
  text-decoration: none;
}

.more_img {
  width: 150px;
  height: 150px;
  margin: 30px auto 40px;
  /* display: block;
  -webkit-transition: opacity 0.2s ease;
  transition: opacity 0.2s ease; */
}

.more_img > img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
}

.lazyimg_loaded {
  transition: background 0.2s linear, opcity 0.2s linear !important;
  background: transparent;
}

.lazyimg {
  position: relative;
  overflow: hidden;
  /* background: #eee;
  -webkit-transition: background 0.2s linear;
  transition: background 0.2s linear; */
}

.lazyimg_loaded .lazyimg {
  opacity: 1;
}

.more_info {
  clear: both;
  line-height: 24px;
  padding: 0 20px;
  height: 65px;
}

.more_info_name {
  height: 48px;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  color: #666;
  transition: color 0.2s ease;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
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
  /* width: 75px; */
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
  font-size: 20px;
  font-weight: 700;
  font-family: arial, sans-serif;
}

.more_info_price_txt-decimal {
  font-size: 12px;
}

/* .more_item.hover-on:hover .more_item_delete {
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
        opacity: 1;
    }

    .more_item.hover-on .more_item_delete {
        display: block;
    }

    .more_item_delete:hover {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAZpJREFUOMulk7tOAkEUhqfTXmVBK9hdoxC0EFFqEztLWg1SeWksfQZ9ha3UBDAa38DEwr3ANhZk2WgtSKEgnSHHcyazZGdBGyb5k83s/505lxnGxLITOrMW9Vlb0XatmGqgPNRAiL4N/o886B2t19gGM+Mqs+O6YinaJRrbKPhDbfLY8WXFVFKstbSNJys6wXErptXQMPwHDoQerUoMscxJqDOWol4EsLmQAnM+OQ7K+0NiiGWi5vfA9LKzB83ivgwj6Ga2wC+fQj2Z5T5iiGWiYSNjs3gAPasO/uExGnFvLgmNlRx0rqvQualBXV0PApAMJjosnUhw325Aq3QEbjoPnasKdG8fwF0rhGGSx8SYIvWqHO49O/D1+ATd6j242QLPMOIdTA6AabvpTfhE+Kf/DW9n55PgUQAv2jBeM6VdueNwz3TAL4meyAE8uYlYn5vJ84bxmrPbPCDB1BOaAs4/HMCQxkhzJhN1W6oZT/bLJ/CBGTVWc/IYoxfJwTlHRsVFJ1NpIoPwRYpcZQIjcLjEsas89WOa9jn/Ai8058i39DJCAAAAAElFTkSuQmCC");
    }

    .more_item_delete {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 16px;
        height: 16px;
        display: none;
        opacity: 0;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAANJJREFUOMvtkU0KwjAQhafVZcFVVXoMD+EBWnsDb6WCBRdNfyDdxa16gRzFG/hGJhKllW4FH3wQpn0vMxmiv14yxpBSiuq6XoE1CMHzW1VVzBLkqEWu/qamadhMYr6CDARijsEOHPDfrDeAJQGBmG8ghWnOZpxPMCd80Vd5ISm4gDMoRpmdvJkNuCNga62lUQEfMxdslk4y6azf2HUdlWXJ5gXYu5nbtiXvTTaohb0hWmsXkMtrJ95m+GZe4RHEg12IIeJV+fPyGUwBjzYZDPhNPQCZAMge0sk3nAAAAABJRU5ErkJggg==") no-repeat;
        background-size: 16px;
        background-position: 50%;
        cursor: pointer;
    }

    .more_item.hover-on .more_item_hd {
        display: block;
    }

    .more_item_hd {
        position: absolute;
        bottom: 8px;
        left: 0;
        width: 100%;
        text-align: center;
        opacity: 0;
        background: linear-gradient(180deg, rgba(255, 255, 255, .8) 0, white 35%, white);
    }

    .more_item_hd .more_item_btn:first-child {
        margin-left: 0;
    }

    .more_item_hd .more_item_btn:hover {
        background: #c81623;
        background-color: #c81623;
    }

    .more_item_hd .more_item_btn {
        height: 28px;
        width: 120px;
        display: inline-block;
        font-size: 12px;
        color: #353131;
        border: 1px solid #353131;
        border-radius: 15px;
        line-height: 28px;
        text-align: center;
        cursor: pointer;
        margin-top: 18px;
    }

    .more_btn_find {
        background-color: #333;
        color: #fff !important;
    }

    .more_item_hd .more_item_icon {
        transition: all .4s ease;
        vertical-align: middle;
        background-repeat: no-repeat;
    }

    .more_btn_find .more_item_icon {
        margin-top: -4px;
        width: 16px;
        height: 16px;
        line-height: 16px;
        background-size: 16px 16px;
        margin-right: 4px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAQlJREFUOMvN0ssuA2EUwPHG1EI3WGHt/gzS2CEkghC3NUXISLyFS1IsxQY7IXF5AJ5s/E/y7+SrdNFlJ/kl813O6ek5U6n05FMURejDgOK9q6Awil1c4UGX2MFI616n4CrW8IUX5FhV7t6n62qZxOAMDfxiCzVM4AynGHdv2zsHxpQJlvCDuusZfOAW975PeTbv3YVWgiG84TDpw4XBmeVGkvPk/BivGIzFMN4tK03QNEG4+5fgKE0Qli1rzvWsDWtaSfyFac/q3l1MexC/cuLBhrOftPu5DY29TZvYKJuYTKLf4G882f0VxTSeHfF62xg7fEhj2McNHnWNPc8q3X6VmbOvtZXbc88fVwgKM0eNW+sAAAAASUVORK5CYII=");
    }

    em,
    i {
        font-style: normal;
    } */

.more_item:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
    0 1px 4px rgba(0, 0, 0, 0.117647);
}
</style>
