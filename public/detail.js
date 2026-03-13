// Theme (shared logic)
/* The code snippet you provided is setting up the functionality for a theme toggle feature on a
webpage using JavaScript. */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");

/* This block of code is responsible for setting up a theme toggle functionality on a webpage using
JavaScript. Here's a breakdown of what it does: */
if (savedTheme === "dark" || savedTheme === "light") {
  root.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
} else {
  themeToggle.textContent =
    root.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
}
themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
});

// Load Pokémon detail
/* `const name = new URLSearchParams(window.location.search).get("name");` is a line of code in
JavaScript that is extracting the value of the query parameter "name" from the URL of the current
webpage. */
const name = new URLSearchParams(window.location.search).get("name");

/**
 * The function `loadDetail` is an asynchronous function that fetches and displays detailed information
 * about a Pokémon based on its name, including its types and a placeholder for additional details.
 * @returns The `loadDetail` function is returning different HTML content based on the conditions it
 * checks. Here is a summary of what is being returned in each scenario:
 */
async function loadDetail() {
  const main = document.getElementById("detailMain");

  if (!name) {
    main.innerHTML =
      '<p class="muted">No Pokémon specified. <a href="/">Go back</a></p>';
    return;
  }

  const res = await fetch(`/pokemon/name/${encodeURIComponent(name)}`);
  if (!res.ok) {
    main.innerHTML = `<p class="muted">Pokémon "${name}" not found. <a href="/">Go back</a></p>`;
    return;
  }

  const p = await res.json();
  document.title = `Pokédex – ${
    p.name.charAt(0).toUpperCase() + p.name.slice(1)
  }`;

  const types = (p.types || [])
    .map((t) => `<span class="pill ${t.toLowerCase()}">${t}</span>`)
    .join("");

  main.innerHTML = `
    <a href="/" class="nav-item" style="display:inline-flex;width:auto;margin-bottom:20px;">
      <span class="nav-icon">←</span>
      <span>Back</span>
    </a>

    <div class="detail-card">
      <div class="detail-img">
        <!-- Add <img src="..." alt="${p.name}"> here when you have images -->
        <span>No image yet</span>
      </div>

      <div>
        <p class="detail-id">#${p.id}</p>
        <h1 class="detail-name">${p.name}</h1>
        <div class="type-row" style="margin-bottom:20px;">${types}</div>
        <p class="detail-desc">${
          p.description || "No description available."
        }</p>

        <div class="detail-extra">
          <!-- Add more fields here: stats, abilities, evolutions, etc. -->
          <p>More info coming soon…</p>
        </div>
      </div>
    </div>
  `;
}

loadDetail();
