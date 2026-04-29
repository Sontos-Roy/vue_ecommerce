const CURRENCY = 'BDT'

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || []
  return window.dataLayer
}

function createEventId(prefix, id = '') {
  const safeId = id ? `_${id}` : ''
  return `${prefix}${safeId}_${Date.now()}`
}

function normalizeProduct(product, quantity = 1) {
  return {
    item_id: String(product.id),
    item_name: product.name,
    item_category: product.category || 'Uncategorized',
    price: Number(product.price || 0),
    quantity: Number(quantity || product.qty || 1),
  }
}

function trackFacebook(eventName, payload, eventId) {
  if (typeof window.fbq !== 'function') return

  window.fbq('track', eventName, payload, {
    eventID: eventId,
  })
}

export function trackPageView(route) {
  const eventId = createEventId('PV')
  const pagePath = route?.fullPath || window.location.pathname
  const pageTitle = document.title || 'Vue Ecommerce'

  ensureDataLayer().push({
    event: 'page_view',
    event_id: eventId,
    page_path: pagePath,
    page_title: pageTitle,
  })

  trackFacebook('PageView', {}, eventId)
}

export function trackViewContent(product) {
  if (!product) return null

  const eventId = createEventId('VC', product.id)
  const item = normalizeProduct(product, 1)

  ensureDataLayer().push({
    event: 'view_item',
    event_id: eventId,
    ecommerce: {
      currency: CURRENCY,
      value: item.price,
      items: [item],
    },
  })

  trackFacebook(
    'ViewContent',
    {
      content_ids: [item.item_id],
      content_name: item.item_name,
      content_type: 'product',
      value: item.price,
      currency: CURRENCY,
    },
    eventId,
  )

  return eventId
}

export function trackAddToCart(product, quantity = 1) {
  if (!product) return null

  const eventId = createEventId('ATC', product.id)
  const item = normalizeProduct(product, quantity)
  const value = item.price * item.quantity

  ensureDataLayer().push({ ecommerce: null })
  ensureDataLayer().push({
    event: 'add_to_cart',
    event_id: eventId,
    ecommerce: {
      currency: CURRENCY,
      value,
      items: [item],
    },
  })

  trackFacebook(
    'AddToCart',
    {
      content_ids: [item.item_id],
      content_name: item.item_name,
      content_type: 'product',
      value,
      currency: CURRENCY,
      contents: [
        {
          id: item.item_id,
          quantity: item.quantity,
          item_price: item.price,
        },
      ],
    },
    eventId,
  )

  return eventId
}

export function trackInitiateCheckout(items = []) {
  if (!items.length) return null

  const eventId = createEventId('IC')
  const normalizedItems = items.map((item) => normalizeProduct(item, item.qty))
  const value = normalizedItems.reduce((total, item) => total + item.price * item.quantity, 0)

  ensureDataLayer().push({ ecommerce: null })
  ensureDataLayer().push({
    event: 'begin_checkout',
    event_id: eventId,
    ecommerce: {
      currency: CURRENCY,
      value,
      items: normalizedItems,
    },
  })

  trackFacebook(
    'InitiateCheckout',
    {
      content_ids: normalizedItems.map((item) => item.item_id),
      content_type: 'product',
      value,
      currency: CURRENCY,
      num_items: normalizedItems.reduce((total, item) => total + item.quantity, 0),
      contents: normalizedItems.map((item) => ({
        id: item.item_id,
        quantity: item.quantity,
        item_price: item.price,
      })),
    },
    eventId,
  )

  return eventId
}

export function trackPurchase(items = [], orderId = null) {
  if (!items.length) return null

  const eventId = orderId ? `PUR_${orderId}` : createEventId('PUR')
  const normalizedItems = items.map((item) => normalizeProduct(item, item.qty))
  const value = normalizedItems.reduce((total, item) => total + item.price * item.quantity, 0)

  ensureDataLayer().push({ ecommerce: null })
  ensureDataLayer().push({
    event: 'purchase',
    event_id: eventId,
    ecommerce: {
      transaction_id: orderId || eventId,
      currency: CURRENCY,
      value,
      items: normalizedItems,
    },
  })

  trackFacebook(
    'Purchase',
    {
      content_ids: normalizedItems.map((item) => item.item_id),
      content_type: 'product',
      value,
      currency: CURRENCY,
      order_id: orderId || eventId,
      num_items: normalizedItems.reduce((total, item) => total + item.quantity, 0),
      contents: normalizedItems.map((item) => ({
        id: item.item_id,
        quantity: item.quantity,
        item_price: item.price,
      })),
    },
    eventId,
  )

  return eventId
}
