// IAmal MVP - IAmal es el portal y también el nombre del bot (IA + fútbol)
// Datos: equipos/plantillas reales LaLiga. Resultados: intentan cargarse en vivo
// desde football.json (gratis, sin clave). Si falla, se usan 6 reales de ejemplo.
const EQUIPOS = ["Real Madrid", "FC Barcelona", "Atlético de Madrid", "Girona FC", "Athletic Club", "Real Sociedad", "Real Betis", "Villarreal CF"];

const LIGA_API = "https://raw.githubusercontent.com/openfootball/football.json/master/2024-25/es.1.json";

let PARTIDOS = [
  { local: "Valencia CF", visit: "FC Barcelona", gl: 1, gv: 2, fecha: "J1 24/25 real" },
  { local: "Real Madrid", visit: "RCD Mallorca", gl: 1, gv: 1, fecha: "J1 24/25 real" },
  { local: "Atlético de Madrid", visit: "Villarreal CF", gl: 2, gv: 2, fecha: "J1 24/25 real" },
  { local: "Real Sociedad", visit: "Rayo Vallecano", gl: 1, gv: 2, fecha: "J1 24/25 real" },
  { local: "Real Madrid", visit: "Real Betis", gl: 2, gv: 0, fecha: "J2 24/25 real" },
  { local: "Atlético de Madrid", visit: "Girona FC", gl: 3, gv: 0, fecha: "J2 24/25 real" },
];

const NOTICIAS = [
  { titulo: "Barcelona remonta en Mestalla (1-2)", texto: "Valencia 1-2 FC Barcelona, J1 24/25. Lewandowski marcó dos goles.", tag: "barcelona" },
  { titulo: "El Madrid empata en Mallorca en el debut de Mbappé", texto: "RCD Mallorca 1-1 Real Madrid, J1 24/25.", tag: "madrid" },
  { titulo: "Atlético 3-0 Girona: Griezmann brilla", texto: "Atlético de Madrid 3-0 Girona FC, J2 24/25.", tag: "atletico" },
  { titulo: "Previa: derbi Real Madrid vs Atlético", texto: "Consulta en Resultados el historial y pregunta a IAmal '¿Quién va líder?'", tag: "previa" },
];

const PLANTILLAS = {
  "Real Madrid": [
    { nombre: "Courtois", pos: "POR", dorsal: 1 },
    { nombre: "Rüdiger", pos: "DEF", dorsal: 22 },
    { nombre: "Bellingham", pos: "MED", dorsal: 5 },
    { nombre: "Mbappé", pos: "DEL", dorsal: 9 },
  ],
  "FC Barcelona": [
    { nombre: "Ter Stegen", pos: "POR", dorsal: 1 },
    { nombre: "Cubarsí", pos: "DEF", dorsal: 2 },
    { nombre: "Pedri", pos: "MED", dorsal: 8 },
    { nombre: "Lewandowski", pos: "DEL", dorsal: 9 },
  ],
  "Atlético de Madrid": [
    { nombre: "Oblak", pos: "POR", dorsal: 13 },
    { nombre: "Giménez", pos: "DEF", dorsal: 2 },
    { nombre: "De Paul", pos: "MED", dorsal: 5 },
    { nombre: "Griezmann", pos: "DEL", dorsal: 7 },
  ],
  "Girona FC": [
    { nombre: "Gazzaniga", pos: "POR", dorsal: 13 },
    { nombre: "Blind", pos: "DEF", dorsal: 17 },
    { nombre: "Tsygankov", pos: "MED", dorsal: 8 },
    { nombre: "Stuani", pos: "DEL", dorsal: 7 },
  ],
  "Athletic Club": [
    { nombre: "Simón", pos: "POR", dorsal: 1 },
    { nombre: "Vivian", pos: "DEF", dorsal: 3 },
    { nombre: "Sancet", pos: "MED", dorsal: 8 },
    { nombre: "N. Williams", pos: "DEL", dorsal: 9 },
  ],
  "Real Sociedad": [
    { nombre: "Remiro", pos: "POR", dorsal: 1 },
    { nombre: "Zubeldia", pos: "DEF", dorsal: 5 },
    { nombre: "Zubimendi", pos: "MED", dorsal: 4 },
    { nombre: "Oyarzabal", pos: "DEL", dorsal: 10 },
  ],
  "Real Betis": [
    { nombre: "R. Silva", pos: "POR", dorsal: 1 },
    { nombre: "Llorente", pos: "DEF", dorsal: 3 },
    { nombre: "Isco", pos: "MED", dorsal: 22 },
    { nombre: "Lo Celso", pos: "DEL", dorsal: 20 },
  ],
  "Villarreal CF": [
    { nombre: "Jorgensen", pos: "POR", dorsal: 13 },
    { nombre: "Albiol", pos: "DEF", dorsal: 3 },
    { nombre: "Parejo", pos: "MED", dorsal: 10 },
    { nombre: "Pérez", pos: "DEL", dorsal: 7 },
  ],
};

// --- Render: partidos ---
function renderPartidos(filtro = "") {
  const box = document.getElementById("lista-partidos");
  const f = filtro.toLowerCase();
  const list = PARTIDOS.filter(p =>
    p.local.toLowerCase().includes(f) || p.visit.toLowerCase().includes(f));
  box.innerHTML = list.map(p =>
    `<div class="card"><small>${p.fecha}</small><br><strong>${p.local} ${p.gl} - ${p.gv} ${p.visit}</strong></div>`
  ).join("") || "<p>No hay partidos para ese filtro.</p>";
}

// --- Clasificación calculada (tolera equipos fuera de EQUIPOS) ---
function calcClasi() {
  const t = {};
  const ensure = (e) => { if (!t[e]) t[e] = { pj: 0, g: 0, e: 0, p: 0, pts: 0 }; };
  EQUIPOS.forEach(ensure);
  PARTIDOS.forEach(m => {
    ensure(m.local); ensure(m.visit);
    t[m.local].pj++; t[m.visit].pj++;
    if (m.gl > m.gv) { t[m.local].g++; t[m.local].pts += 3; t[m.visit].p++; }
    else if (m.gl < m.gv) { t[m.visit].g++; t[m.visit].pts += 3; t[m.local].p++; }
    else { t[m.local].e++; t[m.visit].e++; t[m.local].pts++; t[m.visit].pts++; }
  });
  return Object.entries(t).sort((a, b) => b[1].pts - a[1].pts);
}

function renderClasi() {
  const tbody = document.querySelector("#tabla-clasi tbody");
  tbody.innerHTML = calcClasi().map(([eq, s]) =>
    `<tr><td>${eq}</td><td>${s.pj}</td><td>${s.g}</td><td>${s.e}</td><td>${s.p}</td><td><strong>${s.pts}</strong></td></tr>`
  ).join("");
}

// --- Noticias ---
function renderNoticias(q = "") {
  const box = document.getElementById("lista-noticias");
  const f = q.toLowerCase();
  const list = NOTICIAS.filter(n =>
    (n.titulo + n.texto + n.tag).toLowerCase().includes(f));
  box.innerHTML = list.map(n =>
    `<div class="card"><small>#${n.tag}</small><br><strong>${n.titulo}</strong><p>${n.texto}</p></div>`
  ).join("") || "<p>Sin resultados.</p>";
}

// --- Plantillas ---
function renderPlantillas() {
  const sel = document.getElementById("selector-equipo");
  sel.innerHTML = EQUIPOS.map(e => `<option>${e}</option>`).join("");
  const draw = () => {
    const eq = sel.value;
    document.getElementById("lista-jugadores").innerHTML =
      PLANTILLAS[eq].map(j => `<div class="card"><strong>${j.dorsal} · ${j.nombre}</strong><br><small>${j.pos} — ${eq}</small></div>`).join("");
  };
  sel.onchange = draw; draw();
}

// --- IAmal (bot local, se llama IAmal: IA + fútbol) ---
function botReply(text) {
  const t = text.toLowerCase();
  const clasi = calcClasi();
  const lider = clasi[0][0];
  if (t.includes("lider") || t.includes("primero") || t.includes("clasific"))
    return `El líder es ${lider} con ${clasi[0][1].pts} pts. Clasificación completa en la sección Resultados.`;
  if (t.includes("partido") || t.includes("resultado") || t.includes("jornada"))
    return `Últimos: ${PARTIDOS.slice(-2).map(p => `${p.local} ${p.gl}-${p.gv} ${p.visit}`).join(" | ")}. Usa el filtro por equipo arriba.`;
  if (t.includes("noticia"))
    return `Hay ${NOTICIAS.length} noticias. La última: "${NOTICIAS[NOTICIAS.length-1].titulo}". Búscala en Noticias.`;
  if (t.includes("plantilla") || t.includes("jugador") || t.includes("equipo"))
    return `Tenemos ${EQUIPOS.length} equipos: ${EQUIPOS.join(", ")}. Elige uno en Plantillas para ver dorsales.`;
  if (t.includes("mbappe") || t.includes("mbappé"))
    return "Mbappé juega en el Real Madrid (dorsal 9). Míralo en Plantillas > Real Madrid.";
  if (t.includes("lewandowski") || t.includes("lewa"))
    return "Lewandowski juega en el FC Barcelona (dorsal 9). Míralo en Plantillas > FC Barcelona.";
  if (t.includes("griezmann"))
    return "Griezmann juega en el Atlético de Madrid (dorsal 7).";
  if (t.includes("hola") || t.includes("quien eres") || t.includes("iamal"))
    return "¡Hola! Soy IAmal, tu IA de fútbol. Puedo decirte quién va líder, resultados, noticias o plantillas. Prueba: '¿Quién va líder?'";
  return "No te he entendido. Prueba con: 'líder', 'partidos', 'noticias' o 'plantilla'.";
}

function initChat() {
  const btn = document.getElementById("chat-btn");
  const box = document.getElementById("chat-box");
  const msgs = document.getElementById("chat-msgs");
  const input = document.getElementById("chat-text");
  const add = (txt, cls) => {
    const d = document.createElement("div");
    d.className = "msg " + cls; d.textContent = txt; msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  };
  const send = (q) => {
    const txt = q || input.value.trim();
    if (!txt) return;
    add(txt, "user"); add(botReply(txt), "bot"); input.value = "";
  };
  btn.onclick = () => { box.classList.toggle("hidden"); if (!msgs.children.length) add("¡Hola! Soy IAmal ⚽ ¿Qué quieres saber?", "bot"); };
  document.getElementById("chat-close").onclick = () => box.classList.add("hidden");
  document.getElementById("chat-send").onclick = () => send();
  input.onkeydown = e => { if (e.key === "Enter") send(); };
  document.querySelectorAll(".chat-quick button").forEach(b => b.onclick = () => send(b.dataset.q));
}

// --- Init ---
document.getElementById("stat-partidos").textContent = PARTIDOS.length;
document.getElementById("stat-equipos").textContent = EQUIPOS.length;
document.getElementById("stat-noticias").textContent = NOTICIAS.length;
renderPartidos(); renderClasi(); renderNoticias(); renderPlantillas(); initChat();
document.getElementById("filtro-equipo").oninput = e => renderPartidos(e.target.value);
document.getElementById("buscador-noticias").oninput = e => renderNoticias(e.target.value);

// --- Intento de datos reales en vivo (progresivo, con fallback) ---
async function cargarDatosReales() {
  try {
    const r = await fetch(LIGA_API);
    if (!r.ok) return;
    const data = await r.json();
    const ms = (data.matches || []).filter(m => m.score && m.score.ft).slice(-6);
    if (!ms.length) return;
    PARTIDOS = ms.map(m => ({
      local: m.team1, visit: m.team2,
      gl: m.score.ft[0], gv: m.score.ft[1],
      fecha: (m.round || "") + " real"
    }));
    renderPartidos(document.getElementById("filtro-equipo").value);
    renderClasi();
    document.getElementById("stat-partidos").textContent = PARTIDOS.length;
  } catch (e) { /* sin internet: se queda el fallback */ }
}
cargarDatosReales();
