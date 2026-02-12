// Componente visual reutilizable que indica estado de carga.
// Se muestra cuando la aplicación está realizando operaciones asíncronas
// como consumo de API.
function Spinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        {/* Animación visual controlada mediante CSS */}
        <div className="spinner"></div>

        {/* Mensaje descriptivo para mejorar experiencia y accesibilidad */}
        <p className="spinner-text">Cargando...</p>
      </div>
    </div>
  );
}

export default Spinner;
