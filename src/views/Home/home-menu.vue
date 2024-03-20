<template>
    <div class="home-menu">
        <div class="home-menu-item" v-for="(categoryItem, index) in categoryList" :key="index">
            <i class="iconfont home-menu-itenIcon" :class="categoryItem.icon"></i>
            <div class="home-menu-itemBar" v-for="(item, i) in categoryItem.type" :key="i">
                <router-link :to="{path:'/showTypeGoods',query:{name:item.name}}">{{item.name}}</router-link>
                <div>/</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                categoryList: []
            }
        },
        created() {
            this.getCategories()
        },
        methods: {
            async getCategories() {
                const res = await this.$http.get('/categories');
                this.categoryList = res.data[0].categories;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .home-menu {
        width: 21.5%;
    }

    .home-menu-item {
        display: flex;
        justify-content: flex-start;
        margin: 10px 10px 10px 20px;
    }

    /* .home-menu-itenIcon {
        margin-left: 20px;
    } */

    .home-menu-itemBar {
        display: flex;
        justify-content: flex-start;

        &:last-child {
            div {
                display: none;
            }
        }

    }

    .home-menu-itemBar>a {
        margin: 0 10px;
        color: rgb(102, 102, 102);

        &:hover {
            color: rgb(104, 147, 223);
        }
    }
</style>