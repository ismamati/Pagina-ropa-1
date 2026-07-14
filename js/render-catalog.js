// render-catalog.js — NO EDITAR. Lógica reusable: genera el catálogo a partir
// de STORE_CONFIG.catalog. Para agregar/quitar productos, editar data/config.js.
//
// Las tarjetas son solo portada + nombre + precio + tags: al hacer click se
// abre la ficha de producto en modal (ver product-modal.js), donde se elige
// talle y se agrega al carrito.

const PRODUCT_TAG_LABELS = {
  nuevo: "Nuevo",
  popular: "Más pedido",
  oferta: "Oferta",
  "último talle": "Último talle"
};

// Índice de productos por id, para poder recuperar el objeto completo
// cuando se hace click en una tarjeta (el DOM solo guarda el id).
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

  const imageSrc = item.image || "";

  return `
    <article class="product-card" data-product-id="${item.id}" tabindex="0" role="button" aria-label="Ver detalle de ${item.name}">
      <img src="${imageSrc}" alt="${item.name}" loading="lazy"
           onerror="this.src='https://placehold.co/400x300?text=${encodeURIComponent(item.name)}'">
      <div class="product-card-body">
        <div class="product-card-header">
          <h4>${item.name}</h4>
          <span class="product-card-price">${formatPrice(item.price, config.formatting)}</span>
        </div>
        ${tagsHtml ? `<div class="product-card-tags">${tagsHtml}</div>` : ""}
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
