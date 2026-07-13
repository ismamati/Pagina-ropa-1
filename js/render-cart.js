// render-cart.js — NO EDITAR. Dibuja el contenido del carrito (drawer lateral)
// y arma el link de WhatsApp con el resumen completo del pedido.

function formatCartPrice(price, config) {
  const amount = Number(price).toLocaleString(config.formatting.currencyLocale);
  return `${config.formatting.currencySymbol}${amount}`;
}

function buildOrderMessage(config) {
  const cart = getCart();
  if (cart.length === 0) return "";

  const lines = cart.map(line => {
    const sizeText = line.size ? ` (Talle ${line.size})` : "";
    const subtotal = formatCartPrice(line.price * line.qty, config);
    return `• ${line.name}${sizeText} x${line.qty} - ${subtotal}`;
  });

  const total = formatCartPrice(getCartTotal(), config);

  return [
    "¡Hola! Quiero hacer este pedido:",
    "",
    ...lines,
    "",
    `Total: ${total}`
  ].join("\n");
}

function renderCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = String(count);
  badge.style.display = count > 0 ? "flex" : "none";
}

function renderCartDrawer(config) {
  const itemsContainer = document.getElementById("cart-items");
  const emptyState = document.getElementById("cart-empty");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("cart-checkout");
  if (!itemsContainer) return;

  const cart = getCart();

  if (cart.length === 0) {
    itemsContainer.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    if (checkoutBtn) checkoutBtn.setAttribute("aria-disabled", "true");
  } else {
    if (emptyState) emptyState.style.display = "none";
    if (checkoutBtn) checkoutBtn.removeAttribute("aria-disabled");

    itemsContainer.innerHTML = cart.map(line => `
      <div class="cart-line" data-key="${line.key}">
        <img src="${line.image}" alt="${line.name}">
        <div class="cart-line-info">
          <p class="cart-line-name">${line.name}</p>
          ${line.size ? `<p class="cart-line-size">Talle: ${line.size}</p>` : ""}
          <p class="cart-line-price">${formatCartPrice(line.price, config)}</p>
        </div>
        <div class="cart-line-qty">
          <button class="qty-btn" data-action="decrease" aria-label="Restar unidad">−</button>
          <span>${line.qty}</span>
          <button class="qty-btn" data-action="increase" aria-label="Sumar unidad">+</button>
        </div>
        <button class="cart-line-remove" data-action="remove" aria-label="Quitar producto">&times;</button>
      </div>
    `).join("");
  }

  if (totalEl) totalEl.textContent = formatCartPrice(getCartTotal(), config);

  renderCartBadge();
}

function initCart(config) {
  const cartToggle = document.getElementById("cart-toggle");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartClose = document.getElementById("cart-close");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartItems = document.getElementById("cart-items");
  const clearBtn = document.getElementById("cart-clear");
  const checkoutBtn = document.getElementById("cart-checkout");

  function openDrawer() {
    cartDrawer.classList.add("is-open");
    cartOverlay.classList.add("is-open");
  }

  function closeDrawer() {
    cartDrawer.classList.remove("is-open");
    cartOverlay.classList.remove("is-open");
  }

  if (cartToggle) cartToggle.addEventListener("click", openDrawer);
  if (cartClose) cartClose.addEventListener("click", closeDrawer);
  if (cartOverlay) cartOverlay.addEventListener("click", closeDrawer);

  if (cartItems) {
    cartItems.addEventListener("click", event => {
      const line = event.target.closest(".cart-line");
      if (!line) return;
      const key = line.dataset.key;
      const action = event.target.dataset.action;
      const currentLine = getCart().find(l => l.key === key);
      if (!currentLine) return;

      if (action === "increase") updateCartQty(key, currentLine.qty + 1);
      if (action === "decrease") updateCartQty(key, currentLine.qty - 1);
      if (action === "remove") removeFromCart(key);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      clearCart();
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", event => {
      event.preventDefault();
      const message = buildOrderMessage(config);
      if (!message) return;
      const url = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener");
    });
  }

  document.addEventListener("cart:updated", () => renderCartDrawer(config));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeDrawer();
  });

  renderCartDrawer(config);
}
