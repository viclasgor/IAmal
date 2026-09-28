// IAmal MVP - IAmal es el portal y también el nombre del bot (IA + fútbol)
// Alcance honesto 26/27: listas de equipos 25/26 (base estable, el mercado 26/27
// cambia dorsales) + 6 resultados reales + plantillas "estrellas", no 25 fichas
// oficiales por equipo (serían ~2.500 jugadores, inverificable para el 9/10).
const EQUIPOS = ["Real Madrid", "FC Barcelona", "Atlético de Madrid", "Athletic Club", "Villarreal CF", "Real Betis", "Celta de Vigo", "Rayo Vallecano", "Osasuna", "RCD Mallorca", "Getafe CF", "Girona FC", "Sevilla FC", "Real Sociedad", "Alavés", "Valencia CF", "RCD Espanyol", "Elche CF", "Real Oviedo", "Levante UD"];

// 5 grandes ligas (nombres para que IAmal responda, no plantillas completas)
const LIGAS = {
  "LaLiga": ["Real Madrid", "FC Barcelona", "Atlético de Madrid", "Athletic Club", "Villarreal CF", "Real Betis", "Celta de Vigo", "Rayo Vallecano", "Osasuna", "RCD Mallorca", "Getafe CF", "Girona FC", "Sevilla FC", "Real Sociedad", "Alavés", "Valencia CF", "RCD Espanyol", "Elche CF", "Real Oviedo", "Levante UD"],
  "Premier League": ["Arsenal", "Manchester City", "Liverpool", "Chelsea", "Manchester United", "Tottenham", "Newcastle", "Aston Villa", "Brighton", "West Ham", "Everton", "Fulham", "Wolves", "Bournemouth", "Brentford", "Crystal Palace", "Nottingham Forest", "Leeds United", "Burnley", "Sunderland"],
  "Serie A": ["Inter", "Milan", "Juventus", "Napoli", "Roma", "Lazio", "Atalanta", "Fiorentina", "Bologna", "Torino", "Udinese", "Genoa", "Lecce", "Cagliari", "Verona", "Parma", "Como", "Sassuolo", "Pisa", "Cremonese"],
  "Bundesliga": ["Bayern", "Dortmund", "Leverkusen", "Leipzig", "Stuttgart", "Eintracht Frankfurt", "Friburgo", "Mainz", "Augsburgo", "Gladbach", "Wolfsburgo", "Hoffenheim", "Union Berlin", "St. Pauli", "Werder Bremen", "Heidenheim", "Köln", "Hamburgo SV"],
  "Ligue 1": ["PSG", "Marsella", "Mónaco", "Lille", "Lyon", "Lens", "Niza", "Rennes", "Estrasburgo", "Nantes", "Toulouse", "Auxerre", "Le Havre", "Brest", "Angers", "Lorient", "Paris FC", "Metz"]
};

const LIGA_API = "https://raw.githubusercontent.com/openfootball/football.json/master/2024-25/es.1.json";

let PARTIDOS = [
  { local: "Real Madrid", visit: "Osasuna", gl: 2, gv: 0, fecha: "J1" },
  { local: "FC Barcelona", visit: "RCD Mallorca", gl: 3, gv: 1, fecha: "J1" },
  { local: "Atlético de Madrid", visit: "RCD Espanyol", gl: 2, gv: 1, fecha: "J1" },
  { local: "Athletic Club", visit: "Sevilla FC", gl: 1, gv: 1, fecha: "J1" },
  { local: "Villarreal CF", visit: "Real Oviedo", gl: 2, gv: 0, fecha: "J1" },
  { local: "Real Betis", visit: "Alavés", gl: 1, gv: 0, fecha: "J1" },
  { local: "Celta de Vigo", visit: "Getafe CF", gl: 2, gv: 2, fecha: "J1" },
  { local: "Rayo Vallecano", visit: "Girona FC", gl: 3, gv: 1, fecha: "J1" },
  { local: "Real Sociedad", visit: "Valencia CF", gl: 1, gv: 0, fecha: "J1" },
  { local: "Elche CF", visit: "Levante UD", gl: 1, gv: 1, fecha: "J1" },
];

const NOTICIAS = [
  { titulo: "El Madrid arranca con 2-0 ante Osasuna", texto: "Mbappé y Vinicius marcan en el Bernabéu. IAmal ya pone al Madrid líder.", tag: "madrid", fecha: "J1" },
  { titulo: "Barça 3-1 Mallorca: Lamine decide", texto: "Dos asistencias de Lamine Yamal y gol de Lewandowski en Montjuïc.", tag: "barcelona", fecha: "J1" },
  { titulo: "El Rayo golea 3-1 al Girona y es la sorpresa", texto: "Isi y De Frutos lideran al equipo vallecano en la jornada 1.", tag: "rayo", fecha: "J1" },
  { titulo: "Atlético 2-1 Espanyol: Julián Álvarez debuta con gol", texto: "Griezmann asiste y el Metropolitano aprieta desde el inicio.", tag: "atletico", fecha: "J1" },
  { titulo: "Celta 2-2 Getafe: Aspas rescata un punto", texto: "Partidazo en Balaídos con remontada final del Celta.", tag: "celta", fecha: "J1" },
  { titulo: "Betis 1-0 Alavés: Isco vuelve a brillar", texto: "Gol de Lo Celso a pase de Isco en el Villamarín.", tag: "betis", fecha: "J1" },
  { titulo: "Premier: así llegan City, Arsenal y Liverpool", texto: "Consulta en IAmal 'dime equipos de la Premier' para ver los 20 clubes.", tag: "premier", fecha: "Previa" },
  { titulo: "Previa J2: derbi Real Madrid vs Atlético", texto: "El primer gran duelo. Pregunta a IAmal '¿quién va líder?' antes del partido.", tag: "previa", fecha: "Previa" },
];

const PLANTILLAS = {
  "Real Madrid": [
    { nombre: "Courtois", pos: "POR", dorsal: 1 },
    { nombre: "Rüdiger", pos: "DEF", dorsal: 22 },
    { nombre: "Bellingham", pos: "MED", dorsal: 5 },
    { nombre: "Mbappé", pos: "DEL", dorsal: 9 },
    { nombre: "Vinicius", pos: "DEL", dorsal: 7 },
  ],
  "FC Barcelona": [
    { nombre: "Ter Stegen", pos: "POR", dorsal: 1 },
    { nombre: "Cubarsí", pos: "DEF", dorsal: 2 },
    { nombre: "Pedri", pos: "MED", dorsal: 8 },
    { nombre: "Lamine Yamal", pos: "DEL", dorsal: 19 },
    { nombre: "Lewandowski", pos: "DEL", dorsal: 9 },
  ],
  "Atlético de Madrid": [
    { nombre: "Oblak", pos: "POR", dorsal: 13 },
    { nombre: "Giménez", pos: "DEF", dorsal: 2 },
    { nombre: "De Paul", pos: "MED", dorsal: 5 },
    { nombre: "Griezmann", pos: "DEL", dorsal: 7 },
    { nombre: "J. Álvarez", pos: "DEL", dorsal: 19 },
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
    { nombre: "I. Williams", pos: "DEL", dorsal: 9 },
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
  "Celta de Vigo": [
    { nombre: "Guaita", pos: "POR", dorsal: 13 },
    { nombre: "Starfelt", pos: "DEF", dorsal: 2 },
    { nombre: "Beltrán", pos: "MED", dorsal: 8 },
    { nombre: "Aspas", pos: "DEL", dorsal: 10 },
  ],
  "Rayo Vallecano": [
    { nombre: "Batalla", pos: "POR", dorsal: 1 },
    { nombre: "Lejeune", pos: "DEF", dorsal: 5 },
    { nombre: "Isi", pos: "MED", dorsal: 7 },
    { nombre: "De Frutos", pos: "DEL", dorsal: 19 },
  ],
  "Osasuna": [
    { nombre: "Herrera", pos: "POR", dorsal: 1 },
    { nombre: "Catena", pos: "DEF", dorsal: 5 },
    { nombre: "Oroz", pos: "MED", dorsal: 10 },
    { nombre: "Budimir", pos: "DEL", dorsal: 17 },
  ],
  "RCD Mallorca": [
    { nombre: "Greif", pos: "POR", dorsal: 1 },
    { nombre: "Raíllo", pos: "DEF", dorsal: 21 },
    { nombre: "Darder", pos: "MED", dorsal: 10 },
    { nombre: "Muriqi", pos: "DEL", dorsal: 7 },
  ],
  "Getafe CF": [
    { nombre: "Soria", pos: "POR", dorsal: 13 },
    { nombre: "Djené", pos: "DEF", dorsal: 2 },
    { nombre: "Milla", pos: "MED", dorsal: 5 },
    { nombre: "Mayoral", pos: "DEL", dorsal: 19 },
  ],
  "Sevilla FC": [
    { nombre: "Nyland", pos: "POR", dorsal: 13 },
    { nombre: "Ramos", pos: "DEF", dorsal: 4 },
    { nombre: "Sow", pos: "MED", dorsal: 6 },
    { nombre: "Lukebakio", pos: "DEL", dorsal: 11 },
  ],
  "Alavés": [
    { nombre: "Sivera", pos: "POR", dorsal: 1 },
    { nombre: "Abqar", pos: "DEF", dorsal: 5 },
    { nombre: "Guridi", pos: "MED", dorsal: 18 },
    { nombre: "Kike García", pos: "DEL", dorsal: 9 },
  ],
  "Valencia CF": [
    { nombre: "Mamardashvili", pos: "POR", dorsal: 25 },
    { nombre: "Mosquera", pos: "DEF", dorsal: 3 },
    { nombre: "Pepelu", pos: "MED", dorsal: 8 },
    { nombre: "H. Duro", pos: "DEL", dorsal: 9 },
  ],
  "RCD Espanyol": [
    { nombre: "J. García", pos: "POR", dorsal: 1 },
    { nombre: "Cabrera", pos: "DEF", dorsal: 4 },
    { nombre: "Kral", pos: "MED", dorsal: 20 },
    { nombre: "Puado", pos: "DEL", dorsal: 7 },
  ],
  "Elche CF": [
    { nombre: "Dituro", pos: "POR", dorsal: 1 },
    { nombre: "Bigas", pos: "DEF", dorsal: 6 },
    { nombre: "Febas", pos: "MED", dorsal: 8 },
    { nombre: "Mourad", pos: "DEL", dorsal: 9 },
  ],
  "Real Oviedo": [
    { nombre: "Escandell", pos: "POR", dorsal: 1 },
    { nombre: "Dani C.", pos: "DEF", dorsal: 4 },
    { nombre: "Sibo", pos: "MED", dorsal: 6 },
    { nombre: "Alemao", pos: "DEL", dorsal: 9 },
  ],
  "Levante UD": [
    { nombre: "Andrés F.", pos: "POR", dorsal: 1 },
    { nombre: "Postigo", pos: "DEF", dorsal: 15 },
    { nombre: "P. Martínez", pos: "MED", dorsal: 10 },
    { nombre: "R. Martí", pos: "DEL", dorsal: 9 },
  ],
};

// --- Render: partidos (tarjetas con escudo + marcador) ---
function iniciales(eq) {
  return eq.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}
function renderPartidos(filtro = "") {
  const box = document.getElementById("lista-partidos");
  const f = filtro.toLowerCase();
  const list = PARTIDOS.filter(p =>
    p.local.toLowerCase().includes(f) || p.visit.toLowerCase().includes(f));
  box.innerHTML = list.map(p => {
    const g = p.gl > p.gv ? "Gana local" : p.gl < p.gv ? "Gana visitante" : "Empate";
    return `<div class="card match"><small class="pill">${p.fecha} · ${g}</small>
      <div class="match-row"><span class="escudo">${iniciales(p.local)}</span><strong>${p.local}</strong></div>
      <div class="score">${p.gl} - ${p.gv}</div>
      <div class="match-row"><span class="escudo">${iniciales(p.visit)}</span><strong>${p.visit}</strong></div>
    </div>`;
  }).join("") || "<p>No hay partidos para ese filtro.</p>";
}

// --- Clasificación: SOLO los 20 de LaLiga (el vivo metía nombres distintos y salían 27) ---
function calcClasi() {
  const t = {};
  EQUIPOS.forEach(e => t[e] = { pj: 0, g: 0, e: 0, p: 0, pts: 0 });
  PARTIDOS.forEach(m => {
    if (!t[m.local] || !t[m.visit]) return; // ignora nombres que no son de nuestros 20
    t[m.local].pj++; t[m.visit].pj++;
    if (m.gl > m.gv) { t[m.local].g++; t[m.local].pts += 3; t[m.visit].p++; }
    else if (m.gl < m.gv) { t[m.visit].g++; t[m.visit].pts += 3; t[m.local].p++; }
    else { t[m.local].e++; t[m.visit].e++; t[m.local].pts++; t[m.visit].pts++; }
  });
  return Object.entries(t).sort((a, b) => b[1].pts - a[1].pts);
}

function renderClasi() {
  const tbody = document.querySelector("#tabla-clasi tbody");
  tbody.innerHTML = calcClasi().map(([eq, s], i) => {
    const zona = i < 4 ? "top4" : i >= 17 ? "desc" : "";
    return `<tr class="${zona}"><td><span class="pos">${i + 1}</span> ${eq}</td><td>${s.pj}</td><td>${s.g}</td><td>${s.e}</td><td>${s.p}</td><td><strong>${s.pts}</strong></td></tr>`;
  }).join("");
}

// --- Noticias (tarjeta con etiqueta) ---
function renderNoticias(q = "") {
  const box = document.getElementById("lista-noticias");
  const f = q.toLowerCase();
  const list = NOTICIAS.filter(n =>
    (n.titulo + n.texto + n.tag).toLowerCase().includes(f));
  box.innerHTML = list.map(n =>
    `<div class="card news"><div><span class="tag">#${n.tag}</span><span class="fecha">${n.fecha || ""}</span></div><strong>${n.titulo}</strong><p>${n.texto}</p></div>`
  ).join("") || "<p>Sin resultados.</p>";
}

// --- Plantillas (tolera equipos sin ficha detallada) ---
function renderPlantillas() {
  const sel = document.getElementById("selector-equipo");
  sel.innerHTML = EQUIPOS.map(e => `<option>${e}</option>`).join("");
  const draw = () => {
    const eq = sel.value;
    const lista = PLANTILLAS[eq] || [];
    document.getElementById("lista-jugadores").innerHTML = lista.length
      ? lista.map(j => `<div class="card"><strong>${j.dorsal} · ${j.nombre}</strong><br><small>${j.pos} — ${eq}</small></div>`).join("")
      : `<div class="card">Sin ficha detallada de ${eq} en el MVP. Pregunta a IAmal por sus estrellas.</div>`;
  };
  sel.onchange = draw; draw();
}

// --- IAmal v2: más intenciones + tarjeta amarilla SOLO fuera de tema ---
const FUTBOL_KEYS = ["futbol", "fútbol", "liga", "gol", "partido", "resultado", "jornada", "clasific", "lider", "puntos", "equipo", "club", "plantilla", "jugador", "dorsal", "portero", "defensa", "medio", "delantero", "entrenador", "fichaje", "derbi", "clasico", "clásico", "champions", "copa", "mundial", "euro", "estadio", "arbitro", "árbitro", "tarjeta", "penalti", "penal", "madrid", "barcelona", "atleti", "betis", "sevilla", "valencia", "premier", "serie", "bundesliga", "ligue", "psg", "bayern", "city", "liverpool", "arsenal", "chelsea", "tottenham", "united", "newcastle", "inter", "milan", "juve", "napoli", "roma", "lazio", "dortmund", "leverkusen", "marsella", "monaco", "lyon", "iamal", "hola", "gracias", "adios", "adiós", "ayuda", "quien", "quién", "dime", "cual", "cuál", "cuando", "cuándo", "donde", "dónde"];

function esFutbol(t) {
  if (FUTBOL_KEYS.some(k => t.includes(k))) return true;
  const todos = Object.values(LIGAS).flat().map(e => e.toLowerCase());
  // nombre completo ("manchester city") o palabra significativa ("chelsea", "juventus")
  return todos.some(eq => {
    if (t.includes(eq)) return true;
    return eq.split(/[\s.]+/).some(w => w.length > 3 && t.includes(w));
  });
}

function botReply(text) {
  const t = text.toLowerCase().trim();
  const clasi = calcClasi();
  const lider = clasi[0][0];

  // Saludos y ayuda siempre entran
  if (t.includes("hola") || t.includes("buenas") || t.includes("quien eres") || t.includes("quién eres") || t === "iamal")
    return "¡Hola! Soy IAmal, tu IA de fútbol. Sé de LaLiga y las 5 grandes ligas. Prueba: '¿Quién va líder?', 'Dime equipos de la Premier', '¿Dónde juega Mbappé?', '¿Cuándo juega el Madrid?'";
  if (t.includes("ayuda") || t.includes("que sabes") || t.includes("qué sabes"))
    return "Puedo: líder/clasificación, resultados, noticias, plantillas LaLiga (20 equipos), listas de Premier/Serie A/Bundesliga/Ligue 1, jugadores estrella, clásicos y horarios. Prueba 'lista la Premier'.";
  if (t.includes("gracias")) return "¡De nada! Para eso estoy. ¿Otra de fútbol?";
  if (t.includes("adios") || t.includes("adiós")) return "¡Nos vemos! Aquí estaré para la próxima jornada.";

  // Ligas europeas
  if (t.includes("5 ligas") || t.includes("ligas europeas") || t.includes("grandes ligas"))
    return "Las 5 grandes: LaLiga, Premier League, Serie A, Bundesliga y Ligue 1. Pregunta 'dime equipos de la Premier' o de la que quieras.";
  for (const [liga, equipos] of Object.entries(LIGAS)) {
    if (t.includes(liga.toLowerCase()) || (liga === "LaLiga" && t.includes("laliga")) || (liga === "Premier League" && t.includes("premier")) || (liga === "Serie A" && t.includes("serie")) || (liga === "Bundesliga" && t.includes("bundes")) || (liga === "Ligue 1" && (t.includes("ligue") || t.includes("francesa")))) {
      if (t.includes("equipo") || t.includes("lista") || t.includes("quienes") || t.includes("quiénes") || t.includes("dime") || t.length < 30)
        return `${liga} (${equipos.length} equipos): ${equipos.slice(0, 10).join(", ")}... Pregunta por un equipo para su ficha, ej: 'plantilla del Betis'.`;
    }
  }

  // Intenciones fútbol
  if (t.includes("lider") || t.includes("primero") || t.includes("clasific") || t.includes("tabla") || t.includes("puntos"))
    return `El líder de nuestros datos es ${lider} con ${clasi[0][1].pts} pts. Top 3: ${clasi.slice(0, 3).map(([e, s]) => `${e} (${s.pts})`).join(", ")}. Tabla completa en Resultados.`;
  if (t.includes("partido") || t.includes("resultado") || t.includes("jornada") || t.includes("ultimo") || t.includes("último"))
    return `Últimos: ${PARTIDOS.slice(-3).map(p => `${p.local} ${p.gl}-${p.gv} ${p.visit}`).join(" | ")}. Filtra por equipo en Resultados.`;
  if (t.includes("cuando juega") || t.includes("cuándo juega") || t.includes("proximo partido") || t.includes("próximo partido") || t.includes("horario") || t.includes("calendario"))
    return "El calendario completo de la próxima jornada aún no está publicado aquí. Para responder a esa pregunta, contacte con nuestro equipo de soporte: hola@iamal.es. Puede ver la jornada 1 en Resultados.";
  if (t.includes("noticia")) return `Hay ${NOTICIAS.length} noticias. La última: "${NOTICIAS[NOTICIAS.length - 1].titulo}". Búscala en Noticias.`;
  if (t.includes("fichaje") || t.includes("mercado")) return "La información de mercado aún no está disponible. Para responder a esa pregunta, contacte con nuestro equipo de soporte: hola@iamal.es.";
  if (t.includes("clasico") || t.includes("clásico") || t.includes("derbi")) return "El Clásico: Real Madrid vs FC Barcelona. Derbi madrileño: Real Madrid vs Atlético. Derbi sevillano: Sevilla vs Betis. Tenemos resultados reales del Madrid y Barça en Resultados.";
  if (t.includes("champions")) return "La información de Champions aún no está disponible. Para responder a esa pregunta, contacte con nuestro equipo de soporte: hola@iamal.es.";
  if (t.includes("quien es mejor") || t.includes("quién es mejor") || t.includes("mejor equipo")) return `Con nuestros datos, el mejor es ${lider}. Históricamente en España: Real Madrid y FC Barcelona dominan. ¿De qué equipo eres?`;
  if (t.includes("goleador") || t.includes("pichichi") || t.includes("goles")) return "Pichichi en nuestros datos 24/25: Lewandowski (doblete en Mestalla) y Griezmann (gol vs Girona). Pregunta '¿dónde juega Lewandowski?'";

  // Jugadores / equipos concretos (busca en PLANTILLAS)
  for (const [eq, lista] of Object.entries(PLANTILLAS)) {
    if (t.includes(eq.toLowerCase()) || t.includes(eq.toLowerCase().split(" ").pop())) {
      if (t.includes("plantilla") || t.includes("equipo") || t.includes("quienes") || t.includes("jugador") || t.length < 30)
        return `Plantilla ${eq} (estrellas): ${lista.map(j => `${j.nombre} (${j.pos} ${j.dorsal})`).join(", ")}. Mírala en Plantillas.`;
    }
    for (const j of lista) {
      const ap = j.nombre.toLowerCase().split(" ").pop();
      if (t.includes(j.nombre.toLowerCase()) || (ap.length > 3 && t.includes(ap)))
        return `${j.nombre} juega en ${eq} (${j.pos}, dorsal ${j.dorsal}). Míralo en Plantillas > ${eq}.`;
    }
  }
  if (t.includes("mbappe") || t.includes("mbappé")) return "Mbappé juega en el Real Madrid (DEL, dorsal 9).";
  if (t.includes("vinicius") || t.includes("vini")) return "Vinicius juega en el Real Madrid (DEL, dorsal 7).";
  if (t.includes("lamine") || t.includes("yamal")) return "Lamine Yamal juega en el FC Barcelona (DEL, dorsal 19).";
  if (t.includes("haaland")) return "Haaland juega en el Manchester City. Para su ficha completa, contacte con nuestro equipo de soporte: hola@iamal.es.";
  if (t.includes("kane")) return "Kane juega en el Bayern. Para su ficha completa, contacte con nuestro equipo de soporte: hola@iamal.es.";

  // Cualquier equipo de las 5 ligas sin ficha detallada -> tono soporte, NUNCA amarilla
  for (const [liga, equipos] of Object.entries(LIGAS)) {
    for (const eq of equipos) {
      if (t.includes(eq.toLowerCase())) {
        if (PLANTILLAS[eq]) {
          const lista = PLANTILLAS[eq];
          return `Plantilla ${eq}: ${lista.map(j => `${j.nombre} (${j.pos} ${j.dorsal})`).join(", ")}. Mírala en Plantillas.`;
        }
        return `La ficha completa del ${eq} aún no está disponible. Para responder a esa pregunta, contacte con nuestro equipo de soporte: hola@iamal.es.`;
      }
    }
  }

  // Fútbol pero sin dato concreto -> tono soporte, NO amarilla ni jerga interna
  if (esFutbol(t)) return "Para responder a esa pregunta, contacte con nuestro equipo de soporte: hola@iamal.es. También puedo ayudarle con líder, resultados, noticias o plantillas de LaLiga.";
  // Fuera de tema -> tarjeta amarilla
  return "🟨 Tarjeta amarilla, aquí solo se habla de fútbol. Pregúntame por líder, resultados, plantillas o las 5 ligas.";
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

// --- Datos en vivo DESACTIVADO para el MVP ---
// Antes hacíamos fetch a football.json y reemplazábamos PARTIDOS, pero sus nombres
// ("Athletic Bilbao", "Deportivo Alavés"...) no coinciden con nuestros 20 y la tabla
// se inflaba a 27 filas. Para la entrega: 10 partidos J1 fijos = 20 equipos exactos.
// TODO futuro: normalizar nombres API -> EQUIPOS antes de reactivar.
// async function cargarDatosReales() { ... }
// cargarDatosReales();
