<template>
  <div class="particle-container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
.particle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const CONFIG = {
  // Background opacity: 0 = transparent (particles visible), 1 = black (hides particles)
  backgroundOpacity: 0,
  
  // Particle and line colors
  colors: {
    particle: { r: 0, g: 230, b: 118 },
    line: { r: 0, g: 230, b: 118 }
  },
  // Particle settings
  particles: {
    density: 0.06,
    minCount: 15,
    maxCount: 400,
    speed: 10,
    minSize: 1.5,
    maxSize: 5.5,
    minAlpha: 0.7,
    maxAlpha: 1.0,
    mouseRepelForce: 0.6
  },
  // Connection line settings
  connections: {
    distance: 200,
    lineWidth: 1,
    maxOpacity: 0.3
  },
  // Mouse interaction radius
  mouse: {
    radius: 150
  }
};

const canvasRef = ref(null);
let animationFrameId = null;
let particles = [];
let ctx = null;

const mouse = { x: undefined, y: undefined, active: false };

const getParticleCount = () => {
  const canvas = canvasRef.value;
  if (!canvas) return CONFIG.particles.minCount;
  
  const area = (canvas.width * canvas.height) / 1000;
  let count = Math.floor(area * CONFIG.particles.density);
  
  return Math.max(CONFIG.particles.minCount, Math.min(CONFIG.particles.maxCount, count));
};

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * (CONFIG.particles.maxSize - CONFIG.particles.minSize) + CONFIG.particles.minSize;
    this.alpha = Math.random() * (CONFIG.particles.maxAlpha - CONFIG.particles.minAlpha) + CONFIG.particles.minAlpha;
    this.baseSpeedX = (Math.random() - 0.5);
    this.baseSpeedY = (Math.random() - 0.5);
  }
  
  update() {
    const speed = CONFIG.particles.speed * 0.1;
    this.x += this.baseSpeedX * speed;
    this.y += this.baseSpeedY * speed;
    
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
    
    if (mouse.active) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < CONFIG.mouse.radius) {
        const force = (CONFIG.mouse.radius - distance) / CONFIG.mouse.radius;
        this.x -= (dx / distance) * force * CONFIG.particles.mouseRepelForce;
        this.y -= (dy / distance) * force * CONFIG.particles.mouseRepelForce;
      }
    }
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${CONFIG.colors.particle.r}, ${CONFIG.colors.particle.g}, ${CONFIG.colors.particle.b}, ${this.alpha})`;
    ctx.fill();
  }
}

const connectParticles = () => {
  ctx.lineWidth = CONFIG.connections.lineWidth;
  
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < CONFIG.connections.distance) {
        const opacity = 1 - (distance / CONFIG.connections.distance);
        ctx.strokeStyle = `rgba(${CONFIG.colors.line.r}, ${CONFIG.colors.line.g}, ${CONFIG.colors.line.b}, ${opacity * CONFIG.connections.maxOpacity})`;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
};

const drawBackground = () => {
  if (CONFIG.backgroundOpacity > 0) {
    ctx.fillStyle = `rgba(0, 0, 0, ${CONFIG.backgroundOpacity})`;
    ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  }
};

const animate = () => {
  if (!canvasRef.value) return;
  
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  connectParticles();
  
  drawBackground();
  
  animationFrameId = requestAnimationFrame(animate);
};

const initParticles = () => {
  particles = [];
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const count = getParticleCount();
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(canvas));
  }
};

const handleResize = () => {
  if (!canvasRef.value) return;
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
  initParticles();
};

const handleMouseMove = (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  mouse.active = true;
};

const handleMouseOut = () => { mouse.active = false; };

const handleTouchMove = (e) => {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    mouse.active = true;
  }
};

const handleTouchEnd = () => { mouse.active = false; };

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  initParticles();
  
  window.addEventListener('resize', handleResize);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseout', handleMouseOut);
  window.addEventListener('touchmove', handleTouchMove);
  window.addEventListener('touchend', handleTouchEnd);
  
  animate();
});

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseout', handleMouseOut);
  window.removeEventListener('touchmove', handleTouchMove);
  window.removeEventListener('touchend', handleTouchEnd);
  
  particles = [];
});
</script>