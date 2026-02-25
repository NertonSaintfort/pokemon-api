const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const searchInput = document.getElementById("globalSearch");
const trendingGrid = document.getElementById("trendingGrid");

// Load saved theme (if any)
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || savedTheme === "light") {
  root.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
} else {
  // default icon based on current HTML attribute
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
    <article class="poke-card">
      <div class="img"></div>
      <div class="body">
        <p class="name">${p.name}</p>
        <div class="type-row">${types}</div>
      </div>
    </article>
  `;
}

searchInput.addEventListener("keydown", async (e) => {
  if (e.key !== "Enter") return;

  const q = searchInput.value.trim();
  if (!q) return;

  trendingGrid.innerHTML = ""; // clear current cards

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
