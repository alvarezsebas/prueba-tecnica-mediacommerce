// Función utilitaria para resaltar coincidencias de búsqueda dentro de un texto.
// Se utiliza una expresión regular para envolver coincidencias con un span.
// Nota: En un entorno productivo se debería sanitizar el contenido para evitar XSS.
function highlight(text, search) {
  if (!search) return text;

  const regex = new RegExp(`(${search})`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
}

// Componente encargado exclusivamente de renderizar la tabla de usuarios.
// Recibe la lista filtrada y el texto de búsqueda desde el componente padre.
function TablaUsuarios({ users, search }) {

  // Estado vacío cuando no hay resultados
  if (users.length === 0) {
    return <p>No se encontraron resultados.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Compañía</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* Se utiliza dangerouslySetInnerHTML para renderizar
                 texto con formato HTML generado dinámicamente */}
              <td
                dangerouslySetInnerHTML={{
                  __html: highlight(user.name, search),
                }}
              />

              <td
                dangerouslySetInnerHTML={{
                  __html: highlight(user.email, search),
                }}
              />

              <td
                dangerouslySetInnerHTML={{
                  __html: highlight(user.phone, search),
                }}
              />

              <td
                dangerouslySetInnerHTML={{
                  __html: highlight(user.company.name, search),
                }}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaUsuarios;
