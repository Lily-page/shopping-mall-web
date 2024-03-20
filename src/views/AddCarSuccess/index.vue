<template>
    <div class="add-car-success">
        <div v-if="$route.params.img && $route.params.name">
            <div class="success-left">
                <div class="success-top">
                    <b class="succ-icon"></b>
                    <h3 class="succ-title">商品已成功加入购物车！</h3>
                </div>
                <div class="content-item">
                    <div class="content-img">
                        <a><img :src="$route.params.img" alt=""></a>
                    </div>
                    <div class="content-info">
                        <div class="content-name">{{$route.params.name}}</div>
                        <!-- <div class="content-extra"></div> -->
                    </div>
                </div>
            </div>
            <div class="success-btns">
                <div class="success-ad">
                    <a href="#none"></a>
                </div>
                <div class="clr"></div>
                <div>
                    <a class="content-to-detail" @click="toDetail()">&lt; 查看商品详情</a>
                    <a class="content-to-car" @click="toCar()">
                        <b></b>
                        去购物车结算
                    </a>
                </div>
            </div>
        </div>
        <div v-else>
            哦豁，页面丢失了！
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            toDetail() {
                const id = this.$route.params.id;
                this.$router.push({
                    path: `goodsDetail?goodsId=${id}`
                })
            },
            toCar() {
                this.$router.push({
                    path: '/carDetail'
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .add-car-success {
        width: 80%;
        margin-left: 10%;
        display: block;
        font-family: "Microsoft YaHei";

        &:after {
            content: ".";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
    }

    .success-top {
        position: relative;
        padding-left: 35px;
        margin: 20px 0;
    }

    .succ-icon {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 25px;
        height: 25px;
        overflow: hidden;
        background: url(//misc.360buyimg.com/user/cart/widget/addtocart-201608/i/addtocart-icons.png) 0 0 no-repeat;
    }

    .succ-title {
        font-size: 18px;
        line-height: 25px;
        font-weight: 400;
        color: #71b247;
    }

    .content-img {
        float: left;
        width: 80px;
        margin-right: 10px;
        border: 1px solid #e8e8e8;

        img {
            width: 100%;
            border: 0;
            vertical-align: middle;
        }
    }

    a {
        color: #666;
        text-decoration: none;
    }

    .content-info {
        float: left;
        width: 520px;
        margin: 0;
    }

    .content-name {
        width: 100%;
        line-height: 28px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
    }

    .content-extra {
        display: inline-block;
        display: block;
        color: #aaa;
    }

    .clr {
        display: block;
        overflow: hidden;
        clear: both;
        height: 0;
        line-height: 0;
        font-size: 0;
    }

    .success-btns {
        float: right;
        font-size: 0;
        overflow: hidden;
    }

    .success-ad {
        float: right;
        height: 70px;
        width: 106px;
        margin: 10px 0;
    }

    .content-to-detail {
        display: inline-block;
        height: 34px;
        line-height: 36px;
        font-size: 16px;
        vertical-align: middle;
        padding: 0 30px;
        margin-right: 10px;
        background: #fff;
        color: #E2231A;
        border: 1px solid #fff;
        margin-bottom: 20px;

        &:hover {
            border: 1px solid #E2231A;
        }
    }

    .content-to-car {
        display: inline-block;
        height: 34px;
        line-height: 36px;
        font-size: 16px;
        vertical-align: middle;
        position: relative;
        width: 136px;
        padding-left: 30px;
        background: #E2231A;
        border: 1px solid #E2231A;
        color: #fff;
        margin-bottom: 20px;

       b {
            position: absolute;
            top: 8px;
            right: 15px;
            width: 10px;
            height: 20px;
            overflow: hidden;
            background: url(//misc.360buyimg.com/user/cart/widget/addtocart-201608/i/addtocart-icons.png) -20px -81px no-repeat;
        }
    }
</style>