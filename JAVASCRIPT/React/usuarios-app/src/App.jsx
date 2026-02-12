import { useEffect, useState, useMemo } from "react";
import TablaUsuarios from "./components/tablaUsuarios";
import Spinner from "./components/spinner";
import BuscadorBar from "./components/buscador";
import useDebounce from "./debounce";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  /* =============================
     FETCH
  ============================= */

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

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

    return [...new Set(matches)].slice(0, 5);
  }, [debouncedSearch, users]);

  return (
    <div className="container">
      <h1>Listado de Usuarios</h1>

      <BuscadorBar
        search={search}
        setSearch={setSearch}
        suggestions={suggestions}
      />

      {loading && <Spinner />}

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

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
