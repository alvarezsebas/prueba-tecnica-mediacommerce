// Componente reutilizable para paginación.
// Recibe el número total de páginas, la página actual
// y la función para actualizar el estado desde el componente padre.
function Pagination({ totalPages, currentPage, setCurrentPage }) {
  return (
    <div className="pagination">
      {
        // Se genera dinámicamente un arreglo con la cantidad total de páginas
        // para renderizar los botones de navegación.
        Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i} // En escenarios más complejos se recomienda un id único
            className={currentPage === i + 1 ? "active" : ""}

            // Se actualiza la página seleccionada
            // delegando el control al componente padre.
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))
      }
    </div>
  );
}

export default Pagination;
