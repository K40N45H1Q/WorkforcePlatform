<script setup>
import Navbar from './Navbar.vue';
import Net from './Net.vue';
</script>

<template>
  <Net />
  <Navbar />
  <Transition name="page-fall" mode="out-in">
    <router-view />
  </Transition>
</template>


<style scoped>

.page-fall-enter-active,
.page-fall-leave-active {
  transition: all 0.5s ease;
}

.page-fall-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.page-fall-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.page-fall-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.page-fall-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

</style>