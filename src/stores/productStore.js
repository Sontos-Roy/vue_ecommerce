import { defineStore } from 'pinia'
import api from '@/services/api'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    product: null,
    loading: false,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true

      try {
        const { data } = await api.get('/products')
        // Normalize common API shapes into an array of products
        const body = data
        let products = []

        if (Array.isArray(body)) {
          products = body
        } else if (body && Array.isArray(body.data)) {
          products = body.data
        } else if (body && Array.isArray(body.products)) {
          products = body.products
        } else if (body && body.products && Array.isArray(body.products.data)) {
          products = body.products.data
        } else {
          products = []
        }

        this.products = products
        console.log('Fetched products (normalized):', this.products)
      } catch (error) {
        console.error('Product fetch error:', error)

        this.products = [
          {
            id: 1,
            name: 'Premium Polo T-Shirt',
            price: 950,
            image: 'https://placehold.co/400x400',
            category: 'Fashion',
          },
          {
            id: 2,
            name: 'Smart Watch',
            price: 1850,
            image: 'https://placehold.co/400x400',
            category: 'Electronics',
          },
          {
            id: 3,
            name: 'Bluetooth Headphone',
            price: 1250,
            image: 'https://placehold.co/400x400',
            category: 'Gadget',
          },
        ]
      } finally {
        this.loading = false
      }
    },

    async fetchProduct(id) {
      this.loading = true

      try {
        const { data } = await api.get(`/products/${id}`)
        this.product = data.data || data
      } catch (error) {
        console.error('Single product fetch error:', error)
        this.product = this.products.find((item) => item.id == id) || null
      } finally {
        this.loading = false
      }
    },
  },
})