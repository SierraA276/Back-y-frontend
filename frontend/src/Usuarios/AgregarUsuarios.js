import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function AgregarUsuarios() {
  let navegacion = useNavigate();

  const [usuario, setUsuario] = useState({
    nombreUsuario: "",  
    apellidoUsuario: "",  
    emailUsuario: ""  
  });

  const { nombreUsuario, apellidoUsuario, emailUsuario } = usuario;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); 
    const urlDB = "http://localhost:8080/tdb-usuario/usuarios";
    try {
      await axios.post(urlDB, usuario);
      navegacion("/");
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  return (
    <div className="contenedor">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Registrar usuario</h3>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='mb-3'>
          <label htmlFor='nombreUsuario' className='form-label'>
            Nombre
          </label>
          <input
            type='text'
            className='form-control' 
            id='nombreUsuario'
            name='nombreUsuario'
            value={nombreUsuario}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='apellidoUsuario' className='form-label'>
            Apellido
          </label>
          <input
            type='text'
            className='form-control' 
            id='apellidoUsuario'
            name='apellidoUsuario'
            value={apellidoUsuario}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='emailUsuario' className='form-label'>
            Email
          </label>
          <input
            type='email' 
            className='form-control' 
            id='emailUsuario'
            name='emailUsuario'
            value={emailUsuario}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>

        <div className='container text-center'>
          <button type='submit' className='btn btn-primary me-3'>Registrar</button>
          <a href='/' className='btn btn-danger'>Volver</a>
        </div>
      </form>
    </div>
  );
}
