// render-catalog.js — NO EDITAR. Lógica reusable: genera el catálogo a partir
// de STORE_CONFIG.catalog. Para agregar/quitar productos, editar data/config.js.
//
// A diferencia de la variante "solo catálogo", acá cada producto tiene un
// selector de talle y un botón "Agregar al carrito" en vez de un link directo
// a WhatsApp. El pedido completo se manda por WhatsApp al finalizar la compra
// (ver cart.js / render-cart.js).

const PRODUCT_TAG_LABELS = {
  nuevo: "Nuevo",
  popular: "Más pedido",
  oferta: "Oferta",
  "último talle": "Último talle"
};

// Índice de productos por id, para poder recuperar el objeto completo
// cuando se hace click en "Agregar al carrito" (el DOM solo guarda el id).
const PRODUCT_INDEX = {};

function formatPrice(price, formatting) {
  const amount = Number(price).toLocaleString(formatting.currencyLocale);
  return `${formatting.currencySymbol}${amount}`;
}

function buildProductCard(item, config) {
  PRODUCT_INDEX[item.id] = item;

  const tags = Array.isArray(item.tags) ? item.tags : [];
  const tagsHtml = tags
    .map(tag => `<span class="tag-badge">${PRODUCT_TAG_LABELS[tag] || tag}</span>`)
    .join("");

  const sizes = Array.isArray(item.sizes) ? item.sizes : [];
  const sizeSelectHtml = sizes.length > 1
    ? `
      <label class="product-card-size-label">
        Talle
        <select class="product-card-size-select" data-product-id="${item.id}">
          ${sizes.map(size => `<option value="${size}">${size}</option>`).join("")}
        </select>
      </label>
    `
    : "";

  const imageSrc = item.image || "";

  return `
    <article class="product-card">
      <img src="${imageSrc}" alt="${item.name}" loading="lazy"
           onerror="this.src='https://placehold.co/400x300?text=${encodeURIComponent(item.name)}'">
      <div class="product-card-body">
        <div class="product-card-header">
          <h4>${item.name}</h4>
          <span class="product-card-price">${formatPrice(item.price, config.formatting)}</span>
        </div>
        <p class="product-card-description">${item.description || ""}</p>
        ${tagsHtml ? `<div class="product-card-tags">${tagsHtml}</div>` : ""}
        ${sizeSelectHtml}
        <button class="btn btn-primary add-to-cart-btn" data-product-id="${item.id}" data-default-size="${sizes[0] || ""}">
          Agregar al carrito
        </button>
      </div>
    </article>
  `;
}

function renderCatalog(config) {
  const categories = (config.catalog && config.catalog.categories) || [];
  const filtersContainer = document.getElementById("catalog-filters");
  const catalogContainer = document.getElementById("catalog-container");

  if (!filtersContainer || !catalogContainer) return;

  const allLabel = config.catalog.filterAllLabel || "Todos";
  const filterButtons = [`<button class="filter-btn active" data-category="all">${allLabel}</button>`]
    .concat(categories.map(cat => `<button class="filter-btn" data-category="${cat.id}">${cat.name}</button>`));
  filtersContainer.innerHTML = filterButtons.join("");

  const categoriesHtml = categories.map(cat => {
    const items = Array.isArray(cat.items) ? cat.items : [];
    const cardsHtml = items.map(item => buildProductCard(item, config)).join("");
    return `
      <div class="catalog-category" data-category="${cat.id}">
        <h3>${cat.name}</h3>
        <div class="catalog-grid">${cardsHtml}</div>
      </div>
    `;
  }).join("");

  catalogContainer.innerHTML = categoriesHtml;
}

function initCatalogActions() {
  const catalogContainer = document.getElementById("catalog-container");
  if (!catalogContainer) return;

  catalogContainer.addEventListener("click", event => {
    const button = event.target.closest(".add-to-cart-btn");
    if (!button) return;

    const productId = button.dataset.productId;
    const product = PRODUCT_INDEX[productId];
    if (!product) return;

    const card = button.closest(".product-card");
    const sizeSelect = card.querySelector(".product-card-size-select");
    const size = sizeSelect ? sizeSelect.value : button.dataset.defaultSize;

    addToCart(product, size);

    const originalLabel = button.textContent;
    button.textContent = "¡Agregado!";
    button.disabled = true;
    setTimeout(() => {
      button.textContent = originalLabel;
      button.disabled = false;
    }, 900);
  });
}
