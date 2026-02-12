function Spinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="spinner-text">Cargando...</p>
      </div>
    </div>
  );
}

export default Spinner;

