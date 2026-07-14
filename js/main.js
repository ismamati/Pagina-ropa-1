// main.js — NO EDITAR. Punto de entrada: orquesta la inicialización de la página
// usando los datos de STORE_CONFIG (definido en data/config.js).
//
// Se comparte entre index.html y catalogo.html. Ambas páginas cargan
// render-catalog.js/product-modal.js (index.html los usa para la muestra
// de destacados, catalogo.html para la grilla completa), pero solo
// catalogo.html carga catalog-filter.js — por eso esa llamada va guardada.

document.addEventListener("DOMContentLoaded", () => {
  renderStaticContent(STORE_CONFIG);
  if (typeof renderCatalog === "function") renderCatalog(STORE_CONFIG);
  if (typeof renderFeaturedProducts === "function") renderFeaturedProducts(STORE_CONFIG);
  if (typeof initProductModal === "function") initProductModal(STORE_CONFIG);
  if (typeof initCatalogFilter === "function") initCatalogFilter();
  initCart(STORE_CONFIG);
  initNav();
  initGalleryLightbox();
});
