// API pública utilizada para obtener los usuarios.
// Se centraliza la URL para facilitar mantenimiento o cambios futuros.
const API_URL = "https://jsonplaceholder.typicode.com/users";

// Referencias al DOM para evitar búsquedas repetidas
// y mejorar el rendimiento.
const searchInput = document.getElementById("searchInput");
const suggestionsList = document.getElementById("suggestions");
const tableBody = document.getElementById("usersTable");
const spinner = document.getElementById("spinnerOverlay");

// Estado en memoria de los usuarios obtenidos desde la API.
// Se utiliza como fuente de datos para filtros y sugerencias.
let users = [];

/* =========================
   INIT
========================= */

// Se inicializa la aplicación cuando el DOM está listo.
// Esto garantiza que los elementos HTML existan antes de usarlos.
document.addEventListener("DOMContentLoaded", init);

function init() {
  // Carga inicial de datos desde la API
  fetchUsers();

  // Se aplica debounce al input de búsqueda para evitar
  // ejecutar filtros en cada pulsación de teclado.
  searchInput.addEventListener("input", debounce(handleSearch, 300));
}

/* =========================
   FETCH
========================= */

// Obtiene los usuarios desde la API pública.
// Maneja estados de carga, errores y renderizado inicial.
async function fetchUsers() {
  try {
    toggleSpinner(true);

    const response = await fetch(API_URL);

    // Validación explícita de respuesta HTTP
    if (!response.ok) throw new Error("Error al obtener usuarios");

    users = await response.json();

    // Render inicial con todos los usuarios
    renderTable(users);

  } catch (error) {
    // Manejo simple de errores para notificar al usuario
    alert("No fue posible cargar los usuarios.");
  } finally {
    toggleSpinner(false);
  }
}

/* =========================
   RENDER TABLE
========================= */

// Renderiza dinámicamente la tabla de usuarios.
// Recibe la lista filtrada o completa.
function renderTable(data) {

  // Estado vacío cuando no hay resultados
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

  // Renderizado basado en template strings.
  // Se utiliza highlight para resaltar coincidencias de búsqueda.
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

// Maneja el filtrado de usuarios en memoria.
// Evita llamadas adicionales a la API.
function handleSearch(e) {
  const value = e.target.value.toLowerCase();

  const filtered = users.filter(user => {

    // Se combinan múltiples campos para permitir búsqueda global
    // (nombre, email, teléfono y empresa).
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

// Genera sugerencias de autocompletado basadas en coincidencias.
function renderSuggestions(search) {
  if (!search) {
    suggestionsList.classList.add("hidden");
    return;
  }

  // Se extraen posibles coincidencias desde múltiples campos
  const matches = users
    .flatMap(user => [
      user.name,
      user.email,
      user.phone,
      user.company.name
    ])
    .filter(value => value.toLowerCase().includes(search));

  // Eliminación de duplicados y límite de resultados
  const unique = [...new Set(matches)].slice(0, 5);

  if (!unique.length) {
    suggestionsList.classList.add("hidden");
    return;
  }

  suggestionsList.innerHTML = unique
    .map(item => `<li>${item}</li>`)
    .join("");

  suggestionsList.classList.remove("hidden");

  // Permite seleccionar sugerencias con click
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

// Controla la visibilidad del loader global.
function toggleSpinner(state) {
  spinner.classList.toggle("hidden", !state);
}

// Implementación de debounce para optimizar el rendimiento
// evitando ejecuciones excesivas de funciones en eventos frecuentes.
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Resalta coincidencias de búsqueda dentro del texto.
// Nota: En producción se debería sanitizar para evitar XSS.
function highlight(text, search) {
  if (!search) return text;

  const regex = new RegExp(`(${search})`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
}
