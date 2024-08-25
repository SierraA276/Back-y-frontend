import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListadoUsuarios() {
  const urlBase = "http://localhost:8080/tdb-usuario/usuarios"; // Ruta base para los usuarios
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const resultado = await axios.get(urlBase);
      setUsuarios(resultado.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`${urlBase}/${id}`);
      cargarUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Hubo un problema al eliminar el usuario. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Listado de Usuarios</h3>
      </div>

      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Email</th>
            <th scope="col">Rol</th>
            <th scope="col">Topes Gastos Mensuales</th>
            <th scope="col">Deuda Maxima</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, indice) => (
            <tr key={indice}>
              <th scope="row">{usuario.idUsuario}</th>
              <td>{usuario.nombreUsuario}</td>
              <td>{usuario.apellidoUsuario}</td>
              <td>{usuario.emailUsuario}</td>
              <td>{usuario.nombreRol || "No asignado"}</td>
              <td>{usuario.topeGastosMensuales?.cantidadMaxima || "No asignado"}</td>
              <td>{usuario.maximaDeuda?.cantidadMaxima || "No asignado"}</td>
              <td>
                <div>
                  <Link
                    to={`/editar/${usuario.idUsuario}`}
                    className="btn btn-warning btn-sm me-3"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => eliminarUsuario(usuario.idUsuario)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
