// catalog-filter.js — NO EDITAR. Filtra las categorías del catálogo ya
// renderizado, sin necesidad de volver a generar el HTML.

function initCatalogFilter() {
  const filtersContainer = document.getElementById("catalog-filters");
  if (!filtersContainer) return;

  filtersContainer.addEventListener("click", event => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;

    filtersContainer.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const selected = button.dataset.category;
    document.querySelectorAll(".catalog-category").forEach(section => {
      const matches = selected === "all" || section.dataset.category === selected;
      section.style.display = matches ? "" : "none";
    });
  });
}
