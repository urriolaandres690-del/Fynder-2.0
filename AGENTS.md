# AGENTS

## Project overview

This workspace is a simple static web app for a local business discovery experience called FYNDER.

- Entry point: `Fynder.html`
- Styles: `fynder.css`
- Logic: `fynder.js`
- No build system, package manager, or backend present
- The app runs directly in the browser as a client-side SPA-like experience

## What the app does

- Renders a home page with featured businesses, category filters, and search
- Implements directory, favorites, login/register, and business registration views
- Stores demo data in JavaScript arrays: `CATEGORIES` and `BUSINESSES`
- Uses `localStorage` for user registration/login state and favorites
- Page navigation is handled by toggling `.page.active` classes in `goPage()`

## Important conventions

- Keep Spanish user-facing text consistent with the UI
- The app uses inline HTML templates inside JavaScript functions like `gridCardHTML()` and `listCardHTML()`
- A number of elements are accessed directly by `document.getElementById()` and updated imperatively
- The app uses CSS custom properties and responsive layout styles in `fynder.css`

## Notes for agents

- Do not assume a Node.js or build pipeline exists; this is static HTML/CSS/JS.
- If you need to test changes, open `Fynder.html` in a browser.
- Preserve the existing structure: avoid introducing frameworks or build tooling unless asked explicitly.
- Prefer editing the existing `Fynder.html`, `fynder.js`, and `fynder.css` files rather than creating unnecessary new files.

## Suggested next customization

- Add a `.github/copilot-instructions.md` or a custom agent for Spanish UI text consistency and static SPA behavior.
