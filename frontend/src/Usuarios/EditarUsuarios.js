import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EditarUsuarios() {
  const urlDB = "http://localhost:8080/tdb-usuario/usuarios";
  const urlRoles = "http://localhost:8080/tdb-usuario/roles";
  const navigate = useNavigate();
  const { id } = useParams();

  const [roles, setRoles] = useState([]);
  const [usuario, setUsuario] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    emailUsuario: "",
    rolId: "",
    topeGastos: "",
    deudaMaxima: ""
  });

  const { nombreUsuario, apellidoUsuario, emailUsuario, rolId, topeGastos, deudaMaxima } = usuario;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Cargar datos del usuario
        const resultadoUsuario = await axios.get(`${urlDB}/${id}`);
        setUsuario(resultadoUsuario.data);

        // Cargar roles
        const resultadoRoles = await axios.get(urlRoles);
        console.log("Roles cargados:", resultadoRoles.data); // Verifica los roles cargados
        setRoles(resultadoRoles.data);
      } catch (error) {
        console.error("Error al cargar datos", error);
      }
    };

    cargarDatos();
  }, [id]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos antes de enviar:", usuario); // Log para verificar los datos antes de enviar
      await axios.put(`${urlDB}/${id}`, usuario);
      navigate("/"); // Navegar a la lista de usuarios después de guardar los cambios
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

        <div className='mb-3'>
          <label htmlFor='rolId' className='form-label'>Rol</label>
          <select
            className="form-control"
            id="rolId"
            name='rolId'
            value={rolId}
            onChange={onInputChange}
            required
          >
            <option value="">Seleccione un Rol</option>
            {roles.map(rol => (
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
          <label htmlFor='deudaMaxima' className='form-label'>Deuda Máxima</label>
          <input
            type='number'
            className='form-control'
            id='deudaMaxima'
            name='deudaMaxima'
            value={deudaMaxima}
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
