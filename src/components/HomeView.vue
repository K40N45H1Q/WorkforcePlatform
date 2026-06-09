<template>
  <main class="home" role="main">
    <div class="hero-glow" aria-hidden="true"></div>

    <section class="hero" aria-label="Hero">
      <div class="container hero-content">
        
        <div class="platform-badge">
          <span class="badge-dot"></span>
          Europe's Workforce Platform
        </div>

        <h1 class="hero-title">
          Connecting Talent<br>
          with <span class="text-accent">Opportunity</span>
        </h1>

        <p class="hero-subtitle">
          Thousands of verified jobs. Real employers. Better futures.
        </p>

        <div class="hero-actions" role="group" aria-label="Primary actions">
          <RouterLink to="/offers">
            <button class="btn btn-primary">
              I'm looking for work
              <svg class="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </RouterLink>

          <RouterLink to="/for_employers" custom v-slot="{ navigate }">
            <button class="btn btn-ghost" @click="navigate">
              I'm hiring workers
              <svg
                class="btn-arrow"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </RouterLink>
        </div>

        <div class="stats">
          <div class="stat-item">
            <div class="stat-icon-wrapper">
              <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
            </div>
            <span class="value">14,582</span>
            <span class="label">Active workers</span>
          </div>

          <div class="stat-item">
            <div class="stat-icon-wrapper">
              <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <span class="value">864</span>
            <span class="label">Verified employers</span>
          </div>

          <div class="stat-item">
            <div class="stat-icon-wrapper">
              <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <span class="value">2,114</span>
            <span class="label">Active jobs</span>
          </div>

          <div class="stat-item">
            <div class="stat-icon-wrapper">
              <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <span class="value">127</span>
            <span class="label">Hires this month</span>
          </div>
        </div>

      </div>
    </section>
  </main>
</template>

<style scoped>
.home {
  width: 100%;
  min-height: calc(100% - 80px);
  background-color: transparent;
  color: var(--color-text);
  position: relative;
}

.hero {
  width: 100%;
  padding-top: calc(var(--header-height) + 40px);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  z-index: 1;
}

.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 32px;
}

.platform-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-accent-dim);
  border: 1px solid rgba(0, 230, 118, 0.2);
  color: var(--color-accent);
  padding: 8px 16px;
  border-radius: 100px;
  font-size: clamp(11px, 2vw, 15px);
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background-color: var(--color-accent);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--color-accent);
  animation: pulse-dot 2s ease-in-out infinite;
}

.hero-title {
  margin: 0;
  font-size: clamp(29px, 5vw, 64px);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text);
}

.text-accent {
  color: var(--green);
  background: linear-gradient(135deg, #00E676 0%, #00C853 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  margin: 0;
  font-size: clamp(16px, 2vw, 15px);
  line-height: 1.6;
  color: var(--color-text-muted);
  max-width: 600px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
  margin-top: 8px;
  width: 100%;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 12px;
  padding: 16px 32px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  text-decoration: none;
  white-space: nowrap;
}

.btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.btn-ghost {
  background: var(--background) !important;
  color: var(--color-text);
  border: 2px solid rgba(0, 230, 119, 0.3) !important;
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 30px rgba(0, 230, 119, 0.20);
  border: 2px solid rgba(0, 230, 119) !important;
}

.btn-arrow {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover .btn-arrow {
  transform: translateX(4px);
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 100%;
  margin-top: 24px;
  padding-top: 40px;
  border-top: 1px solid var(--color-border);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 16px;
  border-radius: 16px;
  transition: background-color 0.2s ease;
}

.stat-item:hover {
  background-color: var(--silent-accent);
}

.stat-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--color-accent-dim);
  color: var(--color-accent);
  margin-bottom: 4px;
}

.stat-icon {
  width: 24px;
  height: 24px;
}

.stat-item .value {
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1;
  letter-spacing: -0.02em;
}

.stat-item .label {
  font-size: 14px;
  color: var(--color-text-muted);
  font-weight: 500;
  line-height: 1.4;
}

.hero-glow {
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  width: 80vw;
  max-width: 1000px;
  height: 600px;
  background: radial-gradient(circle at center, rgba(0, 230, 118, 0.08) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
  filter: blur(60px);
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.3); }
}

@media (max-width: 1024px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .stat-item {
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
    gap: 16px;
    padding: 20px;
  }
  
  .stat-icon-wrapper {
    margin-bottom: 0;
    flex-shrink: 0;
  }
}

@media (max-width: 640px) {
  .hero {
    padding-top: calc(var(--header-height) + 24px);
    padding-bottom: 48px;
  }

  .container {
    gap: 24px;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
    padding: 18px 24px;
    font-size: 16px;
  }

  .stats {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding-top: 24px;
  }

  .stat-item {
    flex-direction: column;
    text-align: center;
    padding: 16px 8px;
    gap: 6px;
  }
  
  .stat-icon-wrapper {
    width: 40px;
    height: 40px;
    margin-bottom: 4px;
  }
  
  .stat-icon {
    width: 20px;
    height: 20px;
  }

  .stat-item .value {
    font-size: 22px;
  }

  .stat-item .label {
    font-size: 12px;
  }
}

@media (max-width: 380px) {
  .stat-item {
    flex-direction: column;
    text-align: left;
  }
}
</style>