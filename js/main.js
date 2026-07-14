// main.js — NO EDITAR. Punto de entrada: orquesta la inicialización de la página
// usando los datos de STORE_CONFIG (definido en data/config.js).
//
// Se comparte entre index.html y catalogo.html, pero no todas las páginas
// cargan los mismos scripts (ej. index.html no carga render-catalog.js).
// Por eso las funciones específicas del catálogo se llaman solo si existen.

document.addEventListener("DOMContentLoaded", () => {
  renderStaticContent(STORE_CONFIG);
  if (typeof renderCatalog === "function") renderCatalog(STORE_CONFIG);
  if (typeof initProductModal === "function") initProductModal(STORE_CONFIG);
  if (typeof initCatalogFilter === "function") initCatalogFilter();
  initCart(STORE_CONFIG);
  initNav();
  initGalleryLightbox();
});
