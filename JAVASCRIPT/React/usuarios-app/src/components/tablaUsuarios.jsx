function highlight(text, search) {
  if (!search) return text;

  const regex = new RegExp(`(${search})`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
}
function TablaUsuarios({ users, search }) {
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
