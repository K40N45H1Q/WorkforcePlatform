<template>
  <div 
    class="carousel" 
    @touchstart.passive="handleTouchStart" 
    @touchend.passive="handleTouchEnd"
  >
    <button 
      class="nav left" 
      @click="goTo(activeIndex - 1)" 
      :style="{ display: activeIndex > 0 ? 'flex' : 'none' }"
      aria-label="Previous card"
    >
      <span class="nav-icon">&lt;</span>
    </button>
    
    <div 
      v-for="(card, i) in cardsData" 
      :key="i" 
      class="card-container" 
      :style="getCardStyle(i)"
      @click="goTo(i)"
    >
      <div class="card">
        <div class="card-content">
          <h2 class="title">{{ card.title }}</h2>
          <h3>Includes:</h3>
          <ul class="features-list">
            <li v-for="(feature, idx) in card.features" :key="idx">
              {{ feature }}
            </li>
          </ul>
        </div>
        <button class="price-btn">{{ card.price }}</button>
      </div>
    </div>

    <button 
      class="nav right" 
      @click="goTo(activeIndex + 1)" 
      :style="{ display: activeIndex < count - 1 ? 'flex' : 'none' }"
      aria-label="Next card"
    >
      <span class="nav-icon">&gt;</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const cardsData = [
  {
    title: 'Basic',
    features: ['Up to 5 job postings', 'Basic search visibility', 'Receive applications', 'Employer profile'],
    price: '59€ / month'
  },
  {
    title: 'Standard',
    features: ['Everything from Basic', 'Social media posts', 'Up to 10 job postings'],
    price: '89€ / month'
  },
  {
    title: 'Pro',
    features: ['Everything from Standard', 'Priority in search', 'Up to 20 job postings', 'VIP support'],
    price: '129€ / month'
  }
]

const activeIndex = ref(1)
const count = computed(() => cardsData.length)
const MAX_VISIBILITY = 3

const getCardStyle = (i) => {
  const offset = (activeIndex.value - i) / 3
  const direction = Math.sign(activeIndex.value - i)
  const absOffset = Math.abs(activeIndex.value - i) / 3
  const isActive = i === activeIndex.value ? 1 : 0
  const distance = Math.abs(activeIndex.value - i)
  
  return {
    '--active': isActive,
    '--offset': offset,
    '--direction': direction,
    '--abs-offset': absOffset,
    pointerEvents: isActive ? 'auto' : 'none',
    opacity: distance >= MAX_VISIBILITY ? '0' : '1',
    display: distance > MAX_VISIBILITY ? 'none' : 'block'
  }
}

const goTo = (idx) => {
  if (idx < 0) idx = 0
  if (idx >= count.value) idx = count.value - 1
  activeIndex.value = idx
}

let startX = null
const handleTouchStart = (e) => { startX = e.touches[0].clientX }
const handleTouchEnd = (e) => {
  if (startX === null) return
  const dx = e.changedTouches[0].clientX - startX
  if (dx > 50) goTo(activeIndex.value - 1)
  else if (dx < -50) goTo(activeIndex.value + 1)
  startX = null
}

const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') goTo(activeIndex.value - 1)
  if (e.key === 'ArrowRight') goTo(activeIndex.value + 1)
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
.carousel {
  --card-size: clamp(280px, 35vw, 400px);
  --z-offset: -24rem;
  --x-offset: -5rem;
  --blur-size: 1rem;
  
  --card-bg: #161B22;
  --text: #ffffff;
  --accent: #00E676;
  
  position: relative;
  width: var(--card-size);
  height: var(--card-size);
  perspective: 800px;
  transform-style: preserve-3d;
  margin: 2rem auto;
}

.card-container {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: 
    rotateY(calc(var(--offset) * 50deg)) 
    scaleY(calc(1 + var(--abs-offset) * -0.4))
    translateZ(calc(var(--abs-offset) * var(--z-offset)))
    translateX(calc(var(--direction) * var(--x-offset)));
  filter: blur(calc(var(--abs-offset) * var(--blur-size)));
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card {
  width: 100%;
  height: 100%;
  padding: clamp(1rem, 4vw, 1rem);
  background: var(--color-bg);
  border-radius: clamp(0.75rem, 2vw, 1rem);
  color: var(--text);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  border: 2px solid var(--accent);
  box-shadow: 0px 0px 15px 5px rgba(0, 230, 119, 0.3);
  box-sizing: border-box;
}

.card-content {
  text-align: justify;
}

.card .title {
  text-align: center;
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: bold;
  margin: 0 0 0.5em;
  color: var(--accent);
}

.card h3 {
  margin-bottom: 0.5em;
  color: var(--accent);
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  margin-bottom: 0.4em;
  font-size: clamp(0.8rem, 2vw, 0.95rem);
  line-height: 1.4;
  opacity: 0.9;
  position: relative;
  padding-left: 1.2em;
}

.features-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: bold;
}

.price-btn {
  width: 100%;
  margin-top: auto;
  padding: clamp(10px, 3vw, 14px) 0;
  border: 0;
  border-radius: clamp(6px, 2vw, 10px);
  background: var(--accent);
  color: var(--text);
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.price-btn:hover {
  background: var(--accent);
  box-shadow: 0 0 18px rgba(0, 230, 119, 0.3);
}

.price-btn:active {
  transform: scale(0.98);
}

.card-content, .price-btn {
  transition: opacity 0.3s ease-out;
  opacity: var(--active);
}

.nav {
  color: var(--text);
  font-size: clamp(2.5rem, 8vw, 5rem);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  z-index: 10;
  cursor: pointer;
  user-select: none;
  background: transparent;
  border: none;
  transition: all 0.2s ease;
  padding: 0 10px;
  width: 1em;
  height: 1em;
  opacity: 0.5;
}

.nav-icon {
  display: block;
  font-size: 0.6em;
  line-height: 1;
  font-weight: bold;
}

.nav:hover {
  color: var(--accent);
  transform: translateY(-50%) scale(1.15);
}

.nav.left {
  left: 0;
  transform: translateX(-100%) translateY(-50%);
}

.nav.right {
  right: 0;
  transform: translateX(100%) translateY(-50%);
}

@media (max-width: 992px) {
  .carousel {
    --card-size: clamp(280px, 45vw, 360px);
    --z-offset: -20rem;
    --x-offset: -4rem;
  }
  .nav.left { transform: translateX(-80%) translateY(-50%); }
  .nav.right { transform: translateX(80%) translateY(-50%); }
}

@media (max-width: 768px) {
  .carousel {
    --card-size: clamp(280px, 75vw, 340px);
    --z-offset: -16rem;
    --x-offset: -3rem;
    --blur-size: 0.6rem;
  }
  
  .nav { 
    font-size: 2.5rem; 
  }
  .nav.left { left: -15px; transform: translateX(-100%) translateY(-50%); }
  .nav.right { right: -15px; transform: translateX(100%) translateY(-50%); }
}

@media (max-width: 414px) {
  .carousel {
    --card-size: 85vw;
    --z-offset: -12rem;
    --x-offset: -2rem;
  }
  
  .card {
    padding: 1.2rem;
  }
  
  .nav { 
    font-size: 2rem; 
  }
  .nav.left { 
    left: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%); 
    background: rgba(0,0,0,0.3);
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  .nav.right { 
    right: 5px; 
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%); 
    background: rgba(0,0,0,0.3);
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
}
</style>