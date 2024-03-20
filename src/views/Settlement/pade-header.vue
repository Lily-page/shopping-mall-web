<template>
  <section class="page-header clearfix">
    <div class="fl page-logo">
      <router-link to="/home">
        <img src="@/assets/img/s-logo.webp" />
      </router-link>
    </div>
    <el-steps
      class="fr settlement-step"
     
      :active="1"
      finish-status="success"
      align-center
    >
      <el-step title="我的购物车"></el-step>
      <el-step title="填写核对订单信息"></el-step>
      <el-step title="成功提交订单"></el-step>
    </el-steps>
  </section>
</template>
<style lang="scss" scoped>
@import "./style/index.scss";
</style>
