import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function AgregarUsuario() {
    const urlDB = "http://localhost:8080/tdb-usuario/usuarios";
    const urlRoles = "http://localhost:8080/tdb-rol/roles";
    const urlTopeGastos = "http://localhost:8080/tdb-tope-gastos/topes";
    const urlMaximaDeuda = "http://localhost:8080/tdb-maxima-deuda/deudas";
    const navigate = useNavigate();

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
                const resultadoRoles = await axios.get(urlRoles);
                setRoles(resultadoRoles.data);

                const resultadoTopeGastos = await axios.get(urlTopeGastos);
                setTopeGastos(resultadoTopeGastos.data);

                const resultadoMaximaDeuda = await axios.get(urlMaximaDeuda);
                setMaximaDeuda(resultadoMaximaDeuda.data);
            } catch (error) {
                console.error("Error al cargar datos", error);
            }
        };

        cargarDatos();
    }, []);

    const validarNombre = (nombre) => /^[a-zA-ZáéíóúüñÑ\s]+$/.test(nombre);

    const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validarNumero = (numero) => /^[0-9]+$/.test(numero);

    const onInputChange = (e) => {
        const { name, value } = e.target;

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

        // Validar el campo correspondiente
        handleValidation(name, value);
    };

    const handleValidation = (name, value) => {
        let error = "";

        switch (name) {
            case 'nombreUsuario':
                error = validarNombre(value) ? "" : "Nombre no válido. Solo se permiten letras y letras con tilde.";
                break;
            case 'apellidoUsuario':
                error = validarNombre(value) ? "" : "Apellido no válido. Solo se permiten letras y letras con tilde.";
                break;
            case 'emailUsuario':
                error = validarEmail(value) ? "" : "Correo electrónico no válido.";
                break;
            case 'topeGastosMensuales':
                error = validarNumero(value) ? "" : "Tope de gastos no válido. Solo se permiten números.";
                break;
            case 'maximaDeuda':
                error = validarNumero(value) ? "" : "Deuda máxima no válida. Solo se permiten números.";
                break;
            default:
                break;
        }

        setErrores({
            ...errores,
            [name]: error
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // Validar todos los campos antes de enviar
        handleValidation('nombreUsuario', nombreUsuario);
        handleValidation('apellidoUsuario', apellidoUsuario);
        handleValidation('emailUsuario', emailUsuario);
        handleValidation('topeGastosMensuales', topeGastosMensuales.cantidadMaxima);
        handleValidation('maximaDeuda', maximaDeuda.cantidadMaxima);

        // Verificar si hay errores
        if (Object.values(errores).some(error => error)) {
            return;
        }

        try {
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

            const usuarioNuevo = {
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

            await axios.post(urlDB, usuarioNuevo);

            navigate("/");
        } catch (error) {
            console.error("Error al guardar usuario:", error);
        }
    };

    return (
        <div className='container'>
            <div className='text-center' style={{ margin: '30px' }}>
                <h3>Agregar Usuario</h3>
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
                    <label htmlFor='maximaDeuda' className='form-label'>Máxima Deuda</label>
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
            </form>
        </div>
    );
}
