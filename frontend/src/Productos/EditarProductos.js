import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EditarProductos() {
  const urlDB = "http://localhost:8080/tdb-producto/productos";
  const navigate = useNavigate();
  const { id } = useParams();

  const [producto, setProducto] = useState({
    nombreProducto: "",
    descripcionProducto: "",
    precioUnitario: "",
    stock: ""
  });

  const [errores, setErrores] = useState({
    nombreProducto: "",
    descripcionProducto: "",
    precioUnitario: "",
    stock: ""
  });

  const { nombreProducto, descripcionProducto, precioUnitario, stock } = producto;

  // Cargar datos del producto desde el backend
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resultadoProducto = await axios.get(`${urlDB}/${id}`);
        setProducto(resultadoProducto.data);
      } catch (error) {
        console.error("Error al cargar datos", error);
      }
    };
    cargarDatos();
  }, [id]);

  // Validación de campos
  const validarCampo = (name, value) => {
    let mensajeError = "";
    if (name === 'nombreProducto' || name === 'descripcionProducto') {
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      if (!regex.test(value)) {
        mensajeError = "Caracteres no permitidos";
      }
    } else if (name === 'precioUnitario') {
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        mensajeError = "Debe ser un número válido (hasta dos decimales)";
      }
    } else if (name === 'stock') {
      if (!/^\d+$/.test(value)) {
        mensajeError = "Debe ser un número entero";
      }
    }
    setErrores({ ...errores, [name]: mensajeError });
  };

  // Captura los cambios en los campos del formulario
  const onInputChange = (e) => {
    const { name, value } = e.target;
    validarCampo(name, value);
    setProducto({
      ...producto,
      [name]: value
    });
  };

  // Enviar el formulario y guardar los cambios
  const onSubmit = async (e) => {
    e.preventDefault();

    // Verifica si hay errores antes de enviar el formulario
    const hayErrores = Object.values(errores).some((error) => error !== "");
    if (hayErrores) {
      console.log("Existen errores en los campos, no se puede enviar el formulario.");
      return;
    }

    try {
      // Actualizar producto
      await axios.put(`${urlDB}/${id}`, {
        nombreProducto: producto.nombreProducto,
        descripcionProducto: producto.descripcionProducto,
        precioUnitario: parseFloat(producto.precioUnitario),  // Convertir el precio a número flotante
        stock: parseInt(producto.stock, 10)                   // Convertir el stock a número entero
      });
      console.log("Producto actualizado correctamente.");
      // Navegar a la lista de productos después de guardar los cambios
      navigate("/productos");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <div className='container'>
      <div className='container text-center' style={{ margin: '30px' }}>
        <h3>Editar Producto</h3>
      </div>

      <form onSubmit={onSubmit}>
        <div className='mb-3'>
          <label htmlFor='nombreProducto' className='form-label'>Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombreProducto"
            name='nombreProducto'
            value={nombreProducto}
            onChange={onInputChange}
            required
          />
          {errores.nombreProducto && <div className="text-danger">{errores.nombreProducto}</div>}
        </div>
        <div className='mb-3'>
          <label htmlFor='descripcionProducto' className='form-label'>Descripción</label>
          <input
            type="text"
            className="form-control"
            id="descripcionProducto"
            name='descripcionProducto'
            value={descripcionProducto}
            onChange={onInputChange}
            required
          />
          {errores.descripcionProducto && <div className="text-danger">{errores.descripcionProducto}</div>}
        </div>
        <div className='mb-3'>
          <label htmlFor='precioUnitario' className='form-label'>Precio</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="precioUnitario"
            name='precioUnitario'
            value={precioUnitario}
            onChange={onInputChange}
            required
          />
          {errores.precioUnitario && <div className="text-danger">{errores.precioUnitario}</div>}
        </div>

        <div className='mb-3'>
          <label htmlFor='stock' className='form-label'>Stock</label>
          <input
            type='number'
            className='form-control'
            id='stock'
            name='stock'
            value={stock}
            onChange={onInputChange}
            required
          />
          {errores.stock && <div className="text-danger">{errores.stock}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Guardar</button>
        <Link className='btn btn-danger mx-2' to="/productos">Cancelar</Link>
      </form>
    </div>
  );
}
