<template>
  <header class="site-header">
    <div class="container nav-wrapper">
      <RouterLink to="/" class="logo">EcomVue</RouterLink>

      <nav class="nav-menu">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/products">Products</RouterLink>
        <RouterLink to="/cart">Cart ({{ cart.cartCount }})</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

const cart = useCartStore()
</script>