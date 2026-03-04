const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const searchInput = document.getElementById("globalSearch");
const trendingGrid = document.getElementById("trendingGrid");
const typeResultsGrid = document.getElementById("typeResultsGrid");
const typeResultsTitle = document.getElementById("typeResultsTitle");
const typeResultsMeta = document.getElementById("typeResultsMeta");

// Load saved theme (if any)
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || savedTheme === "light") {
  root.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
} else {
  themeToggle.textContent =
    root.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
}

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
});

function cardHTML(p) {
  const types = (p.types || [])
    .map((t) => {
      const k = String(t).toLowerCase();
      return `<span class="pill ${k}">${t}</span>`;
    })
    .join("");

  return `
    <article class="poke-card" data-name="${p.name}" data-description="${p.description || ""}">
      <div class="img"></div>
      <div class="body">
        <p class="name">${p.name}</p>
        <div class="type-row">${types}</div>
      </div>
    </article>
  `;
}

// Type icons map
const typeIcons = {
  fire: "🔥", water: "💧", grass: "🌿", electric: "⚡",
  psychic: "🔮", fighting: "🥊", ghost: "👻", dragon: "🐉",
  dark: "🌑", fairy: "💖", normal: "⚪", flying: "🕊️",
  poison: "☠️", ice: "❄️", ground: "⛰️", rock: "🪨",
  bug: "🐛", steel: "⚙️"
};

// ✅ Dynamically load all types on page load
async function loadTypes() {
  const typeGrid = document.getElementById("typeGrid");
  const res = await fetch("/pokemon/type");
  if (!res.ok) return;

  const types = await res.json();
  typeGrid.innerHTML = types.map((type) => {
    const k = type.toLowerCase();
    const icon = typeIcons[k] || "❓";
    return `
      <button class="type-btn ${k}" data-type="${k}" type="button">
        <span class="type-icon" aria-hidden="true">${icon}</span>
        <span class="type-label">${type}</span>
      </button>
    `;
  }).join("");
}

loadTypes();

// ✅ Type button click handler — TOP LEVEL, runs once on page load
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".type-btn");
  if (!btn) return;

  const type = btn.dataset.type;
  if (!type) return;

  typeResultsTitle.textContent = `Type: ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  typeResultsMeta.textContent = "Loading...";
  typeResultsGrid.innerHTML = "";

  const res = await fetch(`/pokemon/type/${encodeURIComponent(type)}`);

  if (!res.ok) {
    typeResultsMeta.textContent = "Type not found.";
    return;
  }

  const list = await res.json();
  typeResultsMeta.textContent = `${list.length} Pokémon found`;
  typeResultsGrid.innerHTML = list.map(cardHTML).join("");
  typeResultsGrid.closest("section").scrollIntoView({ behavior: "smooth", block: "start" });
});

// Search handler
searchInput.addEventListener("keydown", async (e) => {
  if (e.key !== "Enter") return;

  const q = searchInput.value.trim();
  if (!q) return;

  trendingGrid.innerHTML = "";

  const res = await fetch(`/pokemon/name/${encodeURIComponent(q)}`);

  if (!res.ok) {
    trendingGrid.innerHTML = `
      <div class="muted">No exact match for "${q}". Try a full name like "Pikachu".</div>
    `;
    return;
  }

  const pokemon = await res.json();
  trendingGrid.innerHTML = cardHTML(pokemon);
});

// Card click — navigate to detail page
document.addEventListener("click", (e) => {
  const card = e.target.closest(".poke-card[data-name]");
  if (!card) return;
  window.location.href = `/detail.html?name=${encodeURIComponent(card.dataset.name)}`;
});
