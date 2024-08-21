package com.tdb.Controller;

import com.tdb.modelo.HistorialCompras;
import com.tdb.servicio.IHistorialComprasServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tdb-historial-compras")
@CrossOrigin(value = "http://localhost:3000")
public class HistorialComprasControlador {

    @Autowired
    private IHistorialComprasServicio historialServicio;

    @GetMapping("/historial")
    public List<HistorialCompras> obtenerHistorial() {
        return historialServicio.listarHistorial();
    }

    @PostMapping("/historial")
    public HistorialCompras agregarHistorial(@RequestBody HistorialCompras historial) {
        return historialServicio.guardarHistorial(historial);
    }

    @GetMapping("/historial/{id}")
    public HistorialCompras obtenerHistorialPorId(@PathVariable Integer id) {
        return historialServicio.buscarHistorialPorId(id);
    }

    @PutMapping("/historial/{id}")
    public HistorialCompras actualizarHistorial(@PathVariable Integer id, @RequestBody HistorialCompras historial) {
        HistorialCompras historialExistente = historialServicio.buscarHistorialPorId(id);
        historialExistente.setUsuario(historial.getUsuario());
        historialExistente.setFactura(historial.getFactura());
        return historialServicio.guardarHistorial(historialExistente);
    }

    @DeleteMapping("/historial/{id}")
    public String eliminarHistorial(@PathVariable Integer id) {
        HistorialCompras historial = historialServicio.buscarHistorialPorId(id);
        historialServicio.eliminarHistorial(historial);
        return "Eliminado";
    }
}
