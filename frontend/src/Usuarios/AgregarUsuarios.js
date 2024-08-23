import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function AgregarUsuarios() {
  let navegacion = useNavigate();

  const [usuario, setUsuario] = useState({
    nombreUsuario: "",  
    apellidoUsuario: "",  
    emailUsuario: "",
    rolId:"",
    topeGastos: "",
    deudaMaxima: ""
  });

  const { nombreUsuario, apellidoUsuario, emailUsuario, rolId, topeGastos,deudamaxima } = usuario;

  useEffect(()=>{ 
    const cargarRoles =async ()=>{
      try{
        const resultado =await axios.get( 'http://localhost:8080/tdb-usuario/roles');
        setRoles(resultado.data);
      } catch (error) {
      console.error("Error al cargar roles", error);
      }
    };
    cargarRoles();
  }, []);



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
          <label htmlFor='nombreUsuario' className='form-label'>Nombre</label>
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
          <label htmlFor='apellidoUsuario' className='form-label'>Apellido</label>
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
          <label htmlFor='emailUsuario' className='form-label'>Email</label>
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

        <div className='mb-3'>
          <label htmlFor='rolId' className='form-label'>Rol</label>
          <select
          className='form-control'
          id='rolId'
          name='rolId'
          value={rolId}
          onChange={onInputChange}
          required
          >
            <option value="">Seleccione un rol</option>
            {roles.map(rol=>(
              <option key={rol.id} value={rol.id}>
                {rol.nombreRol}
              </option>
            ))}
          </select>
        </div>
        
            <div className='mb-3'>
              <label htmlFor='topeGastos' className='form-label'>Tope de Gastos</label>
              <input
              type='number'
              className='form-control'
              id='topeGastos'
              name='topeGastos'
              value={topeGastos}
              onChange={onInputChange}
              required
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='deudaMaxima' className='form-label'>Deuda Maxima</label>
              <input
              type='number'
              className='form-control'
              id='deudaMaxima'
              name='deudaMaxima'
              value={deudaMaxima}
              onInput={onInputChange}
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
