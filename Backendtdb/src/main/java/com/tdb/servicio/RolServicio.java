package com.tdb.servicio;

import com.tdb.modelo.Rol;
import com.Tdb.repositorio.IRolRepositorio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolServicio implements IRolServicio {

    @Autowired
    private IRolRepositorio rolRepositorio;

    @Override
    public List<Rol> listarRoles() {
        return rolRepositorio.findAll();
    }

    @Override
    public Rol buscarRolPorId(Integer idRol) {
        return rolRepositorio.findById(idRol).orElse(null);
    }

    @Override
    public Rol guardarRol(Rol rol) {
        return rolRepositorio.save(rol);
    }

    @Override
    public void eliminarRol(Rol rol) {
        rolRepositorio.delete(rol);
    }
}
