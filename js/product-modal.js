// product-modal.js — NO EDITAR. Ficha de producto en modal: se abre al
// tocar una tarjeta del catálogo (ver render-catalog.js / PRODUCT_INDEX).
// Muestra galería de imágenes, descripción, talles (pills) y precio; desde
// acá es donde se elige el talle y se agrega al carrito (cart.js).

let currentModalProduct = null;
let currentModalSize = null;

function formatModalPrice(price, config) {
  const amount = Number(price).toLocaleString(config.formatting.currencyLocale);
  return `${config.formatting.currencySymbol}${amount}`;
}

function setModalMainImage(src, alt) {
  const mainImage = document.getElementById("product-modal-image");
  if (mainImage) {
    mainImage.src = src;
    mainImage.alt = alt;
  }
}

function renderModalThumbnails(images, alt) {
  const thumbsContainer = document.getElementById("product-modal-thumbs");
  if (!thumbsContainer) return;

  if (images.length <= 1) {
    thumbsContainer.innerHTML = "";
    thumbsContainer.style.display = "none";
    return;
  }

  thumbsContainer.style.display = "flex";
  thumbsContainer.innerHTML = images
    .map((src, index) => `
      <button class="product-modal-thumb ${index === 0 ? "active" : ""}" data-src="${src}" aria-label="Ver imagen ${index + 1} de ${alt}">
        <img src="${src}" alt="">
      </button>
    `)
    .join("");
}

function renderModalSizes(sizes) {
  const sizesContainer = document.getElementById("product-modal-sizes");
  if (!sizesContainer) return;

  sizesContainer.innerHTML = sizes
    .map(size => `<button class="size-pill" data-size="${size}">${size}</button>`)
    .join("");
}

function updateModalAddButton() {
  const addBtn = document.getElementById("product-modal-add");
  if (!addBtn) return;
  addBtn.disabled = !currentModalSize;
}

function openProductModal(product, config) {
  currentModalProduct = product;
  currentModalSize = null;

  const images = Array.isArray(product.images) && product.images.length
    ? product.images
    : [product.image];

  setModalMainImage(images[0], product.name);
  renderModalThumbnails(images, product.name);

  const tagsHtml = buildTagsHtml(product.tags);

  document.getElementById("product-modal-name").textContent = product.name;
  document.getElementById("product-modal-price").textContent = formatModalPrice(product.price, config);
  document.getElementById("product-modal-description").textContent = product.description || "";
  document.getElementById("product-modal-tags").innerHTML = tagsHtml;

  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  renderModalSizes(sizes);
  updateModalAddButton();

  const addBtn = document.getElementById("product-modal-add");
  if (addBtn) {
    addBtn.textContent = "Agregar al carrito";
    addBtn.disabled = sizes.length > 0;
  }

  document.getElementById("product-modal-overlay").classList.add("is-open");
  document.getElementById("product-modal").classList.add("is-open");
}

function closeProductModal() {
  document.getElementById("product-modal-overlay").classList.remove("is-open");
  document.getElementById("product-modal").classList.remove("is-open");
  currentModalProduct = null;
  currentModalSize = null;
}

function initProductModal(config) {
  const modal = document.getElementById("product-modal");
  const overlay = document.getElementById("product-modal-overlay");
  const closeBtn = document.getElementById("product-modal-close");
  const thumbsContainer = document.getElementById("product-modal-thumbs");
  const sizesContainer = document.getElementById("product-modal-sizes");
  const addBtn = document.getElementById("product-modal-add");

  if (!modal) return;

  function openFromCard(card) {
    const productId = card.dataset.productId;
    const product = PRODUCT_INDEX[productId];
    if (product) openProductModal(product, config);
  }

  // Delegado en document en vez de un contenedor puntual: así funciona
  // tanto para la grilla completa (#catalog-container) como para la
  // muestra de destacados en la home (#featured-grid).
  document.addEventListener("click", event => {
    const card = event.target.closest(".product-card");
    if (!card) return;
    openFromCard(card);
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".product-card");
    if (!card) return;
    event.preventDefault();
    openFromCard(card);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeProductModal);
  if (overlay) overlay.addEventListener("click", closeProductModal);

  if (thumbsContainer) {
    thumbsContainer.addEventListener("click", event => {
      const thumb = event.target.closest(".product-modal-thumb");
      if (!thumb) return;
      thumbsContainer.querySelectorAll(".product-modal-thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      setModalMainImage(thumb.dataset.src, currentModalProduct ? currentModalProduct.name : "");
    });
  }

  if (sizesContainer) {
    sizesContainer.addEventListener("click", event => {
      const pill = event.target.closest(".size-pill");
      if (!pill) return;
      sizesContainer.querySelectorAll(".size-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentModalSize = pill.dataset.size;
      updateModalAddButton();
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      if (!currentModalProduct || !currentModalSize) return;
      addToCart(currentModalProduct, currentModalSize);
      addBtn.textContent = "¡Agregado!";
      setTimeout(() => {
        addBtn.textContent = "Agregar al carrito";
      }, 900);
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeProductModal();
  });
}
