<template>
  <div class="loader-wrapper">
    <div class="loader-animation">
      <span
        v-for="i in count"
        :key="i"
        class="loader-bar"
        :style="{ animationDelay: `${i * delay}s` }"
      />
    </div>
    <p class="loader-text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 20
  },
  color: {
    type: String,
    default: '#00E676'
  },
  size: {
    type: Number,
    default: 7.5
  },
  text: {
    type: String,
    default: 'Loading'
  },
  delay: {
    type: Number,
    default: 0.05
  }
})
</script>

<style scoped>
.loader-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
}

.loader-animation {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-bar {
  display: inline-block;
  width: v-bind('size + "px"');
  height: v-bind('size + "px"');
  background-color: v-bind('color');
  margin: 0 2px;
  animation: temp 1s infinite cubic-bezier(0.005, 0.560, 0.580, 1.590);
}

.loader-text {
  color: v-bind('color');
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  margin: 0;
}

@keyframes temp {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 5);
    filter: brightness(0.8);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>