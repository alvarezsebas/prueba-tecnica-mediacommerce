const API_URL = "https://jsonplaceholder.typicode.com/users";

const searchInput = document.getElementById("searchInput");
const suggestionsList = document.getElementById("suggestions");
const tableBody = document.getElementById("usersTable");
const spinner = document.getElementById("spinnerOverlay");

let users = [];

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", init);

function init() {
  fetchUsers();
  searchInput.addEventListener("input", debounce(handleSearch, 300));
}

/* =========================
   FETCH
========================= */

async function fetchUsers() {
  try {
    toggleSpinner(true);

    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener usuarios");

    users = await response.json();
    renderTable(users);

  } catch (error) {
    alert("No fue posible cargar los usuarios.");
  } finally {
    toggleSpinner(false);
  }
}

/* =========================
   RENDER TABLE
========================= */

function renderTable(data) {
  if (!data.length) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center;">
          No se encontraron resultados
        </td>
      </tr>
    `;
    return;
  }

  const searchValue = searchInput.value.toLowerCase();

  tableBody.innerHTML = data.map(user => `
    <tr>
      <td>${highlight(user.name, searchValue)}</td>
      <td>${highlight(user.email, searchValue)}</td>
      <td>${highlight(user.phone, searchValue)}</td>
      <td>${highlight(user.company.name, searchValue)}</td>
    </tr>
  `).join("");
}

/* =========================
   SEARCH + SUGGESTIONS
========================= */

function handleSearch(e) {
  const value = e.target.value.toLowerCase();

  const filtered = users.filter(user => {
    const combined = `
      ${user.name}
      ${user.email}
      ${user.phone}
      ${user.company.name}
    `.toLowerCase();

    return combined.includes(value);
  });

  renderTable(filtered);
  renderSuggestions(value);
}

function renderSuggestions(search) {
  if (!search) {
    suggestionsList.classList.add("hidden");
    return;
  }

  const matches = users
    .flatMap(user => [
      user.name,
      user.email,
      user.phone,
      user.company.name
    ])
    .filter(value => value.toLowerCase().includes(search));

  const unique = [...new Set(matches)].slice(0, 5);

  if (!unique.length) {
    suggestionsList.classList.add("hidden");
    return;
  }

  suggestionsList.innerHTML = unique
    .map(item => `<li>${item}</li>`)
    .join("");

  suggestionsList.classList.remove("hidden");

  document.querySelectorAll("#suggestions li").forEach(li => {
    li.addEventListener("click", () => {
      searchInput.value = li.textContent;
      suggestionsList.classList.add("hidden");
      handleSearch({ target: searchInput });
    });
  });
}

/* =========================
   UTILITIES
========================= */

function toggleSpinner(state) {
  spinner.classList.toggle("hidden", !state);
}

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function highlight(text, search) {
  if (!search) return text;

  const regex = new RegExp(`(${search})`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
}
