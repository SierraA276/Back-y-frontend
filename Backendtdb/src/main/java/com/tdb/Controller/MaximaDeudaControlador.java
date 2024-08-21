package com.tdb.Controller;

import com.tdb.modelo.MaximaDeuda;
import com.tdb.servicio.IMaximaDeudaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tdb-maxima-deuda")
@CrossOrigin(value = "http://localhost:3000")
public class MaximaDeudaControlador {

    @Autowired
    private IMaximaDeudaServicio deudaServicio;

    @GetMapping("/deudas")
    public List<MaximaDeuda> obtenerDeudas() {
        return deudaServicio.listarDeudas();
    }

    @PostMapping("/deudas")
    public MaximaDeuda agregarDeuda(@RequestBody MaximaDeuda deuda) {
        return deudaServicio.guardarDeuda(deuda);
    }

    @GetMapping("/deudas/{id}")
    public MaximaDeuda obtenerDeudaPorId(@PathVariable Integer id) {
        return deudaServicio.buscarDeudaPorId(id);
    }

    @PutMapping("/deudas/{id}")
    public MaximaDeuda actualizarDeuda(@PathVariable Integer id, @RequestBody MaximaDeuda deuda) {
        MaximaDeuda deudaExistente = deudaServicio.buscarDeudaPorId(id);
        deudaExistente.setCantidadMaxima(deuda.getCantidadMaxima());
        return deudaServicio.guardarDeuda(deudaExistente);
    }

    @DeleteMapping("/deudas/{id}")
    public String eliminarDeuda(@PathVariable Integer id) {
        MaximaDeuda deuda = deudaServicio.buscarDeudaPorId(id);
        deudaServicio.eliminarDeuda(deuda);
        return "Eliminado";
    }
}
