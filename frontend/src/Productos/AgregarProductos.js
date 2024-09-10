import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function AgregarProducto() {
    const urlProductos = "http://localhost:8080/tdb-producto/productos";
    const urlFacturas = "http://localhost:8080/tdb-factura/facturas";
    const navigate = useNavigate();

    const [facturas, setFacturas] = useState([]);
    const [producto, setProducto] = useState({
        nombreProducto: "",
        descripcionProducto: "",
        precioProducto: "",
        stockProducto: "",
        facturas: [] // Almacena las facturas asociadas al producto
    });

    const [errores, setErrores] = useState({
        nombreProducto: "",
        descripcionProducto: "",
        precioProducto: "",
        stockProducto: "",
        facturas: ""
    });

    const { nombreProducto, descripcionProducto, precioProducto, stockProducto, facturas: facturasSeleccionadas } = producto;

    useEffect(() => {
        const cargarFacturas = async () => {
            try {
                const resultadoFacturas = await axios.get(urlFacturas);
                setFacturas(resultadoFacturas.data);
            } catch (error) {
                console.error("Error al cargar las facturas", error);
            }
        };

        cargarFacturas();
    }, []);

    const validarTexto = (texto) => /^[a-zA-Záéíóúüñ\s]+$/.test(texto);
    const validarNumero = (numero) => /^[0-9]+(\.[0-9]+)?$/.test(numero);

    const onInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'facturas') {
            const opcionesSeleccionadas = Array.from(e.target.selectedOptions, option => option.value);
            setProducto({
                ...producto,
                facturas: opcionesSeleccionadas
            });
        } else {
            setProducto({
                ...producto,
                [name]: value
            });
        }

        // Validar el campo correspondiente
        handleValidation(name, value);
    };

    const handleValidation = (name, value) => {
        let error = "";

        switch (name) {
            case 'nombreProducto':
                error = validarTexto(value) ? "" : "Nombre no válido. Solo se permiten letras y espacios.";
                break;
            case 'descripcionProducto':
                error = validarTexto(value) ? "" : "Descripción no válida. Solo se permiten letras y espacios.";
                break;
            case 'precioProducto':
                error = validarNumero(value) ? "" : "Precio no válido. Solo se permiten números.";
                break;
            case 'stockProducto':
                error = validarNumero(value) ? "" : "Stock no válido. Solo se permiten números.";
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
        handleValidation('nombreProducto', nombreProducto);
        handleValidation('descripcionProducto', descripcionProducto);
        handleValidation('precioProducto', precioProducto);
        handleValidation('stockProducto', stockProducto);

        // Verificar si hay errores
        if (Object.values(errores).some(error => error)) {
            return;
        }

        try {
            const productoNuevo = {
                nombreProducto,
                descripcionProducto,
                precioProducto,
                stockProducto,
                facturas: facturasSeleccionadas // Enviar las facturas asociadas
            };

            await axios.post(urlProductos, productoNuevo);

            navigate("/");
        } catch (error) {
            console.error("Error al guardar el producto:", error);
        }
    };

    return (
        <div className='container'>
            <div className='text-center' style={{ margin: '30px' }}>
                <h3>Agregar Producto</h3>
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
                    <label htmlFor='precioProducto' className='form-label'>Precio</label>
                    <input
                        type='number'
                        className='form-control'
                        id='precioProducto'
                        name='precioProducto'
                        value={precioProducto}
                        onChange={onInputChange}
                        required
                    />
                    {errores.precioProducto && <div className="text-danger">{errores.precioProducto}</div>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='stockProducto' className='form-label'>Stock</label>
                    <input
                        type='number'
                        className='form-control'
                        id='stockProducto'
                        name='stockProducto'
                        value={stockProducto}
                        onChange={onInputChange}
                        required
                    />
                    {errores.stockProducto && <div className="text-danger">{errores.stockProducto}</div>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='facturas' className='form-label'>Facturas Asociadas</label>
                    <select
                        className="form-control"
                        id="facturas"
                        name='facturas'
                        multiple
                        value={facturasSeleccionadas}
                        onChange={onInputChange}
                    >
                        {facturas.length > 0 &&
                            facturas.map(facturaItem => (
                                <option key={facturaItem.idFactura} value={facturaItem.idFactura}>
                                    {facturaItem.descripcionFactura}
                                </option>
                            ))
                        }
                    </select>
                    {errores.facturas && <div className="text-danger">{errores.facturas}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
    );
}
