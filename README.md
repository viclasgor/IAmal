# IAmal — Portal de fútbol local

**Problema:** No hay un sitio simple para seguir una liga amateur: resultados dispersos en WhatsApp, sin clasificación actualizada ni noticias centralizadas.

**Solución (MVP):** Web estática con resultados reales de LaLiga, clasificación auto-calculada, noticias con buscador, plantillas reales y **IAmal**, un asistente que responde preguntas frecuentes.

## Funcionalidades
- Resultados reales: intenta cargar en vivo desde `football.json` (gratis, sin clave); si no hay internet usa 6 resultados reales J1-J2 24/25
- Clasificación calculada en JS desde los partidos (`app.js:70`)
- Noticias con buscador por palabra (ej: madrid, barcelona)
- Plantillas por equipo (nombre, posición, dorsal)
- AmalBot (bot 100% local, sin backend): responde líder, partidos, noticias, plantillas

## Stack
- HTML + CSS + JS vanilla (sin frameworks)
- Sin backend ni base de datos (datos mock en `app.js`)
- Despliegue: Vercel (hosting estático gratuito)

## Ejecutar en local
Opción 1 — doble clic en `index.html`.

Opción 2 — con Node (recomendado, igual que Vercel):
```powershell
npx serve .
```
Abrir http://localhost:3000

Opción 3 — con Vercel CLI:
```powershell
npm i -g vercel
vercel dev
```

## Despliegue
- URL producción: _PEGAR AQUÍ TU URL DE VERCEL_
- Se despliega conectando el repo GitHub a Vercel (ver pasos abajo) o con `vercel --prod`.

## Estructura
- `index.html` — estructura
- `styles.css` — diseño
- `app.js` — datos + lógica + bot
