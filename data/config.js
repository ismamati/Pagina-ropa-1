// ============================================================================
// CONFIG.js — Único archivo de CONTENIDO de la plantilla.
//
// Para adaptar este sitio a una tienda de ropa nueva, edita SOLO este
// archivo (y las imágenes en /assets/images/). No hace falta tocar HTML/CSS/JS.
//
// Cada producto tiene "image" (portada, se usa en la tarjeta y en el
// carrito) e "images" (galería completa que se muestra en el modal de
// producto, mínimo 1 imagen). Al tocar una tarjeta se abre el modal con
// esa galería, talles y precio; ahí es donde se agrega al carrito.
// ============================================================================

const STORE_CONFIG = {

  meta: {
    siteTitle: "Trama — Moda con identidad propia",
    metaDescription: "Trama: remeras, pantalones, vestidos y accesorios con identidad propia. Consultá por WhatsApp.",
    faviconPath: "assets/icons/favicon.svg",
    lang: "es"
  },

  brand: {
    name: "Trama",
    tagline: "Moda con identidad propia",
    logoPath: null
  },

  // Los targets de nav incluyen la página ("index.html#hero",
  // "catalogo.html"): render-content.js decide en tiempo real si el link
  // apunta dentro de la página actual (scroll suave) o a otra página
  // (navegación normal del navegador).
  nav: {
    links: [
      { label: "Inicio", target: "index.html#hero" },
      { label: "Nosotros", target: "index.html#about" },
      { label: "Catálogo", target: "catalogo.html" },
      { label: "Galería", target: "index.html#gallery" },
      { label: "Ubicación", target: "index.html#location" },
      { label: "Contacto", target: "index.html#contact" }
    ]
  },

  hero: {
    backgroundImage: "assets/images/hero/hero-1.jpg",
    headline: "Vestí tu propia historia",
    subheadline: "Prendas y accesorios seleccionados para quienes no siguen reglas.",
    ctaText: "Ver catálogo",
    ctaTarget: "catalogo.html"
  },

  about: {
    title: "Nuestra propuesta",
    body: "Trama nació de la idea de que la ropa cuenta historias. Elegimos cada prenda pensando en calidad, identidad y actitud, lejos de las tendencias que se apagan en una temporada.\n\nTrabajamos con marcas chicas y producción local, priorizando materiales que duran y diseños que no pasan de moda.\n\nVení a probarte algo distinto.",
    image: "assets/images/about/local.jpg"
  },

  catalog: {
    filterAllLabel: "Todos",
    categories: [
      {
        id: "remeras",
        name: "Remeras",
        items: [
          {
            id: "remera-take-the-trails",
            name: "Remera Take the Trails",
            description: "Remera de algodón peinado con estampa frontal, corte regular.",
            price: 14000,
            image: "assets/images/catalog/remera-take-the-trails.jpg",
            images: [
              "assets/images/catalog/remera-take-the-trails.jpg",
              "assets/images/catalog/remera-take-the-trails-2.jpg",
              "assets/images/catalog/remera-take-the-trails-3.jpg"
            ],
            sizes: ["S", "M", "L", "XL"],
            tags: ["nuevo"]
          },
          {
            id: "remera-skull-peace",
            name: "Remera Skull Peace",
            description: "Remera oversize unisex, estampa calavera en tinta blanca.",
            price: 15500,
            image: "assets/images/catalog/remera-skull-peace.jpg",
            images: [
              "assets/images/catalog/remera-skull-peace.jpg",
              "assets/images/catalog/remera-skull-peace-2.jpg",
              "assets/images/catalog/remera-skull-peace-3.jpg"
            ],
            sizes: ["S", "M", "L", "XL"],
            tags: []
          },
          {
            id: "pack-remeras-basicas",
            name: "Pack remeras básicas x6",
            description: "Set de 6 remeras lisas en distintos colores, algodón 100%.",
            price: 42000,
            image: "assets/images/catalog/pack-remeras-basicas.jpg",
            images: [
              "assets/images/catalog/pack-remeras-basicas.jpg",
              "assets/images/catalog/pack-remeras-basicas-2.jpg",
              "assets/images/catalog/pack-remeras-basicas-3.jpg"
            ],
            sizes: ["S", "M", "L", "XL"],
            tags: ["oferta"]
          }
        ]
      },
      {
        id: "pantalones",
        name: "Pantalones",
        items: [
          {
            id: "jean-skinny-azul",
            name: "Jean skinny azul",
            description: "Jean tiro alto, tela con elastano para mayor comodidad.",
            price: 26000,
            image: "assets/images/catalog/jean-skinny-azul.jpg",
            images: [
              "assets/images/catalog/jean-skinny-azul.jpg",
              "assets/images/catalog/jean-skinny-azul-2.jpg",
              "assets/images/catalog/jean-skinny-azul-3.jpg"
            ],
            sizes: ["36", "38", "40", "42", "44"],
            tags: []
          },
          {
            id: "jogger-rosa",
            name: "Jogger rosa con bolsillos",
            description: "Jogger de gabardina liviana, puño elastizado en el tobillo.",
            price: 19500,
            image: "assets/images/catalog/jogger-rosa.jpg",
            images: [
              "assets/images/catalog/jogger-rosa.jpg",
              "assets/images/catalog/jogger-rosa-2.jpg"
            ],
            sizes: ["S", "M", "L"],
            tags: ["nuevo"]
          },
          {
            id: "conjunto-oversize-amarillo",
            name: "Conjunto oversize amarillo",
            description: "Hoodie crop + jogger a juego, friza premium.",
            price: 38000,
            image: "assets/images/catalog/conjunto-oversize-amarillo.jpg",
            images: [
              "assets/images/catalog/conjunto-oversize-amarillo.jpg",
              "assets/images/catalog/conjunto-oversize-amarillo-2.jpg"
            ],
            sizes: ["S", "M", "L"],
            tags: []
          }
        ]
      },
      {
        id: "vestidos",
        name: "Vestidos",
        items: [
          {
            id: "vestido-corduroy-borravino",
            name: "Vestido corduroy borravino",
            description: "Vestido midi de corderoy, botones frontales y mangas 3/4.",
            price: 32000,
            image: "assets/images/catalog/vestido-corduroy-borravino.jpg",
            images: [
              "assets/images/catalog/vestido-corduroy-borravino.jpg",
              "assets/images/catalog/vestido-corduroy-borravino-2.jpg"
            ],
            sizes: ["S", "M", "L"],
            tags: ["nuevo"]
          },
          {
            id: "vestido-fluido-rosa",
            name: "Vestido fluido rosa",
            description: "Vestido largo de tela liviana, escote cruzado y lazo en la cintura.",
            price: 29500,
            image: "assets/images/catalog/vestido-fluido-rosa.jpg",
            images: [
              "assets/images/catalog/vestido-fluido-rosa.jpg"
            ],
            sizes: ["S", "M", "L"],
            tags: []
          },
          {
            id: "tapado-negro-editorial",
            name: "Tapado negro editorial",
            description: "Tapado con detalle de volados y botones perlados, entretiempo.",
            price: 54000,
            image: "assets/images/catalog/tapado-negro-editorial.jpg",
            images: [
              "assets/images/catalog/tapado-negro-editorial.jpg",
              "assets/images/catalog/tapado-negro-editorial-2.jpg",
              "assets/images/catalog/tapado-negro-editorial-3.jpg"
            ],
            sizes: ["S", "M", "L"],
            tags: ["último talle"]
          }
        ]
      },
      {
        id: "accesorios",
        name: "Accesorios",
        items: [
          {
            id: "reloj-clasico-cuero",
            name: "Reloj clásico cuero",
            description: "Reloj analógico con malla de cuero genuino, resistente al agua.",
            price: 21000,
            image: "assets/images/catalog/reloj-clasico-cuero.jpg",
            images: [
              "assets/images/catalog/reloj-clasico-cuero.jpg",
              "assets/images/catalog/reloj-clasico-cuero-2.jpg",
              "assets/images/catalog/reloj-clasico-cuero-3.jpg"
            ],
            sizes: ["Único"],
            tags: []
          },
          {
            id: "zapatillas-urbanas",
            name: "Zapatillas urbanas",
            description: "Zapatillas de caña baja, diseño retro basquetbolero.",
            price: 48000,
            image: "assets/images/catalog/zapatillas-urbanas.jpg",
            images: [
              "assets/images/catalog/zapatillas-urbanas.jpg",
              "assets/images/catalog/zapatillas-urbanas-2.jpg",
              "assets/images/catalog/zapatillas-urbanas-3.jpg"
            ],
            sizes: ["38", "39", "40", "41", "42", "43"],
            tags: ["nuevo"]
          },
          {
            id: "kit-accesorios-cuero",
            name: "Kit accesorios de cuero",
            description: "Cinturón, lentes de sol y billetera a juego, cuero genuino.",
            price: 33000,
            image: "assets/images/catalog/kit-accesorios-cuero.jpg",
            images: [
              "assets/images/catalog/kit-accesorios-cuero.jpg",
              "assets/images/catalog/kit-accesorios-cuero-2.jpg"
            ],
            sizes: ["Único"],
            tags: ["oferta"]
          }
        ]
      }
    ]
  },

  gallery: {
    title: "Galería",
    images: [
      { src: "assets/images/gallery/vidriera.jpg", alt: "Vidriera del local" },
      { src: "assets/images/gallery/perchero-colores.jpg", alt: "Perchero con remeras de colores" },
      { src: "assets/images/gallery/clienta-compras.jpg", alt: "Clienta con bolsas de compras" },
      { src: "assets/images/gallery/perchero-suspendido.jpg", alt: "Perchero colgante minimalista" },
      { src: "assets/images/gallery/look-completo.jpg", alt: "Look completo con jean y botas" },
      { src: "assets/images/gallery/detalle-accesorios.jpg", alt: "Detalle de accesorios y prendas" },
      { src: "assets/images/gallery/exhibidor-denim.jpg", alt: "Exhibidor de jeans" },
      { src: "assets/images/gallery/galeria-comercial.jpg", alt: "Galería comercial" }
    ]
  },

  location: {
    title: "Ubicación y horarios",
    address: "Av. Corrientes 1234, Ciudad",
    mapEmbedUrl: "https://www.google.com/maps?q=Av.+Corrientes+1234&output=embed",
    hours: [
      { day: "Lunes a Viernes", time: "10:00 – 20:00" },
      { day: "Sábados", time: "10:00 – 14:00" }
    ]
  },

  contact: {
    title: "Contacto",
    phone: "+54 9 11 8765-4321",
    whatsapp: "5491187654321", // solo dígitos con código de país, sin "+" ni espacios
    whatsappMessage: "¡Hola! Quería hacer una consulta sobre un producto 😊",
    email: "hola@trama.com",
    socials: [
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "facebook", url: "https://facebook.com" },
      { platform: "tiktok", url: "https://tiktok.com" }
    ]
  },

  footer: {
    copyrightName: "Trama",
    extraText: "Plantilla web para tiendas de ropa"
  },

  formatting: {
    currencySymbol: "$",
    currencyLocale: "es-AR"
  }
};
