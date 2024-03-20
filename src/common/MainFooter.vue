<template>
  <div class="shopping-footer">
    <div class="mod-service">
      <div class="mod-service-inner">
        <ul class="mod-service-list">
          <li class="fl mod-service-item" v-for="(item, i) in modService" :key="i">
            <div class="mod-service-unit">
              <h5 class="mod-service-tit mod-icons" :class="modServiceClass[i]">{{ i }}</h5>
              <p class="mod-service-txt">{{ item }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="mod-copy">
      <div class="mod-copy-inner clearfix">
        <div class="fl mod-copy-left">
          <!-- <div class="mod-copy-logo">
                    
                </div> -->
          <img src="@/assets/img/f-logo.webp" alt="SHOPPINGMAll">
        </div>
        <div class="fl mod-copy-right">
          <p class="footer-item">
            <span>©2022</span>
            <span>Private project</span>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { modService, modServiceClass } from "@/utils/common";
export default {
  data() {
    return {
      modService,
      modServiceClass,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./style/main-footer.scss";
</style>