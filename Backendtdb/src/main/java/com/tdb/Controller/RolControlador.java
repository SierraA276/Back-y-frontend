package com.Tdb.Controller;

import com.tdb.modelo.Rol;
import com.tdb.servicio.IRolServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tdb-rol")
@CrossOrigin(value = "http://localhost:3000")
public class RolControlador {

    @Autowired
    private IRolServicio rolServicio;

    @GetMapping("/roles")
    public List<Rol> obtenerRoles() {
        return rolServicio.listarRoles();
    }

    @PostMapping("/roles")
    public Rol agregarRol(@RequestBody Rol rol) {
        return rolServicio.guardarRol(rol);
    }

    @GetMapping("/roles/{id}")
    public Rol obtenerRolPorId(@PathVariable Integer id) {
        return rolServicio.buscarRolPorId(id);
    }

    @PutMapping("/roles/{id}")
    public Rol actualizarRol(@PathVariable Integer id, @RequestBody Rol rol) {
        Rol rolExistente = rolServicio.buscarRolPorId(id);
        rolExistente.setNombreRol(rol.getNombreRol());
        return rolServicio.guardarRol(rolExistente);
    }

    @DeleteMapping("/roles/{id}")
    public String eliminarRol(@PathVariable Integer id) {
        Rol rol = rolServicio.buscarRolPorId(id);
        rolServicio.eliminarRol(rol);
        return "Eliminado";
    }
}

