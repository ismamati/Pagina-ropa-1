// main.js — NO EDITAR. Punto de entrada: orquesta la inicialización de la página
// usando los datos de STORE_CONFIG (definido en data/config.js).

document.addEventListener("DOMContentLoaded", () => {
  renderStaticContent(STORE_CONFIG);
  renderCatalog(STORE_CONFIG);
  initProductModal(STORE_CONFIG);
  initCart(STORE_CONFIG);
  initNav();
  initCatalogFilter();
  initGalleryLightbox();
});
