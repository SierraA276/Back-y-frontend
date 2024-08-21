package com.tdb.servicio;

import com.tdb.modelo.Producto;
import java.util.List;

public interface IProductoServicio {
    List<Producto> listarProductos();
    Producto buscarProductoPorId(Integer idProducto);
    Producto guardarProducto(Producto producto);
    void eliminarProducto(Producto producto);
}
