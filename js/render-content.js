// render-content.js — NO EDITAR. Vuelca en el HTML todo el contenido estático
// definido en data/config.js (hero, about, ubicación, contacto, footer, etc).

function renderStaticContent(config) {
  document.title = config.meta.siteTitle;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", config.meta.metaDescription);

  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) favicon.setAttribute("href", config.meta.faviconPath);

  // Brand
  setText("[data-bind='brand.name']", config.brand.name);

  // Nav
  const navLinks = document.getElementById("nav-links");
  if (navLinks) {
    navLinks.innerHTML = config.nav.links
      .map(link => `<li><a href="${link.target}">${link.label}</a></li>`)
      .join("");
  }

  // Hero
  const heroBg = document.getElementById("hero-bg");
  if (heroBg) heroBg.style.backgroundImage = `url('${config.hero.backgroundImage}')`;
  setText("[data-bind='hero.headline']", config.hero.headline);
  setText("[data-bind='hero.subheadline']", config.hero.subheadline);
  setText("#hero-cta", config.hero.ctaText);
  const heroCta = document.getElementById("hero-cta");
  if (heroCta) heroCta.setAttribute("href", config.hero.ctaTarget);

  // About
  setText("[data-bind='about.title']", config.about.title);
  const aboutBody = document.getElementById("about-body");
  if (aboutBody) {
    aboutBody.innerHTML = config.about.body
      .split("\n\n")
      .map(paragraph => `<p>${paragraph}</p>`)
      .join("");
  }
  const aboutImage = document.getElementById("about-image");
  if (aboutImage) {
    aboutImage.src = config.about.image;
    aboutImage.alt = config.about.title;
  }

  // Gallery
  setText("[data-bind='gallery.title']", config.gallery.title);
  const galleryGrid = document.getElementById("gallery-grid");
  if (galleryGrid) {
    galleryGrid.innerHTML = config.gallery.images
      .map((img, index) => `<img src="${img.src}" alt="${img.alt}" data-index="${index}" loading="lazy">`)
      .join("");
  }

  // Location
  setText("[data-bind='location.title']", config.location.title);
  const map = document.getElementById("location-map");
  if (map) map.src = config.location.mapEmbedUrl;
  const address = document.getElementById("location-address");
  if (address) address.textContent = config.location.address;
  const hoursList = document.getElementById("hours-list");
  if (hoursList) {
    hoursList.innerHTML = config.location.hours
      .map(h => `<li><span>${h.day}</span><span>${h.time}</span></li>`)
      .join("");
  }

  // Contact
  setText("[data-bind='contact.title']", config.contact.title);
  const phone = document.getElementById("contact-phone");
  if (phone) {
    phone.textContent = config.contact.phone;
    phone.href = `tel:${config.contact.phone.replace(/\s|-/g, "")}`;
  }
  const email = document.getElementById("contact-email");
  if (email) {
    email.textContent = config.contact.email;
    email.href = `mailto:${config.contact.email}`;
  }

  const whatsappFloat = document.getElementById("whatsapp-float");
  if (whatsappFloat) {
    if (config.contact.whatsapp) {
      const message = encodeURIComponent(config.contact.whatsappMessage || "");
      whatsappFloat.href = `https://wa.me/${config.contact.whatsapp}?text=${message}`;
    } else {
      whatsappFloat.style.display = "none";
    }
  }

  const socialLinks = document.getElementById("social-links");
  if (socialLinks) {
    socialLinks.innerHTML = config.contact.socials
      .map(s => `<a class="social-link" href="${s.url}" target="_blank" rel="noopener" aria-label="${s.platform}">${s.platform[0].toUpperCase()}</a>`)
      .join("");
  }

  // Footer
  const footerText = document.getElementById("footer-text");
  if (footerText) {
    const year = new Date().getFullYear();
    footerText.textContent = `© ${year} ${config.footer.copyrightName} — ${config.footer.extraText}`;
  }
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}
