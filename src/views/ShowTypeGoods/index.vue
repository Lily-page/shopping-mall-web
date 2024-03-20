<template>
    <div class="show-type-goods">
        <goods-list :goodsData="goodsList"></goods-list>
    </div>
</template>
<script>
    import GoodsList from '@/common/GoodsList'
    export default {
        components: {
            GoodsList
        },
        data() {
            return {
                goodsList: [],
            }
        },
        created() {
            this.getTypeGoods()
        },
        methods: {
            async getTypeGoods() {
                const res = await this.$http.post('/showTypeGoods', { type: this.$route.query.name })
                this.goodsList = res.data.map((item) => {
                    item.price = [item.price.split('.')[0], item.price.split('.')[1]]
                    return item
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .show-type-goods {
        margin: 0 auto;
        width: 1190px;
    }
</style>