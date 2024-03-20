<template>
    <div class="home-nav">
        <div class="nav-left">
            <h2>主题市场</h2>
        </div>
        <!-- <div class="nav-right">
            <a href="">SHOPPING国际</a>
            <a href="">SHOPPING会员</a>
            <a href="">SHOPPING生鲜</a>
            <a href="">医药馆</a>
            <a href="">优惠购</a>
        </div> -->
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="scss" scoped>
   .home-nav {
        height: 43px;
        line-height: 43px;
        padding-left: 1.5%;
        display: flex;
        justify-content: flex-start;
    }

    .nav-left {
        width: 18%;
    }

    .nav-right a {
        color: #000;
        margin-right: 10px;

        &:hover {
            color: rgb(0, 159, 232);
        }
    }
</style>