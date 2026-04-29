import { defineStore } from 'pinia'
import { trackAddToCart } from '@/utils/tracking'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    cartCount: (state) => state.items.reduce((total, item) => total + item.qty, 0),

    cartTotal: (state) =>
      state.items.reduce((total, item) => total + item.price * item.qty, 0),
  },

  actions: {
    addToCart(product) {
      const existing = this.items.find((item) => item.id === product.id)

      if (existing) {
        existing.qty++
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        })
      }

      // 🔥 Track AddToCart
      trackAddToCart(product, 1)
    },

    increaseQty(id) {
      const item = this.items.find((item) => item.id === id)
      if (item) item.qty++
    },

    decreaseQty(id) {
      const item = this.items.find((item) => item.id === id)
      if (!item) return

      if (item.qty > 1) {
        item.qty--
      } else {
        this.removeFromCart(id)
      }
    },

    removeFromCart(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },

    clearCart() {
      this.items = []
    },
  },
})