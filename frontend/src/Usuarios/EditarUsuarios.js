import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EditarUsuarios() {
  const urlDB = "http://localhost:8080/tdb-usuario/usuarios";
  const urlRoles = "http://localhost:8080/tdb-rol/roles";
  const urlTopeGastos = "http://localhost:8080/tdb-tope-gastos/topes";
  const urlMaximaDeuda = "http://localhost:8080/tdb-maxima-deuda/deudas";
  const navigate = useNavigate();
  const { id } = useParams();

  const [roles, setRoles] = useState([]);
  const [topeGastos, setTopeGastos] = useState([]);
  const [deudamaxima, setMaximaDeuda] = useState([]);
  const [usuario, setUsuario] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    emailUsuario: "",
    rol: { idRol: "" },
    topeGastosMensuales: { cantidadMaxima: "" },
    maximaDeuda: { cantidadMaxima: "" }
  });

  const [errores, setErrores] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    emailUsuario: "",
    topeGastosMensuales: "",
    maximaDeuda: ""
  });

  const { nombreUsuario, apellidoUsuario, emailUsuario, rol, topeGastosMensuales, maximaDeuda } = usuario;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Cargar datos del usuario
        const resultadoUsuario = await axios.get(`${urlDB}/${id}`);
        setUsuario({
          ...resultadoUsuario.data,
          rol: resultadoUsuario.data.rol || { idRol: "" },
          topeGastosMensuales: resultadoUsuario.data.topeGastosMensuales || { cantidadMaxima: "" },
          maximaDeuda: resultadoUsuario.data.maximaDeuda || { cantidadMaxima: "" }
        });

        // Cargar roles
        const resultadoRoles = await axios.get(urlRoles);
        setRoles(resultadoRoles.data);

        // Cargar tope de gastos
        const resultadoTopeGastos = await axios.get(urlTopeGastos);
        setTopeGastos(resultadoTopeGastos.data);

        // Cargar deuda máxima
        const resultadoMaximaDeuda = await axios.get(urlMaximaDeuda);
        setMaximaDeuda(resultadoMaximaDeuda.data);

      } catch (error) {
        console.error("Error al cargar datos", error);
      }
    };

    cargarDatos();
  }, [id]);

  const validarCampo = (name, value) => {
    let mensajeError = "";
    if (name === 'nombreUsuario' || name === 'apellidoUsuario') {
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      if (!regex.test(value)) {
        mensajeError = "Caracteres no permitidos";
      }
    } else if (name === 'emailUsuario') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        mensajeError = "Formato de correo inválido";
      }
    } else if (name === 'topeGastosMensuales' || name === 'maximaDeuda') {
      if (!/^\d+$/.test(value)) {
        mensajeError = "Solo se permiten números";
      }
    }
    setErrores({ ...errores, [name]: mensajeError });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    validarCampo(name, value);
    if (name === 'topeGastosMensuales') {
      setUsuario({
        ...usuario,
        topeGastosMensuales: { cantidadMaxima: value }
      });
    } else if (name === 'maximaDeuda') {
      setUsuario({
        ...usuario,
        maximaDeuda: { cantidadMaxima: value }
      });
    } else {
      setUsuario({
        ...usuario,
        [name]: value
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verificar si tope de gastos y deuda máxima existen y crear si es necesario
      let topeGastosId = topeGastosMensuales.idTopeGastosMensuales;
      if (!topeGastosId) {
        const resultadoTopeGastos = await axios.post(urlTopeGastos, { cantidadMaxima: topeGastosMensuales.cantidadMaxima });
        topeGastosId = resultadoTopeGastos.data.idTopeGastosMensuales;
      }

      let maximaDeudaId = maximaDeuda.idMaximaDeuda;
      if (!maximaDeudaId) {
        const resultadoMaximaDeuda = await axios.post(urlMaximaDeuda, { cantidadMaxima: maximaDeuda.cantidadMaxima });
        maximaDeudaId = resultadoMaximaDeuda.data.idMaximaDeuda;
      }

      const usuarioActualizado = {
        ...usuario,
        topeGastosMensuales: {
          idTopeGastosMensuales: topeGastosId,
          cantidadMaxima: topeGastosMensuales.cantidadMaxima
        },
        maximaDeuda: {
          idMaximaDeuda: maximaDeudaId,
          cantidadMaxima: maximaDeuda.cantidadMaxima
        }
      };

      // Actualizar usuario
      await axios.put(`${urlDB}/${id}`, usuarioActualizado);

      // Navegar a la lista de usuarios después de guardar los cambios
      navigate("/");
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  return (
    <div className='container'>
      <div className='container text-center' style={{ margin: '30px' }}>
        <h3>Editar Usuario</h3>
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
          {errores.nombreUsuario && <div className="text-danger">{errores.nombreUsuario}</div>}
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
          {errores.apellidoUsuario && <div className="text-danger">{errores.apellidoUsuario}</div>}
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
          {errores.emailUsuario && <div className="text-danger">{errores.emailUsuario}</div>}
        </div>

        <div className='mb-3'>
          <label htmlFor='rol' className='form-label'>Rol</label>
          <select
            className="form-control"
            id="rol"
            name='rol'
            value={rol.idRol || ""}
            onChange={(e) => setUsuario({
              ...usuario,
              rol: { idRol: e.target.value }
            })}
            required
          >
            <option value="">Seleccione un Rol</option>
            {roles.length > 0 &&
              roles.map(rolItem => (
                <option key={rolItem.idRol} value={rolItem.idRol}>
                  {rolItem.nombreRol}
                </option>
              ))
            }
          </select>
        </div>

        <div className='mb-3'>
          <label htmlFor='topeGastosMensuales' className='form-label'>Tope de Gastos</label>
          <input
            type='number'
            className='form-control'
            id='topeGastosMensuales'
            name='topeGastosMensuales'
            value={topeGastosMensuales.cantidadMaxima || ""}
            onChange={onInputChange}
            required
          />
          {errores.topeGastosMensuales && <div className="text-danger">{errores.topeGastosMensuales}</div>}
        </div>

        <div className='mb-3'>
          <label htmlFor='maximaDeuda' className='form-label'>Deuda Máxima</label>
          <input
            type='number'
            className='form-control'
            id='maximaDeuda'
            name='maximaDeuda'
            value={maximaDeuda.cantidadMaxima || ""}
            onChange={onInputChange}
            required
          />
          {errores.maximaDeuda && <div className="text-danger">{errores.maximaDeuda}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Guardar</button>
        <Link className='btn btn-danger mx-2' to="/">Cancelar</Link>
      </form>
    </div>
  );
}
