<template>
  <section class="section">
    <div class="container">
      <div class="section-title">
        <h2>All Products</h2>
      </div>

      <p v-if="productStore.loading">Loading products...</p>

      <div v-else class="product-grid">
        <ProductCard
          v-for="product in productStore.products"
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