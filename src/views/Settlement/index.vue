<template>
  <div class="settlement-page container">
    <page-header />
    <page-container />
    <page-footer />
  </div>
</template>
<script>
import PageHeader from "./pade-header.vue";
import PageContainer from "./page-container.vue";
import PageFooter from "./page-footer.vue";
export default {
  components: {
    PageHeader,
    PageContainer,
    PageFooter,
  },
};
</script>
