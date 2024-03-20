<template>
    <div>
        <order-nav></order-nav>
        <order-main></order-main>
    </div>
</template>
<script>
import OrderNav from './order-nav.vue';
import orderMain from './order-main.vue'
export default {
    components: {
        OrderNav,
        orderMain
    }
}
</script>