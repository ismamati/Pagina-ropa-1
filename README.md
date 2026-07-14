# Plantilla web para tiendas de ropa — Carrito + resumen por WhatsApp

Variante 2 de la plantilla de tienda de ropa: el cliente arma un pedido con
varios productos (eligiendo talle y cantidad) y al finalizar se genera un
único mensaje de WhatsApp con el resumen completo del pedido y el total.
Sigue sin backend ni pagos reales — el carrito vive en el navegador
(`localStorage`), no hay gestión de stock ni cobro online.

HTML/CSS/JS vanilla, sin frameworks ni build tools.

## Cómo verla

Abrí `index.html` directamente en el navegador (doble click). No necesita
servidor, ni `npm install`, ni build.

## Estructura

```
index.html           → home: hero, nosotros, muestra de destacados, galería, ubicación, contacto (no debería requerir cambios)
catalogo.html         → página del catálogo completo, con filtros por categoría (no debería requerir cambios)
css/theme.css          → colores y tipografía de marca (EDITAR por cliente)
css/base.css           → reset y tipografía base (core)
css/layout.css         → grids y breakpoints responsive (core)
css/components.css     → botones, cards, carrito, nav, modal, lightbox (core)
data/config.js         → TODO el contenido del sitio (EDITAR por cliente)
js/cart.js             → estado del carrito (localStorage) (core)
js/render-cart.js      → drawer del carrito + mensaje de WhatsApp (core)
js/render-catalog.js   → tarjetas del catálogo (portada + nombre + precio) (core)
js/product-modal.js    → ficha de producto en modal (galería, talles, agregar) (core)
js/*.js                → resto de la lógica de render e interactividad (core)
assets/images/         → fotos (REEMPLAZAR por cliente)
assets/icons/          → favicon (REEMPLAZAR por cliente)
```

`index.html` y `catalogo.html` comparten el mismo header, footer, botón de
WhatsApp, drawer de carrito y modal de producto — se ven y funcionan como
un único sitio, solo que el catálogo vive en su propia página en vez de ser
una sección más del scroll de la home. El carrito es el mismo en las dos
páginas porque se guarda en `localStorage` (mismo origen).

## Muestra de destacados en la home

La sección `#featured` de `index.html` (entre "Nosotros" y "Galería")
muestra los productos marcados con `featured: true` en `data/config.js`,
con un botón **"Ver más"** que linkea a `catalogo.html`. Usa la misma
función de render que la grilla completa (`buildProductCard`), así que las
tarjetas se ven y se comportan igual (abren el mismo modal de producto) en
las dos páginas. Para cambiar qué productos aparecen en la home, editá el
campo `featured` de cada producto en `config.js` — no hay límite fijo de
cantidad, pero 3-4 productos es lo que mejor entra en una fila en desktop.

## Cómo funciona el catálogo y el carrito

1. Las tarjetas del catálogo muestran solo portada, nombre, precio y tags —
   no tienen selector de talle ni botón de compra.
2. Al tocar una tarjeta se abre la **ficha de producto en modal**
   (`#product-modal`): galería de imágenes (`images[]` de `config.js`, con
   miniaturas si hay más de una), descripción completa, tags, talles como
   pills clickeables y el botón **"Agregar al carrito"** (deshabilitado
   hasta elegir un talle, si el producto tiene más de uno).
3. El ícono de carrito en el header muestra la cantidad de unidades y abre
   un panel lateral (`#cart-drawer`) con la lista de productos, talle,
   cantidad (+/-) y un botón para quitar cada línea.
4. El carrito se guarda en `localStorage` (clave `store_cart_v1`), así que
   sobrevive a un refresh de página — pero es **local al navegador**, no se
   sincroniza entre dispositivos ni hay backend.
5. Al tocar **"Finalizar pedido por WhatsApp"**, se arma un mensaje con cada
   producto, talle, cantidad, subtotal y el total, y se abre WhatsApp con
   ese texto pre-cargado al número de `contact.whatsapp`. El pedido real se
   confirma por chat, como en la variante de solo catálogo.

## Cómo usar esta plantilla para un cliente nuevo

**Archivos a editar:**

1. `data/config.js` — reemplazar todo: nombre de la tienda, propuesta de
   marca, catálogo completo (categorías y productos con precio/foto/talles),
   horarios, dirección, `mapEmbedUrl`, teléfono, WhatsApp
   (`contact.whatsapp` y `contact.whatsappMessage`), email y redes sociales.
2. `css/theme.css` — ajustar `--color-primary`, `--color-secondary`, fuentes,
   etc. a la identidad visual del cliente.
3. `assets/images/**` — reemplazar todas las fotos.
4. `assets/icons/favicon.svg` — reemplazar por el ícono del cliente.

**Archivos que NO hay que tocar** (lógica reusable del core):

- Todo `js/*.js`
- `css/base.css`, `css/layout.css`, `css/components.css`
- La estructura de secciones de `index.html` y `catalogo.html`

## Esquema de datos (`data/config.js`)

El archivo exporta un único objeto `STORE_CONFIG`. El catálogo
(`catalog.categories`) es un array de categorías, cada una con un array de
productos (`items`). Cada producto tiene `id`, `name`, `description`,
`price` (número), `image` (portada, usada en la tarjeta y en el carrito),
`images` (array con la galería completa que se muestra en el modal —
puede tener 1 sola imagen si todavía no hay más fotos del producto),
`sizes` (array de talles, ej. `["S","M","L"]`), `tags` opcionales
(`nuevo`, `oferta`, `último talle`) y `featured` opcional (`true` para que
aparezca en la muestra de la home). Los badges `nuevo` y `oferta` tienen
color propio (rojo y verde respectivamente, en `components.css`); el resto
de los tags usa el estilo neutro por defecto.

El nav (`nav.links`) usa targets con la página incluida (ej.
`"index.html#hero"`, `"catalogo.html"`): `render-content.js` resuelve en
tiempo real si hay que hacer scroll suave (misma página) o navegar
normalmente (otra página).

## Botón flotante de WhatsApp

El círculo verde fijo abajo a la derecha usa `contact.whatsapp` y
`contact.whatsappMessage` para un chat general (no ligado a un pedido
puntual) — sigue disponible además del flujo de carrito. Se oculta solo si
`contact.whatsapp` queda vacío.

## Sobre esta variante dentro del showroom de proyectos

Esta es la variante intermedia (con carrito, sin pagos reales). Las otras
del showroom de tiendas de ropa son:

- `catalogo-whatsapp/`: sin carrito, cada producto se consulta individual
  por WhatsApp.
- `tienda-checkout/`: tienda con pago online real (requiere backend,
  gestión de stock/órdenes y un proveedor de pagos) — bastante más grande,
  a planificar aparte.

## Imágenes de ejemplo

Las fotos actuales son de [Unsplash](https://unsplash.com) (licencia libre
de uso comercial) y son **solo para demo**. Ver `assets/images/CREDITS.md`.
Reemplazalas por fotos reales de la tienda antes de publicar el sitio de un
cliente.
