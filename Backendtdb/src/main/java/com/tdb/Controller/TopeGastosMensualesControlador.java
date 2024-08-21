package com.tdb.Controller;

import com.tdb.modelo.TopeGastosMensuales;
import com.tdb.servicio.ITopeGastosMensualesServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tdb-tope-gastos")
@CrossOrigin(value = "http://localhost:3000")
public class TopeGastosMensualesControlador {

    @Autowired
    private ITopeGastosMensualesServicio topeServicio;

    @GetMapping("/topes")
    public List<TopeGastosMensuales> obtenerTopes() {
        return topeServicio.listarTopes();
    }

    @PostMapping("/topes")
    public TopeGastosMensuales agregarTope(@RequestBody TopeGastosMensuales tope) {
        return topeServicio.guardarTope(tope);
    }

    @GetMapping("/topes/{id}")
    public TopeGastosMensuales obtenerTopePorId(@PathVariable Integer id) {
        return topeServicio.buscarTopePorId(id);
    }

    @PutMapping("/topes/{id}")
    public TopeGastosMensuales actualizarTope(@PathVariable Integer id, @RequestBody TopeGastosMensuales tope) {
        TopeGastosMensuales topeExistente = topeServicio.buscarTopePorId(id);
        topeExistente.setCantidadMaxima(tope.getCantidadMaxima());
        return topeServicio.guardarTope(topeExistente);
    }

    @DeleteMapping("/topes/{id}")
    public String eliminarTope(@PathVariable Integer id) {
        TopeGastosMensuales tope = topeServicio.buscarTopePorId(id);
        topeServicio.eliminarTope(tope);
        return "Eliminado";
    }
}
