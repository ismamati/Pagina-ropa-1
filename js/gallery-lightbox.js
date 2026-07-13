// gallery-lightbox.js — NO EDITAR. Lightbox simple para la galería de fotos.

function initGalleryLightbox() {
  const grid = document.getElementById("gallery-grid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  if (!grid || !lightbox || !lightboxImage) return;

  let images = [];
  let currentIndex = 0;

  function open(index) {
    images = Array.from(grid.querySelectorAll("img"));
    currentIndex = index;
    updateImage();
    lightbox.classList.add("is-open");
  }

  function close() {
    lightbox.classList.remove("is-open");
  }

  function updateImage() {
    const img = images[currentIndex];
    if (!img) return;
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
  }

  function step(delta) {
    if (images.length === 0) return;
    currentIndex = (currentIndex + delta + images.length) % images.length;
    updateImage();
  }

  grid.addEventListener("click", event => {
    const img = event.target.closest("img");
    if (!img) return;
    open(Number(img.dataset.index) || 0);
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  });
}
