<template>
  <nav class="navbar" role="navigation" aria-label="Главная навигация">
    <div class="container">
      <RouterLink to="/" class="logo" aria-label="На главную">
        <img src="/logo.svg" alt="Logo" class="logo-icon" />
      </RouterLink>

      <div class="nav-actions">
        <RouterLink
          v-for="link in links"
          :key="link.text"
          :to="link.to"
          class="nav-link"
          active-class="nav-link-active"
        >
          {{ link.text }}
        </RouterLink>

        <button class="btn btn-ghost" aria-label="Выбрать язык">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>EN</span>
        </button>

        <button class="btn btn-primary" aria-label="Войти в аккаунт">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10,17 15,12 10,7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          Sign in
        </button>
      </div>

      <button
        class="hamburger"
        :class="{ active: isMenuOpen }"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        aria-label="Открыть меню"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="backdrop" :class="{ active: isMenuOpen }" @click="closeMenu"></div>

    <div id="mobile-menu" class="nav-mobile" :class="{ active: isMenuOpen }">
      <RouterLink
        v-for="(link, index) in links"
        :key="link.text"
        :to="link.to"
        class="nav-link-mobile"
        :style="{ transitionDelay: `${index * 50}ms` }"
        @click="closeMenu"
      >
        {{ link.text }}
      </RouterLink>

      <div class="mobile-actions">
        <button class="btn btn-ghost" @click="closeMenu">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          EN
        </button>
        <button class="btn btn-primary" @click="closeMenu">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10,17 15,12 10,7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          Sign in
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

const links = [
  { text: 'For workers', to: '/' },
  { text: 'For employers', to: '/employers' },
  { text: 'About us', to: '/about' },
  { text: 'Resources', to: '/resources' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

watch(isMenuOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})
</script>

<style scoped>
.navbar {
  --bg: #0a0a0a;
  --text: #ffffff;
  --text-muted: #b0b0b0;
  --accent: #00e677;
  --border: rgba(255, 255, 255, 0.15);
  --h: 80px;

  height: var(--h);
  background: var(--alpha-background);
  color: var(--text);
  position: relative;
  z-index: 50;
  border-bottom: 1px solid rgba(0, 230, 119, 0.3);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-icon {
  /* Размеры и позиционирование */
  display: block;
  height: 50px;
  width: auto;

  /* Идеальная чёткость и рендеринг */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  shape-rendering: geometricPrecision;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  position: relative;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--accent);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: center;
}

.nav-link-active::after {
  transform: scaleX(1);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover {
  color: var(--text);
}

.nav-link-active {
  color: var(--accent) !important;
  font-weight: 600;
}

.nav-link-active::after {
  transform: scaleX(1);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 1px solid rgba(0, 230, 119, 0.3);
  background: transparent;
  color: var(--text);
  white-space: nowrap;
}

.btn:hover {
  border-color: var(--accent);
  background: rgba(0, 230, 119, 0.08);
  box-shadow: 0 4px 20px rgba(0, 230, 119, 0.25);
}

.btn .icon {
  width: 16px;
  height: 16px;
  opacity: 0.8;
  flex-shrink: 0;
}

.hamburger,
.nav-mobile,
.backdrop {
  display: none;
}

@media (max-width: 1000px) {
  .nav-actions {
    display: none;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 40px;
    height: 40px;
    background: none;
    border: 1px solid rgba(0, 230, 119, 0.3);
    border-radius: 8px;
    cursor: pointer;
    z-index: 60;
    padding: 0;
    transition: border-color 0.2s;
    outline: none;
  }
  
  .hamburger:hover {
    border-color: var(--accent);
  }

  .hamburger span {
    display: block;
    width: 20px;
    height: 2px;
    background: var(--accent);
    border-radius: 2px;
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hamburger.active span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }

  .hamburger.active span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  .backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 45;
  }

  .backdrop.active {
    opacity: 1;
    pointer-events: auto;
  }

  .nav-mobile {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 85vw;
    max-width: 320px;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    border-left: 1px solid var(--border);
    padding: 100px 24px 32px;
    gap: 0;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    z-index: 50;
    overflow-y: auto;
  }

  .nav-mobile.active {
    transform: translateX(0);
    pointer-events: auto;
  }

  .nav-link-mobile {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    padding: 16px 0;
    border-bottom: 1px solid var(--border);
    opacity: 0;
    transform: translateX(20px);
    transition: opacity 0.3s ease, transform 0.3s ease, color 0.2s;
  }

  .nav-mobile.active .nav-link-mobile {
    opacity: 1;
    transform: translateX(0);
  }

  .nav-link-mobile:hover,
  .nav-link-mobile.nav-link-active {
    color: var(--accent);
  }
  
  .nav-link-mobile:last-of-type {
    border-bottom: none;
  }

  .mobile-actions {
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-top: auto;
    padding-top: 24px;
  }

  .mobile-actions .btn {
    width: 100%;
    justify-content: center;
    padding: 14px;
    font-size: 16px;
  }
}
</style>