<template>
  <nav class="navbar" role="navigation" aria-label="Main navigation">
    <div class="container">
      <a href="/" class="logo" aria-label="Home">
        <img src="/logo.svg" alt="Logo" class="logo-icon" />
      </a>

      <div class="nav-actions">
        <a v-for="link in links" :key="link" href="#" class="nav-link">
          {{ link }}
        </a>

        <button class="btn btn-ghost" aria-label="Select language">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>EN</span>
        </button>

        <button class="btn btn-primary" aria-label="Sign in">
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
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="backdrop" :class="{ active: isMenuOpen }" @click="closeMenu"></div>

    <div class="nav-mobile" :class="{ active: isMenuOpen }">
      <a
        v-for="link in links"
        :key="link"
        href="#"
        class="nav-link"
        @click="closeMenu"
      >
        {{ link }}
      </a>

      <div class="mobile-actions">
        <button class="btn btn-ghost" @click="closeMenu">EN</button>
        <button class="btn btn-primary" @click="closeMenu">Sign in</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'

const isMenuOpen = ref(false)
const links = ['For workers', 'For employers', 'About us', 'Resources']

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
  --border: rgba(255, 255, 255, 0.15);
  --hover: rgba(255, 255, 255, 0.08);
  --h: 80px;

  height: var(--h);
  background: var(--bg);
  color: var(--text);
  position: relative;
  z-index: 50;
  border-bottom: 1px solid var(--border);
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

.logo-icon {
  height: 48px;
  width: auto;
  object-fit: contain;
  display: block;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--text);
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
  transition: all 0.2s;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  white-space: nowrap;
}

.btn:hover {
  background: var(--hover);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn .icon {
  width: 16px;
  height: 16px;
  opacity: 0.7;
  flex-shrink: 0;
}

.hamburger,
.nav-mobile,
.backdrop {
  display: none;
}

@media (max-width: 900px) {
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
    border: none;
    cursor: pointer;
    z-index: 60;
    padding: 0;
  }

  .hamburger span {
    display: block;
    width: 20px;
    height: 2px;
    background: var(--text);
    border-radius: 2px;
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hamburger.active span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  .backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
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
    background: var(--bg);
    border-left: 1px solid var(--border);
    padding: 90px 24px 24px;
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

  .nav-mobile .nav-link {
    font-size: 18px;
    font-weight: 500;
    padding: 16px 0;
    border-bottom: 1px solid var(--border);
  }
  
  .nav-mobile .nav-link:last-of-type {
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