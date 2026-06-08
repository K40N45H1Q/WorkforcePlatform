<template>
  <div class="page">
    <form class="card" @submit.prevent="submit">
      <h1 class="title">Continue to your account</h1>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="input"
      />

      <div class="password">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          class="input"
        />

        <button
          type="button"
          class="toggle"
          @click="showPassword = !showPassword"
        >
          <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
        </button>
      </div>

      <button type="submit" class="btn btn-primary">
        Sign in
      </button>

      <RouterLink to="/signup" class="link">
        Create an account
      </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const submit = () => {
  console.log(email.value, password.value)
}
</script>

<style scoped>
.page {
  min-height: calc(100% - 80px);
  display: grid;
  place-items: center;
  padding: 24px;
}

.card {
  width: 100%;
  max-width: 380px;
  padding: 28px;
  border-radius: 16px;

  background: var(--background-transparent);
  border: 1px solid rgba(255, 255, 255, 0.06);

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

  display: grid;
  gap: 20px;
  border: solid 2px rgba(0, 230, 119, 0.9);
  box-shadow: 0px 0px 15px 5px rgba(0, 230, 119, 0.15);

}

.title {
  margin: 0 0 6px;
  font-size: clamp(15px, 2vw, 22px);
  font-weight: 600;
  color: #e5e7eb;
  letter-spacing: -0.02em;
  text-align: center;
}

.input {
  width: 100%;
  padding: 12px 14px;

  border-radius: 10px;
  border: 1px solid rgba(0, 230, 119, 0.3);
  background: var(--background-transparent);

  color: #e5e7eb;
  outline: none;

  transition: 0.2s ease;
}

.input:focus {
  border-color: var(--color-accent);
  background: rgba(0, 230, 119, 0.08);
  box-shadow: 0 4px 20px rgba(0, 230, 119, 0.25);
}

.password {
  position: relative;
  display: grid;
}

.password .input {
  padding-right: 44px;
}

.toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  border: none;
  background: transparent;

  cursor: pointer;
  padding: 6px;

  color: rgba(229, 231, 235, 0.6);

  display: grid;
  place-items: center;

  transition: 0.2s ease;
}

.toggle:hover {
  color: #e5e7eb;
}

.toggle i {
  font-size: 14px;
}

.link {
  text-align: center;
  font-size: 13px;
  color: rgba(229, 231, 235, 0.7);
  text-decoration: none;
  margin-top: 4px;
}

.link:hover {
  color: #e5e7eb;
}

.btn {
    padding: 12px 14px;
}
</style>