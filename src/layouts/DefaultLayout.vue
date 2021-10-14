<template>
  <navbar type="is-success" text-class="has-text-white" class="fixed-top"></navbar>
  <main>
    <slot></slot>
  </main>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  components: { Navbar },
}
</script>

<style scoped>
.fixed-top {
    position: sticky;
    top: 0;
    z-index: 50;
}

main {
    position: relative;
}
</style>