package com.tdb.Controller;

import com.tdb.modelo.Factura;
import com.tdb.servicio.IFacturaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tdb-factura")
@CrossOrigin(value = "http://localhost:3000")
public class FacturaControlador {

    @Autowired
    private IFacturaServicio facturaServicio;

    @GetMapping("/facturas")
    public List<Factura> obtenerFacturas() {
        return facturaServicio.listarFacturas();
    }

    @PostMapping("/facturas")
    public Factura agregarFactura(@RequestBody Factura factura) {
        return facturaServicio.guardarFactura(factura);
    }

    @GetMapping("/facturas/{id}")
    public Factura obtenerFacturaPorId(@PathVariable Integer id) {
        return facturaServicio.buscarFacturaPorId(id);
    }

    @PutMapping("/facturas/{id}")
    public Factura actualizarFactura(@PathVariable Integer id, @RequestBody Factura factura) {
        Factura facturaExistente = facturaServicio.buscarFacturaPorId(id);
        facturaExistente.setUsuario(factura.getUsuario());
        facturaExistente.setProducto(factura.getProducto());
        facturaExistente.setCantidad(factura.getCantidad());
        facturaExistente.setPrecioUnitario(factura.getPrecioUnitario());
        facturaExistente.setPrecioTotal(factura.getPrecioTotal());
        return facturaServicio.guardarFactura(facturaExistente);
    }

    @DeleteMapping("/facturas/{id}")
    public String eliminarFactura(@PathVariable Integer id) {
        Factura factura = facturaServicio.buscarFacturaPorId(id);
        facturaServicio.eliminarFactura(factura);
        return "Eliminado";
    }
}
