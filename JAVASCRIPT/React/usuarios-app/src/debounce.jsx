import { useState, useEffect } from "react";

// Hook personalizado para "debouncear" un valor.
// Retrasa la actualización del valor hasta que pase un tiempo sin cambios.
export default function useDebounce(value, delay = 300) {

  // Estado que almacenará el valor después del debounce
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Se crea un temporizador que actualiza el valor
    // después del tiempo especificado (delay)
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function:
    // Si el value cambia antes de que termine el delay,
    // se limpia el timeout anterior para evitar ejecuciones innecesarias.
    return () => clearTimeout(timer);

    // El efecto se ejecuta cada vez que cambia el value o el delay
  }, [value, delay]);

  // Se retorna el valor ya "debounced"
  return debouncedValue;
}
