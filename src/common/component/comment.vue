<template>
  <section>
    <!-- <div class="comment-top-container clearfix">
      <div class="comment-pid-select-rate">
        <div class="comment-pid-select">
          <span>按分类查看评价</span>
          <div class="arrow-rigth-black"></div>
        </div>
        <div class="clearfix">
          <div class="comment-top-positive-rate text-primary">
            <span>99%满意</span>
          </div>
          <div class="comment-top-ratingbar-container text-primary"></div>
        </div>
      </div>
      <div class="comment-top-tabs">
        <div class="tabbar-container">
          <div class="tabbar-item">
            <a
              class="comment-top-tabs-item m-btns m-btn-xs m-btn-blue"
              href="javascript:;"
              >有图</a
            >
          </div>
          <div class="tabbar-item">
            <a
              class="comment-top-tabs-item m-btns m-btn-xs m-btn-gray"
              href="javascript:;"
              >追评</a
            >
          </div>
          <div class="tabbar-item">
            <a
              class="comment-top-tabs-item m-btns m-btn-xs m-btn-gray"
              href="javascript:;"
              >好评</a
            >
          </div>
        </div>
      </div>
      <div class="comment-sort">
        <div class="sort-button unSelected">时间排序</div>
        <div class="sort-button selected">默认排序</div>
      </div>
    </div> -->
    <div>
      <div>
        <div class="commentItem" v-for="(item, index) in comment" :key="index">
          <div class="t-div">
            <div class="myimg">
              <img :src="item.avatar" />
            </div>
            <div class="info">
              <div class="name">{{ item.username }}</div>
              <div class="attach">
                <span>2022-03-31 16:01</span>
                <span></span>
                <!-- <span>2022-03-31 16:01</span>
                <span class="margin">|</span>
                <span>12GB+256GB、墨羽色</span> -->
              </div>
            </div>
          </div>
          <div class="m-div">
            {{ item.content }}
          </div>
          <div class="img-div">
            <div class="imggroup-container">
              <div
                class="imggroup-tabs-container clear-tl"
                style="height: 40px"
              >
                <div
                  class="imggroup-tabs-item"
                  v-for="(imgItem, i) in item.contentImg"
                  :key="i"
                  style="margin-right: 4px; width: 40px; height: 40px"
                  @click="selcetImg(imgItem, index, i + 1)"
                >
                  <img :src="imgItem" />
                </div>
              </div>
              <div
                v-if="imgSrc && itemIdx == index && imgIdx"
                class="imggroup-select"
                style="min-height: 500px; width: 100%"
              >
                <div class="imggroup-select-img">
                  <img
                    :src="imgSrc"
                    alt
                    style="height: auto; width: 281.32px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="b-div"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    comment: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      imgSrc: '',
      imgShow: '',
      itemIdx: -1,
      imgIdx: ''
    };
  },
  methods: {
    selcetImg(imgItem, index, i) {
      this.imgSrc = imgItem;
      this.itemIdx = index;
      let str = index + '-' + i;
      this.imgIdx = this.imgIdx == str ? '' : str;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/../../../assets/scss/_variables.scss";
.comment-top-container {
  margin: 16px 0;

  .comment-pid-select-rate {
    overflow: hidden;
    width: 100%;

    .comment-pid-select {
      display: flex;
      align-items: center;
      justify-content: center;
      float: left;
      line-height: 40px;

      .arrow-rigth-black {
        height: 20px;
        width: 20px;
        display: inline-block;
        background-size: 100%;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAAAvUlEQVQ4EWNgGAWDLgQYCbnI2Nh4IiMjoyoPD0/QgQMHfhBSz0RQARPTwf///7t/+fJlpYODAwtB9YQUnD59eh1QTTbQUD+goXOBNEFfETITLG9iYlIN9P5/IN2PTwMzPklkuWfPnh2WlpbmB7qwEEi/AfJPI8vD2ATDEKaQ6jSxXibKYmDYZUDDbyGhSCHoZVNT0yCgrVOBaXETMC0mA+n/+FxB0MB///7ZAw3ZCTQsHJiw/+AzbFRukIYAAIjmQJSaM1/aAAAAAElFTkSuQmCC");
      }
    }

    .comment-top-positive-rate {
      float: right;
      line-height: 40px;
    }
  }

  .comment-top-ratingbar-container {
    float: right;
    line-height: 40px;
    margin-left: 30px;
  }

  .comment-top-tabs {
    padding-top: 5px;
    text-align: center;

    .comment-top-tabs-item {
      margin-right: 17px;
    }
  }

  .comment-sort {
    padding-top: 5px;
    display: flex;
    justify-content: flex-end;

    .unSelected {
      background-color: map-get($colors, "light-grey-1");
      color: map-get($colors, "black-1");
    }

    .selected {
      background: map-get($colors, "primary");
      color: map-get($colors, "white");
    }

    .sort-button {
      width: 87px;
      height: 35px;
      border: 0;
      text-align: center;
      line-height: 35px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 2px;
    }
  }
}

.tabbar-container {
  display: flex;
  flex-direction: direction;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;

  .tabbar-item {
    margin-bottom: 10px;
  }
}

.commentItem {
  width: 774px;
  position: relative;

  .t-div {
    margin-top: 35px;
    display: inline-block;

    .myimg {
      height: 44px;
      width: 44px;
      border-radius: 22px;
      background: map-get($colors, "white-2");
      overflow: hidden;
      float: left;

      img {
        height: 44px;
        width: 44px;
      }
    }

    .info {
      margin-left: 66px;

      .name {
        font-size: 18px;
      }

      .attach {
        font-size: 12px;
        color: map-get($colors, "grey");
        margin-top: 5px;

        .margin {
          margin: 0 10px;
        }
      }
    }
  }

  .m-div {
    margin: 10px 0 10px 66px;
    font-size: 14px;
    line-height: 24px;
    color: map-get($colors, "black-1");
  }

  .img-div {
    margin-top: 10px;
    margin-bottom: 24px;
    margin-left: 64px;
  }
}

.imggroup-container,
.imggroup-container .imggroup-tabs-container {
  width: 100%;
}

.clear-tl {
  zoom: 1;
}

.imggroup-container {
  .imggroup-tabs-container {
    &:after {
      clear: both;
      height: 0;
      opacity: 0;
      content: "";
    }

    .imggroup-tabs-item {
      float: left;
      cursor: pointer;
      overflow: hidden;
      border: 1px solid #fff;
      margin-bottom: 10px;
    }
  }

  .imggroup-select {
    overflow: hidden;
    position: relative;
    width: 100%;

    .imggroup-select-img {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>
