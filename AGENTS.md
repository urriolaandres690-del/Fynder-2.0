# AGENTS

## Project overview

This workspace is a simple static web app for a local business discovery experience called FYNDER.

The project has two versions:

| Versión | Carpeta | Estado |
|---------|---------|--------|
| Fynder 2.0 | `Fynder-2.0/` | Original monolítico (3 archivos) |
| Fynder 3.0 | `Fynder-3.0/` | Reorganizado por secciones |

## Fynder 3.0 — Estructura de carpetas

```
Fynder-3.0/
  index.html              ← Entry point (todo el HTML ensamblado, abre directo en navegador)
  shared/
    fynder.css            ← CSS global completo (variables, nav, cards, modales, etc.)
    fynder.js             ← JS global completo (goPage, toggleFav, openModal, etc.)
    navbar.html           ← Navbar + menú móvil (fragmento de referencia)
    shared.js             ← Documentación de funciones globales
    modal-business-detail.html
    modal-camera.html
    modal-stats.html
    modal-org-info.html
    modal-feedback.html
  pages/
    home/                 ← Inicio (hero, categorías, destacados, populares, CTA, footer)
    directorio/           ← Directorio de negocios (toolbar, filtros, grid/lista)
    mapa/                 ← Mapa de negocios + globo terráqueo
    guardados/            ← Negocios guardados / favoritos
    login/                ← Iniciar sesión
    registro/             ← Crear cuenta
    negocio/              ← Registrar negocio
    perfil/               ← Perfil de usuario (avatar, datos, contraseña, actividad)
    saber-mas/            ← Landing informativa sobre Fynder
    sobre-fynder/         ← Historia, equipo, misión, estadísticas
    blog/                 ← Blog (artículos, modal nuevo artículo, página escritura)
    articulo/             ← Detalle de artículo con comentarios
    terminos/             ← Términos de servicio
    privacidad/           ← Política de privacidad
    planes/               ← Tabla de planes y precios
    dashboard/            ← Panel de control del negocio
    soporte/              ← Centro de ayuda y formulario de contacto
    mensajes/             ← Sistema de mensajes (layout WhatsApp Web)
    ajustes/              ← Configuración completa
    bienvenida-modal/     ← Modal de bienvenida / sugerencia de login
```

Cada carpeta de `pages/` contiene:
- `{nombre}.html` — Estructura HTML de la sección (el `<div id="page-*">`)
- `{nombre}.css`  — CSS exclusivo de la sección (overrides; estilos globales en shared/fynder.css)
- `{nombre}.js`   — JS exclusivo de la sección (lógica adicional; funciones globales en shared/fynder.js)

## Cómo funciona

- **Entry point:** `Fynder-3.0/index.html` — contiene TODO el HTML ensamblado con rutas actualizadas a `shared/`
- **CSS:** `shared/fynder.css` (original sin modificaciones)
- **JS:** `shared/fynder.js` (original sin modificaciones)
- **Navegación:** La función `goPage(p)` en JS maneja la SPA toggleando `.page.active`
- **Sin build system:** Abre `index.html` directamente en el navegador

## Fynder 2.0 — Estructura original

```
Fynder-2.0/
  Fynder.html   ← HTML monolítico (~5300 líneas, 22 páginas)
  fynder.css    ← CSS monolítico (~17,300 líneas)
  fynder.js     ← JS monolítico (~10,100 líneas)
```

## Important conventions

- Mantener texto de usuario en español
- El app usa templates HTML inline en funciones JS como `gridCardHTML()` y `listCardHTML()`
- Elementos accedidos directamente por `document.getElementById()` e imperativamente
- CSS usa custom properties y layout responsive en `shared/fynder.css`

## Notes for agents

- No asumir Node.js o build pipeline — es HTML/CSS/JS estático
- Para probar cambios, abrir `Fynder-3.0/index.html` en un navegador
- Preservar la estructura existente; no introducir frameworks o build tooling
- Preferir editar los archivos de `Fynder-3.0/` en lugar de los de `Fynder-2.0/`
- El CSS y JS globales están en `shared/` — los archivos `.css` y `.js` de cada página son para overrides adicionales
