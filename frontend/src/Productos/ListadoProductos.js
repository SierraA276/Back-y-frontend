import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListadoProductos() {
  const urlBase = "http://localhost:8080/tdb-producto/productos"; // Ruta base para los productos
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const resultado = await axios.get(urlBase);
      setProductos(resultado.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${urlBase}/${id}`);
      cargarProductos();
    } catch (error) {
      console.error("Error al eliminar producto", error);
      alert("Hubo un problema al eliminar el producto. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Listado de Productos</h3>
      </div>

      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio Unitario</th>
            <th scope="col">Stock</th>
            <th scope="col">Facturas</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.idProducto}>
              <th scope="row">{producto.idProducto}</th>
              <td>{producto.nombreProducto}</td>
              <td>{producto.descripcionProducto}</td>
              <td>{producto.precioUnitario}</td>
              <td>{producto.stock}</td>
              <td>
                {producto.facturaIds.length > 0 ? (
                  <ul>
                    {producto.facturaIds.map((facturaId, idx) => (
                      <li key={idx}>{`Factura ID: ${facturaId}`}</li>
                    ))}
                  </ul>
                ) : (
                  "Sin facturas"
                )}
              </td>
              <td>
                <div>
                  <Link
                    to={`/editar-producto/${producto.idProducto}`}
                    className="btn btn-warning btn-sm me-3"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => eliminarProducto(producto.idProducto)}
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
