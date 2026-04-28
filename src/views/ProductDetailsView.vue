<template>
  <div class="container">
    <h1>Product Details</h1>
    <p>Details for product with ID: {{ id }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id
</script>

<style scoped>
.container{padding:1rem}
</style>
