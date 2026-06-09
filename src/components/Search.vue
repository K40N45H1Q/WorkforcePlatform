<template>
  <div class="job-board">
    <div class="filters">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass icon"></i>
        <input v-model="search" placeholder="Job title, skill, or company" />
      </div>
      <div class="filter-controls">
        <select v-model="country" class="select">
          <option value="">All countries</option>
          <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
        </select>
        <select v-model="category" class="select">
          <option value="">All categories</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
      <div class="sort-box">
        <span>Sort by:</span>
        <select v-model="sort" class="select">
          <option value="newest">Newest</option>
          <option value="salary">Salary</option>
        </select>
      </div>
    </div>

    <div class="job-list">
      <div v-for="job in paginatedJobs" :key="job.id" class="job-card">
        <div class="logo" :style="{background: job.color}">{{ job.initials }}</div>
        
        <div class="info">
          <h3>{{ job.title }}</h3>
          <p class="company">{{ job.company }}</p>
          <div class="meta">
            <span class="location">📍 {{ job.location }}</span>
            <span class="badge">{{ job.type }}</span>
            <span class="badge">{{ job.mode }}</span>
          </div>
        </div>

        <div class="actions">
          <div class="salary">€{{ job.salary.toLocaleString() }} <span class="period">/mo</span></div>
          <div class="btn-group">
            <button class="bookmark" title="Save job">
                <i class="fa-regular fa-bookmark"></i>
            </button>
            <button class="btn btn-primary">Apply now</button>
          </div>
        </div>
      </div>
      
      <div v-if="paginatedJobs.length === 0" class="no-results">
        No jobs found matching your criteria.
      </div>
    </div>

    <div class="pagination">
      <button @click="page--" :disabled="page===1">‹</button>
      <button v-for="p in pages" :key="p" :class="{active: page===p}" @click="page=p">{{ p }}</button>
      <span v-if="totalPages > 5 && page < totalPages - 2" class="dots">...</span>
      <button v-if="totalPages > 5 && page < totalPages - 1" @click="page = totalPages">{{ totalPages }}</button>
      <button @click="page++" :disabled="page===totalPages">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const jobs = ref([
  {id:1,title:'Welder (MIG/MAG)',company:'Liebherr Group',initials:'LG',color:'#1a1a2e',location:'Munich, Germany',type:'Full-time',mode:'On-site',salary:3200,country:'Germany',category:'Manufacturing'},
  {id:2,title:'Construction Electrician',company:'Siemens',initials:'SI',color:'#00a8e8',location:'Rotterdam, Netherlands',type:'Full-time',mode:'On-site',salary:2800,country:'Netherlands',category:'Construction'},
  {id:3,title:'Industrial Painter',company:'ABB',initials:'AB',color:'#e30613',location:'Wrocław, Poland',type:'Full-time',mode:'On-site',salary:2500,country:'Poland',category:'Manufacturing'},
  {id:4,title:'HVAC Technician',company:'Strabag',initials:'ST',color:'#c41e3a',location:'Vienna, Austria',type:'Full-time',mode:'On-site',salary:2800,country:'Austria',category:'Construction'},
  {id:5,title:'Mechanical Engineer',company:'Bosch',initials:'BO',color:'#ea0016',location:'Stuttgart, Germany',type:'Full-time',mode:'On-site',salary:4200,country:'Germany',category:'Engineering'},
  {id:6,title:'CNC Operator',company:'Schneider',initials:'SE',color:'#3dc759',location:'Grenoble, France',type:'Full-time',mode:'On-site',salary:2600,country:'France',category:'Manufacturing'},
  {id:7,title:'Quality Inspector',company:'Philips',initials:'PH',color:'#0e5fd8',location:'Amsterdam, Netherlands',type:'Full-time',mode:'On-site',salary:3100,country:'Netherlands',category:'Quality'},
  {id:8,title:'Maintenance Tech',company:'BASF',initials:'BA',color:'#000',location:'Ludwigshafen, Germany',type:'Full-time',mode:'On-site',salary:2900,country:'Germany',category:'Maintenance'},
  {id:9,title:'Safety Officer',company:'Shell',initials:'SH',color:'#ffd500',location:'The Hague, Netherlands',type:'Full-time',mode:'On-site',salary:3800,country:'Netherlands',category:'Safety'},
  {id:10,title:'Assembly Worker',company:'Volkswagen',initials:'VW',color:'#001e50',location:'Wolfsburg, Germany',type:'Full-time',mode:'On-site',salary:2700,country:'Germany',category:'Manufacturing'},
  {id:11,title:'Production Supervisor',company:'Nestlé',initials:'NE',color:'#004b87',location:'Vevey, Switzerland',type:'Full-time',mode:'On-site',salary:4500,country:'Switzerland',category:'Management'},
  {id:12,title:'Forklift Operator',company:'DHL',initials:'DH',color:'#ffcc00',location:'Bonn, Germany',type:'Full-time',mode:'On-site',salary:2400,country:'Germany',category:'Logistics'},
])

const search = ref('')
const country = ref('')
const category = ref('')
const sort = ref('newest')
const page = ref(1)
const perPage = 4

const countries = computed(() => [...new Set(jobs.value.map(j => j.country))])
const categories = computed(() => [...new Set(jobs.value.map(j => j.category))])

const filtered = computed(() => {
  let result = jobs.value.filter(j => {
    const matchSearch = !search.value || 
      j.title.toLowerCase().includes(search.value.toLowerCase()) || 
      j.company.toLowerCase().includes(search.value.toLowerCase()) ||
      j.category.toLowerCase().includes(search.value.toLowerCase())
    const matchCountry = !country.value || j.country === country.value
    const matchCategory = !category.value || j.category === category.value
    return matchSearch && matchCountry && matchCategory
  })
  
  if (sort.value === 'salary') {
    result = [...result].sort((a, b) => b.salary - a.salary)
  }
  
  return result
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const paginatedJobs = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))
const pages = computed(() => {
  const total = totalPages.value
  if (total <= 5) return Array.from({length: total}, (_, i) => i + 1)
  
  let start = Math.max(1, page.value - 2)
  let end = Math.min(total, page.value + 2)
  
  if (start === 1) end = 5
  if (end === total) start = total - 4
  
  return Array.from({length: end - start + 1}, (_, i) => start + i)
})

watch([search, country, category, sort], () => {
  page.value = 1
})
</script>

<style scoped>
.job-board {
  position: fixed;
  top: clamp(60px, 10vh, 80px);
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 1200px;
  margin: 0 auto;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  background-color: transparent;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(1rem, 2vw, 1.5rem) clamp(1rem, 3vw, 2rem) 0 clamp(1rem, 3vw, 2rem);
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 10;
}

.search-box {
  flex: 1 1 100%;
  min-width: 100%;
  position: relative;
}

@media (min-width: 640px) {
  .search-box {
    flex: 1 1 auto;
    min-width: clamp(220px, 30vw, 320px);
  }
}

.search-box .icon {
  position: absolute;
  left: clamp(0.75rem, 2vw, 1rem);
  top: 50%;
  transform: translateY(-50%);
  width: clamp(16px, 4vw, 18px);
  height: clamp(16px, 4vw, 18px);
  color: #64748b;
}

.search-box input {
  width: 100%;
  box-sizing: border-box;
  padding: clamp(0.6rem, 1.5vw, 0.75rem) 1rem clamp(0.6rem, 1.5vw, 0.75rem) 2.75rem;
  background: var(--background-transparent);
  border: 1px solid var(--accent-transparent);
  border-radius: 0.5rem;
  color: #fff;
  outline: none;
  font-size: clamp(0.8rem, 2vw, 0.875rem);
  transition: border-color 0.2s;
}

.search-box input:focus { border-color: #10b981; }

.filter-controls {
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  flex-wrap: wrap;
  flex: 1 1 100%;
}

@media (min-width: 640px) {
  .filter-controls {
    flex: 0 1 auto;
  }
}

.select {
  padding: clamp(0.6rem, 1.5vw, 0.75rem) 1rem;
  background: var(--background-transparent);
  border: 1px solid var(--accent-transparent);
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  outline: none;
  font-size: clamp(0.8rem, 2vw, 0.875rem);
  transition: border-color 0.2s;
  flex: 1;
}

@media (min-width: 640px) {
  .select {
    flex: 0 1 auto;
  }
}

.select:focus { border-color: #10b981; }

.sort-box {
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1.5vw, 0.75rem);
  margin-left: auto;
  color: var(--text-muted);
  font-size: clamp(0.8rem, 2vw, 0.875rem);
  flex: 1 1 100%;
  justify-content: center;
}

@media (max-width: 640px) {
  .sort-box {
    flex: 0 1 auto;
    justify-content: flex-start;
  }
}

.sort-box .select { min-width: clamp(110px, 15vw, 130px); }

.sort-box {
    display: none;
}


.job-list {
  flex: 1;
  overflow-y: auto;
  padding: clamp(1rem, 2vw, 1.5rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: clamp(0.75rem, 2vw, 1rem);
}

.job-list::-webkit-scrollbar { width: 6px; }
.job-list::-webkit-scrollbar-track { background: transparent; }
.job-list::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }

.job-card {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 
    "logo"
    "info"
    "actions";
  gap: clamp(0.75rem, 2vw, 1rem);
  align-items: center;
  padding: clamp(1rem, 2.5vw, 1.5rem);
  background-color: var(--card);
  border-radius: 0.75rem;
  border: 1px solid var(--accent-transparent);
  transition: transform 0.2s, border-color 0.2s;
  flex-shrink: 0; 
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .job-card {
    grid-template-columns: clamp(3rem, 5vw, 4.5rem) 1fr auto;
    grid-template-areas: "logo info actions";
    max-height: 160px;
  }
}

.job-card:hover {
  border-color: var(--accent);
  box-shadow: var(--glow);
}


.logo {
  grid-area: logo;
  width: clamp(3rem, 8vw, 4.5rem);
  height: clamp(3rem, 8vw, 4.5rem);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #fff;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  flex-shrink: 0;
}

.info {
  grid-area: info;
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 1vw, 0.35rem);
  min-width: 0;
}

.info h3 { 
  font-size: clamp(1rem, 2.5vw, 1.25rem); 
  margin: 0; 
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  color: var(--text);
  text-overflow: ellipsis;
}

.info .company { 
  color: var(--text-muted); 
  margin: 0; 
  font-size: clamp(0.8rem, 2vw, 0.875rem);
}

.meta {
  display: flex;
  gap: clamp(0.5rem, 1.5vw, 0.75rem);
  align-items: center;
  color: var(--text-muted);
  font-size: clamp(0.75rem, 2vw, 0.8rem);
  flex-wrap: wrap;
}

.badge {
  background: #0f172a;
  padding: clamp(0.2rem, 0.5vw, 0.25rem) clamp(0.4rem, 1vw, 0.6rem);
  border-radius: 0.25rem;
  font-size: clamp(0.7rem, 1.5vw, 0.75rem);
  white-space: nowrap;
}

.actions {
  grid-area: actions;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.5rem, 2vw, 1rem);
  width: 100%;
}

@media (min-width: 768px) {
  .actions {
    justify-content: flex-end;
    width: auto;
  }
}

.salary {
  font-weight: 700;
  color: var(--accent);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  white-space: nowrap;
}

.salary .period {
  font-size: clamp(0.75rem, 2vw, 0.8rem);
  color: #64748b;
  font-weight: 400;
}

.btn-group {
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1.5vw, 0.75rem);
}

.bookmark {
  background: transparent;
  color: var(--accent);
  border: none;
  cursor: pointer;
  font-size: clamp(1.25rem, 4vw, 1.7rem);
  padding: clamp(0.25rem, 1vw, 0.5rem);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bookmark:hover {
  background: var(--silent-accent);
}

.btn-primary {
  padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(0.8rem, 2vw, 0.875rem);
  white-space: nowrap;
}

.no-results {
  height: 100%;
  min-height: 200px;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: clamp(1.5rem, 5vw, 3rem);
  color: var(--text-muted);
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  text-align: center;
}

.pagination {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.25rem, 1vw, 0.5rem);
  justify-content: center;
  align-items: center;
  padding: clamp(1rem, 2vw, 1.25rem) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: var(--background-transparent);
  flex-shrink: 0;
}

.pagination button {
  padding: clamp(0.4rem, 1.5vw, 0.5rem);
  min-width: clamp(32px, 8vw, 38px);
  height: clamp(32px, 8vw, 38px);
  background: var(--card);
  border: 1px solid var(--accent-transparent);
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(0.75rem, 2vw, 0.875rem);
}

.pagination button:hover:not(:disabled) {
  border-color: var(--accent-transparent);
  color: #10b981;
}

.pagination button.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #0f172a;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(1.05);
  box-shadow: 0 4px 15px -3px var(--accent); 
}

.pagination button:not(.active):hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.05);
}

.pagination button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.dots {
  color: var(--text-muted);
  padding: 0 clamp(0.15rem, 0.5vw, 0.25rem);
  font-size: clamp(0.8rem, 2vw, 0.875rem);
}
</style>