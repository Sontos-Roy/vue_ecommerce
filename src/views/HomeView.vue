<template>
  <section class="hero">
    <div class="container hero-grid">
      <div>
        <span class="badge">New Collection 2026</span>
        <h1>Build your modern ecommerce SPA with Vue 3</h1>
        <p>Premium products, fast shopping experience, clean cart system and Laravel API ready.</p>

        <RouterLink to="/products" class="primary-btn">Shop Now</RouterLink>
      </div>

      <div class="hero-card">
        <h2>Big Sale</h2>
        <p>Up to 50% discount</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-title">
        <h2>Featured Products</h2>
        <RouterLink to="/products">View All</RouterLink>
      </div>

      <div class="product-grid">
        <ProductCard
          v-for="product in productStore.products.slice(0, 4)"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>