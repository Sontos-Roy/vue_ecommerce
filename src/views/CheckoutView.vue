<template>
  <section class="section">
    <div class="container checkout-grid">
      <div>
        <h2>Checkout</h2>

        <form class="form-box">
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Phone Number" />
          <textarea placeholder="Delivery Address"></textarea>

          <button type="button" class="primary-btn">Place Order</button>
        </form>
      </div>

      <div class="order-summary">
        <h3>Order Summary</h3>

        <div v-for="item in cart.items" :key="item.id" class="summary-row">
          <span>{{ item.name }} × {{ item.qty }}</span>
          <strong>৳{{ item.price * item.qty }}</strong>
        </div>

        <hr />

        <h2>Total: ৳{{ cart.cartTotal }}</h2>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

const cart = useCartStore()
</script>