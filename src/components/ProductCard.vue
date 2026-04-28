<template>
  <div class="product-card">
    <RouterLink :to="`/product/${product.id}`">
      <img :src="product.image" :alt="product.name" />
    </RouterLink>

    <div class="product-info">
      <span>{{ product.category }}</span>
      <h3>{{ product.name }}</h3>
      <p>৳{{ product.price }}</p>

      <button @click="cart.addToCart(product)">Add to Cart</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cart = useCartStore()
</script>