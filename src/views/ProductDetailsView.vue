<template>
  <section class="section">
    <div class="container">
      <p v-if="productStore.loading">Loading...</p>

      <div v-else-if="productStore.product" class="details-grid">
        <img :src="productStore.product.image" :alt="productStore.product.name" />

        <div>
          <span class="badge">{{ productStore.product.category }}</span>
          <h1>{{ productStore.product.name }}</h1>
          <h2>৳{{ productStore.product.price }}</h2>

          <button class="primary-btn" @click="cart.addToCart(productStore.product)">
            Add to Cart
          </button>
        </div>
      </div>

      <p v-else>Product not found.</p>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { trackViewContent } from '@/utils/tracking'

const route = useRoute()
const productStore = useProductStore()
const cart = useCartStore()

onMounted(async () => {
  if (!productStore.products.length) {
    await productStore.fetchProducts()
  }

  await productStore.fetchProduct(route.params.id)

  // 🔥 Track ViewContent
  if (productStore.product) {
    trackViewContent(productStore.product)
  }
})
</script>
