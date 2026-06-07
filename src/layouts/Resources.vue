<template>
    <div>
        <Ticker />
    </div>
</template>

<style scoped>
div {
    display: flex;
    height: calc(100% - 80px);
    align-items: center;
    justify-content: center;
    color: #00E676;
}
</style>

<!-- Добавлено слово setup -->
<script setup>
import Ticker from '@/components/Ticker.vue';
</script>