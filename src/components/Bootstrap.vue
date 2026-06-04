<script setup>
import HomeView from './HomeView.vue';
import Navbar from './Navbar.vue';
import Carousel from './Carousel.vue';
</script>

<template>
  <Navbar />
  <HomeView />
  <div class="wrap">
    <Carousel />
  </div>
</template>

<style>

.wrap {
  display: flex;
}

</style>