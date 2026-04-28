<template>
  <div class="container">
    <h1>Register</h1>
    <form @submit.prevent="onSubmit">
      <label>
        Name
        <input v-model="name" required />
      </label>
      <label>
        Email
        <input type="email" v-model="email" required />
      </label>
      <label>
        Password
        <input type="password" v-model="password" required />
      </label>
      <button type="submit">Create account</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const email = ref('')
const password = ref('')
function onSubmit() {
  alert(`Register: ${name.value}`)
}
</script>

<style scoped>
.container{padding:1rem}
form{display:flex;flex-direction:column;gap:0.5rem;max-width:360px}
input{padding:0.5rem;border:1px solid #ddd;border-radius:4px}
button{padding:0.5rem 1rem}
</style>
