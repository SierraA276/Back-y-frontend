package com.tdb.servicio;

import com.tdb.modelo.Producto;
import com.tdb.repositorio.IProductoRepositorio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class ProductoServicioTest {

    @Mock
    private IProductoRepositorio productoRepositorio;

    @InjectMocks
    private ProductoServicio productoServicio;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGuardarProducto() {
        Producto producto = new Producto();
        producto.setNombreProducto("Gansito");
        producto.setPrecioUnitario(1900.0);
        producto.setStock(50.0);

        when(productoRepositorio.save(producto)).thenReturn(producto);

        Producto resultado = productoServicio.guardarProducto(producto);
        assertNotNull(resultado);
        assertEquals("Gansito", resultado.getNombreProducto());

        verify(productoRepositorio, times(1)).save(producto);
    }

    @Test
    void testBuscarProductoPorId() {
        Producto producto = new Producto();
        producto.setIdProducto(1);
        producto.setNombreProducto("Gansito");

        when(productoRepositorio.findById(1)).thenReturn(Optional.of(producto));

        Producto resultado = productoServicio.buscarProductoPorId(1);
        assertNotNull(resultado);
        assertEquals("Gansito", resultado.getNombreProducto());

        verify(productoRepositorio, times(1)).findById(1);
    }

    @Test
    void testEliminarProducto() {
        Producto producto = new Producto();
        producto.setIdProducto(1);

        productoServicio.eliminarProducto(producto);
        verify(productoRepositorio, times(1)).delete(producto);
    }
    
}
