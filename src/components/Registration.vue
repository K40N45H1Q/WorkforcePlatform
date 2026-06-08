<template>
  <div class="page">
    <form class="card" @submit.prevent="submit" novalidate>
      <h1 class="title">Create your account</h1>

      <!-- Email Field -->
      <div class="field">
        <input
          v-model="email"
          type="email"
          placeholder="Email address"
          class="input"
          :class="{ 'error': isEmailTouched && !isEmailValid }"
          @blur="isEmailTouched = true"
          autocomplete="email"
        />
        <span v-if="isEmailTouched && !isEmailValid" class="error-msg">
          Please enter a valid email address
        </span>
      </div>

      <!-- Password Field -->
      <div class="field">
        <div class="password-wrapper">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="input"
            :class="{ 'error': isPasswordTouched && !isPasswordValid }"
            @blur="isPasswordTouched = true"
            autocomplete="new-password"
          />
          <button
            type="button"
            class="toggle"
            @click="showPassword = !showPassword"
            aria-label="Toggle password visibility"
          >
            <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
          </button>
        </div>

        <!-- Password Requirements Checklist с анимацией растягивания -->
        <Transition name="expand">
          <div v-show="showRequirements" class="requirements-wrapper">
            <div class="requirements">
              <div class="req-item" :class="{ valid: checks.length }">
                <i class="fa-solid" :class="checks.length ? 'fa-check' : 'fa-xmark'"></i>
                <span>At least 8 characters</span>
              </div>
              <div class="req-item" :class="{ valid: checks.uppercase }">
                <i class="fa-solid" :class="checks.uppercase ? 'fa-check' : 'fa-xmark'"></i>
                <span>One uppercase letter</span>
              </div>
              <div class="req-item" :class="{ valid: checks.lowercase }">
                <i class="fa-solid" :class="checks.lowercase ? 'fa-check' : 'fa-xmark'"></i>
                <span>One lowercase letter</span>
              </div>
              <div class="req-item" :class="{ valid: checks.number }">
                <i class="fa-solid" :class="checks.number ? 'fa-check' : 'fa-xmark'"></i>
                <span>One number</span>
              </div>
              <div class="req-item" :class="{ valid: checks.special }">
                <i class="fa-solid" :class="checks.special ? 'fa-check' : 'fa-xmark'"></i>
                <span>One special character (!@#$%^&*)</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Confirm Password Field -->
      <div class="field">
        <div class="password-wrapper">
          <input
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirm password"
            class="input"
            :class="{ 'error': isConfirmTouched && !doPasswordsMatch }"
            @blur="isConfirmTouched = true"
            autocomplete="new-password"
          />
          <button
            type="button"
            class="toggle"
            @click="showConfirmPassword = !showConfirmPassword"
            aria-label="Toggle confirm password visibility"
          >
            <i :class="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
          </button>
        </div>
        <span v-if="isConfirmTouched && !doPasswordsMatch" class="error-msg">
          Passwords do not match
        </span>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit"
        class="btn btn-primary"
        :disabled="!isFormValid || isSubmitting"
      >
        <span v-if="isSubmitting" class="spinner"></span>
        <span v-else>Sign up</span>
      </button>

      <RouterLink to="/signin" class="link">
        Already have an account? <span class="link-accent">Sign in</span>
      </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isSubmitting = ref(false)

const isEmailTouched = ref(false)
const isPasswordTouched = ref(false)
const isConfirmTouched = ref(false)

// Показывать требования только при фокусе или вводе пароля
const showRequirements = computed(() => {
  return isPasswordTouched.value || password.value.length > 0
})

const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value)
})

const checks = computed(() => ({
  length: password.value.length >= 8,
  uppercase: /[A-Z]/.test(password.value),
  lowercase: /[a-z]/.test(password.value),
  number: /\d/.test(password.value),
  special: /[^A-Za-z0-9]/.test(password.value)
}))

const isPasswordValid = computed(() => {
  const c = checks.value
  return c.length && c.uppercase && c.lowercase && c.number && c.special
})

const doPasswordsMatch = computed(() => {
  return password.value === confirmPassword.value && confirmPassword.value !== ''
})

const isFormValid = computed(() => {
  return isEmailValid.value && isPasswordValid.value && doPasswordsMatch.value
})

const submit = async () => {
  if (!isFormValid.value) return
  
  isSubmitting.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Registration successful:', { email: email.value, password: password.value })
  } catch (error) {
    console.error('Registration failed', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.page {
  min-height: calc(100vh - 80px);
  display: grid;
  place-items: center;
  padding: 24px;
}

.card {
  width: 100%;
  max-width: 400px;
  padding: 32px;
  border-radius: 16px;
  background: var(--background-transparent);
  border: 2px solid var(--accent);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 230, 119, 0.05);
  display: grid;
  gap: 16px;
}

.title {
  margin: 0 0 8px;
  font-size: clamp(18px, 3vw, 24px);
  font-weight: 700;
  color: #e5e7eb;
  letter-spacing: -0.02em;
  text-align: center;
}

.field {
  display: grid;
  gap: 6px;
}

.input {
  width: 100%;
  padding: 12px 44px 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  color: #e5e7eb;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.input::placeholder {
  color: rgba(229, 231, 235, 0.4);
}

.input:focus {
  border-color: #00E677;
  background: rgba(0, 230, 119, 0.05);
  box-shadow: 0 0 0 3px rgba(0, 230, 119, 0.1);
}

.input.error {
  border-color: #ff4d4f;
  background: rgba(255, 77, 79, 0.05);
  box-shadow: 0 0 0 3px rgba(255, 77, 79, 0.1);
}

.input.error:focus {
  border-color: #ff4d4f;
  box-shadow: 0 0 0 3px rgba(255, 77, 79, 0.15);
}

.password-wrapper {
  position: relative;
  display: grid;
}

.toggle {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 8px;
  color: rgba(229, 231, 235, 0.4);
  display: grid;
  place-items: center;
  transition: color 0.2s ease;
}

.toggle:hover {
  color: #e5e7eb;
}

/* Анимация растягивания высоты */
.expand-enter-active,
.expand-leave-active {
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 300px; /* Достаточно большое значение для контента */
  margin-top: 4px;
  margin-bottom: 0;
}

.requirements {
  display: grid;
  gap: 6px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: 4px;
}

.req-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(229, 231, 235, 0.5);
  transition: color 0.2s ease;
}

.req-item.valid {
  color: #00E677;
}

.req-item i {
  font-size: 10px;
  width: 14px;
  text-align: center;
  transition: transform 0.2s ease;
}

.req-item.valid i {
  transform: scale(1.1);
}

.error-msg {
  font-size: 12px;
  color: #ff4d4f;
  padding-left: 4px;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.btn {
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: #00E677;
  color: #000;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.btn:hover:not(:disabled) {
  background: #00cc6a;
  box-shadow: 0 4px 20px rgba(0, 230, 119, 0.3);
  transform: translateY(-1px);
}

.btn:active:not(:disabled) {
  transform: translateY(0);
}

.btn:disabled {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.3);
  cursor: not-allowed;
  box-shadow: none;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.link {
  text-align: center;
  font-size: 13px;
  color: rgba(229, 231, 235, 0.6);
  text-decoration: none;
  margin-top: 8px;
  transition: color 0.2s ease;
}

.link:hover {
  color: #e5e7eb;
}

.link-accent {
  color: #00E677;
  font-weight: 500;
}

.link:hover .link-accent {
  text-decoration: underline;
}
</style>