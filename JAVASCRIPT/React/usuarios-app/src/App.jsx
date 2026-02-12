import { useEffect, useState, useMemo } from "react";
import TablaUsuarios from "./components/tablaUsuarios";
import Spinner from "./components/spinner";
import BuscadorBar from "./components/buscador";
import useDebounce from "./debounce";

// API pública utilizada como fuente de datos.
// Centralizar la URL facilita mantenimiento y pruebas.
const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {

  // Estado principal de la aplicación.
  // Se separan responsabilidades para mantener control claro de la UI.
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  // Hook personalizado para evitar ejecutar lógica de filtrado
  // en cada pulsación de teclado.
  const debouncedSearch = useDebounce(search, 300);

  /* =============================
     FETCH
  ============================= */

  // Carga inicial de datos al montar el componente.
  // Se maneja loading, error y respuesta HTTP.
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        // Validación explícita de la respuesta HTTP
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }

        const data = await response.json();
        setUsers(data);

      } catch (err) {
        console.error(err);
        setError("No fue posible cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* =============================
     FILTRADO OPTIMIZADO
  ============================= */

  // Se utiliza useMemo para evitar recalcular el filtro
  // en cada render del componente.
  // Solo se ejecuta cuando cambian users o debouncedSearch.
  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return users;

    const value = debouncedSearch.toLowerCase();

    return users.filter((user) => {
      const combinedFields = `
        ${user.name}
        ${user.email}
        ${user.phone}
        ${user.company.name}
      `.toLowerCase();

      return combinedFields.includes(value);
    });
  }, [debouncedSearch, users]);

  /* =============================
     SUGERENCIAS AUTOCOMPLETE
  ============================= */

  // Generación de sugerencias basada en coincidencias de búsqueda.
  // Se memoiza para evitar recomputaciones innecesarias.
  const suggestions = useMemo(() => {
    if (!debouncedSearch) return [];

    const lower = debouncedSearch.toLowerCase();

    const matches = users
      .flatMap(user => [
        user.name,
        user.email,
        user.phone,
        user.company.name
      ])
      .filter(value => value.toLowerCase().includes(lower));

    // Eliminación de duplicados y límite de resultados
    return [...new Set(matches)].slice(0, 5);
  }, [debouncedSearch, users]);

  return (
    <div className="container">
      <h1>Listado de Usuarios</h1>

      {/* Componente de búsqueda desacoplado de la lógica principal */}
      <BuscadorBar
        search={search}
        setSearch={setSearch}
        suggestions={suggestions}
      />

      {/* Indicador de carga */}
      {loading && <Spinner />}

      {/* Manejo visual de errores */}
      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {/* Render condicional para evitar renderizar la tabla
         cuando la aplicación está cargando o en error */}
      {!loading && !error && (
        <TablaUsuarios
          users={filteredUsers}
          search={debouncedSearch}
        />
      )}
    </div>
  );
}

export default App;
