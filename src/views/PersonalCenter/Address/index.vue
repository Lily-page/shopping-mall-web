<template>
  <div>
      <address-header/>
      <address-box/>
  </div>
</template>
<script>
import AddressHeader from "./address-header.vue";
import AddressBox from "./address-box.vue";
export default {
  components: {
    AddressHeader,
    AddressBox,
  }
};
</script>
