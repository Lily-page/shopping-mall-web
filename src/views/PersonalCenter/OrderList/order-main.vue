<template>
    <section>
        <div class="personal-main">
            <order-table />
        </div>
    </section>
</template>
<script>
import OrderTable from './order-table.vue'
import OrderEmpty from './order-empty.vue';
export default {
    components: {
        OrderTable,
        OrderEmpty
    },
}
</script>
<style lang="scss" scoped>
@import '../style/order-list.scss';
</style>