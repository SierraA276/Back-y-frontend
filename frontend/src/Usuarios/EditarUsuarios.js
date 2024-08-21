import axios from 'axios';
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EditarUsuarios() {
  const urlDB = "http://localhost:8080/tdb-usuario/usuarios";
  const navegacion = useNavigate();
  const { id } = useParams();

  const [usuario, setUsuario] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    emailUsuario: "",
  });

  const { nombreUsuario, apellidoUsuario, emailUsuario } = usuario;

  const cargarUsuarios = useCallback(async () => {
    try {
      const resultado = await axios.get(`${urlDB}/${id}`);
      setUsuario(resultado.data);
    } catch (error) {
      console.error("Error al cargar usuario", error);
    }
  }, [id, urlDB]);

  useEffect(() => {
    cargarUsuarios();
  }, [cargarUsuarios]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos antes de enviar:", usuario); // Log para verificar los datos antes de enviar
      await axios.put(`${urlDB}/${id}`, usuario);
      navegacion("/");
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  return (
    <div className='container'>
      <div className='container text-center' style={{ margin: '30px' }}>
        <h3>Editar Usuarios</h3>
      </div>

      <form onSubmit={onSubmit}>
        <div className='mb-3'>
          <label htmlFor='nombreUsuario' className='form-label'>Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombreUsuario"
            name='nombreUsuario'
            value={nombreUsuario}
            onChange={onInputChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='apellidoUsuario' className='form-label'>Apellido</label>
          <input
            type="text"
            className="form-control"
            id="apellidoUsuario"
            name='apellidoUsuario'
            value={apellidoUsuario}
            onChange={onInputChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='emailUsuario' className='form-label'>Email</label>
          <input
            type="email"
            className="form-control"
            id="emailUsuario"
            name='emailUsuario'
            value={emailUsuario}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="container text-center">
          <button type="submit" className="btn btn-primary">Guardar</button>
          <Link to='/' className='btn btn-danger'>Volver</Link>
        </div>
      </form>
    </div>
  );
}
