<template>
    <div class="search-goods">
        <div class="success-top">
            <h3 class="succ-title">为你找到以下商品 &gt; &gt; &gt;</h3>
        </div>
        <goods-list :goodsData="goodsList"></goods-list>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import GoodsList from '@/common/GoodsList'
    export default {
        components: {
            GoodsList
        },
        data() {
            return {
                goodsList: [],
                searchValue: ''
            }
        },
        computed: {
            ...mapState(['searchList']),
        },
        created() {
            this.getGoodsList()
        },
        watch: {
            $route() {
                this.searchValue = this.$route.query.searchValue;
            },
            searchList: {
                handler() {
                    this.getGoodsList()
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            getGoodsList() {
                this.goodsList = this.searchList.map((item) => {
                    item.price = [item.price.split('.')[0], item.price.split('.')[1]]
                    return item
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .search-goods {
        margin: 0 auto;
        width: 1190px;
    }
    .success-top {
        position: relative;
        padding-left: 35px;
        margin: 20px 0;
    }

    .succ-title {
        font-size: 18px;
        line-height: 25px;
        font-weight: 400;
        /* color: #999; */
    }
</style>