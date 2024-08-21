package com.tdb.servicio;

import com.tdb.modelo.Rol;
import java.util.List;

public interface IRolServicio {
    List<Rol> listarRoles();
    Rol buscarRolPorId(Integer idRol);
    Rol guardarRol(Rol rol);
    void eliminarRol(Rol rol);
}
