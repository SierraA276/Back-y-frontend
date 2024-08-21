package com.tdb.Controller;

import com.tdb.modelo.Producto;
import com.tdb.servicio.IProductoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tdb-producto")
@CrossOrigin(value = "http://localhost:3000")
public class ProductoControlador {

    @Autowired
    private IProductoServicio productoServicio;

    @GetMapping("/productos")
    public List<Producto> obtenerProductos() {
        return productoServicio.listarProductos();
    }

    @PostMapping("/productos")
    public Producto agregarProducto(@RequestBody Producto producto) {
        return productoServicio.guardarProducto(producto);
    }

    @GetMapping("/productos/{id}")
    public Producto obtenerProductoPorId(@PathVariable Integer id) {
        return productoServicio.buscarProductoPorId(id);
    }

    @PutMapping("/productos/{id}")
    public Producto actualizarProducto(@PathVariable Integer id, @RequestBody Producto producto) {
        Producto productoExistente = productoServicio.buscarProductoPorId(id);
        productoExistente.setNombreProducto(producto.getNombreProducto());
        productoExistente.setDescripcionProducto(producto.getDescripcionProducto());
        productoExistente.setPrecioUnitario(producto.getPrecioUnitario());
        productoExistente.setStock(producto.getStock());
        return productoServicio.guardarProducto(productoExistente);
    }

    @DeleteMapping("/productos/{id}")
    public String eliminarProducto(@PathVariable Integer id) {
        Producto producto = productoServicio.buscarProductoPorId(id);
        productoServicio.eliminarProducto(producto);
        return "Eliminado";
    }
}
