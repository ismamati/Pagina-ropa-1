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
index.html          → estructura de secciones (no debería requerir cambios)
css/theme.css        → colores y tipografía de marca (EDITAR por cliente)
css/base.css         → reset y tipografía base (core)
css/layout.css       → grids y breakpoints responsive (core)
css/components.css   → botones, cards, carrito, nav, lightbox (core)
data/config.js       → TODO el contenido del sitio (EDITAR por cliente)
js/cart.js           → estado del carrito (localStorage) (core)
js/render-cart.js    → drawer del carrito + mensaje de WhatsApp (core)
js/render-catalog.js → catálogo con selector de talle y "Agregar al carrito" (core)
js/*.js              → resto de la lógica de render e interactividad (core)
assets/images/       → fotos (REEMPLAZAR por cliente)
assets/icons/        → favicon (REEMPLAZAR por cliente)
```

## Cómo funciona el carrito

1. Cada producto tiene un selector de talle (si tiene más de uno) y un botón
   **"Agregar al carrito"**.
2. El ícono de carrito en el header muestra la cantidad de unidades y abre
   un panel lateral (`#cart-drawer`) con la lista de productos, talle,
   cantidad (+/-) y un botón para quitar cada línea.
3. El carrito se guarda en `localStorage` (clave `store_cart_v1`), así que
   sobrevive a un refresh de página — pero es **local al navegador**, no se
   sincroniza entre dispositivos ni hay backend.
4. Al tocar **"Finalizar pedido por WhatsApp"**, se arma un mensaje con cada
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
- La estructura de secciones de `index.html`

## Esquema de datos (`data/config.js`)

El archivo exporta un único objeto `STORE_CONFIG`. El catálogo
(`catalog.categories`) es un array de categorías, cada una con un array de
productos (`items`). Cada producto tiene `id`, `name`, `description`,
`price` (número), `image`, `sizes` (array de talles, ej. `["S","M","L"]`) y
`tags` opcionales (`nuevo`, `popular`, `oferta`, `último talle`).

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
