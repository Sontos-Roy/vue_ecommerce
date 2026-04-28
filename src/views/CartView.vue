<template>
  <section class="section">
    <div class="container">
      <div class="section-title">
        <h2>Shopping Cart</h2>
      </div>

      <div v-if="cart.items.length">
        <div v-for="item in cart.items" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" />

          <div>
            <h3>{{ item.name }}</h3>
            <p>৳{{ item.price }}</p>
          </div>

          <div class="qty-box">
            <button @click="cart.decreaseQty(item.id)">-</button>
            <span>{{ item.qty }}</span>
            <button @click="cart.increaseQty(item.id)">+</button>
          </div>

          <strong>৳{{ item.price * item.qty }}</strong>

          <button class="danger-btn" @click="cart.removeFromCart(item.id)">Remove</button>
        </div>

        <div class="cart-total">
          <h2>Total: ৳{{ cart.cartTotal }}</h2>
          <RouterLink to="/checkout" class="primary-btn">Proceed Checkout</RouterLink>
        </div>
      </div>

      <p v-else>Your cart is empty.</p>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

const cart = useCartStore()
</script>