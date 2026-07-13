// cart.js — NO EDITAR. Estado del carrito, persistido en localStorage para
// que sobreviva a un refresh de página. No hay backend: es solo para armar
// el resumen de pedido que se envía por WhatsApp.

const CART_STORAGE_KEY = "store_cart_v1";

function cartLineKey(productId, size) {
  return `${productId}::${size || ""}`;
}

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  document.dispatchEvent(new CustomEvent("cart:updated", { detail: { cart } }));
}

function addToCart(product, size) {
  const cart = getCart();
  const key = cartLineKey(product.id, size);
  const existing = cart.find(line => line.key === key);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      key,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size || null,
      qty: 1
    });
  }

  saveCart(cart);
}

function updateCartQty(key, qty) {
  const cart = getCart();
  const line = cart.find(l => l.key === key);
  if (!line) return;

  if (qty <= 0) {
    saveCart(cart.filter(l => l.key !== key));
    return;
  }

  line.qty = qty;
  saveCart(cart);
}

function removeFromCart(key) {
  const cart = getCart().filter(l => l.key !== key);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function getCartCount() {
  return getCart().reduce((sum, line) => sum + line.qty, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, line) => sum + line.qty * line.price, 0);
}
