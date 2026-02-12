import { useState } from "react";

// Componente controlado encargado exclusivamente de la búsqueda.
// Recibe el estado y las sugerencias desde el componente padre,
// manteniendo bajo acoplamiento y reutilización.
function SearchBar({ search, setSearch, suggestions }) {

  // Estado local para controlar visibilidad del dropdown
  // sin afectar el estado global de búsqueda.
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Maneja la selección de una sugerencia.
  // Actualiza el valor de búsqueda y oculta el listado.
  const handleSelect = (value) => {
    setSearch(value);
    setShowSuggestions(false);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar por cualquier dato..."
        value={search}

        // Se actualiza el estado global de búsqueda.
        // La lógica de filtrado se ejecuta en el componente padre.
        onChange={(e) => {
          setSearch(e.target.value);
          setShowSuggestions(true);
        }}

        // Se muestran sugerencias al enfocar el input.
        onFocus={() => setShowSuggestions(true)}

        // Se usa un pequeño delay para permitir que el click
        // sobre una sugerencia ocurra antes de ocultar la lista.
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />

      {/* Render condicional de sugerencias */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item, index) => (
            <li
              key={index} // En producción se recomienda un id único
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;

