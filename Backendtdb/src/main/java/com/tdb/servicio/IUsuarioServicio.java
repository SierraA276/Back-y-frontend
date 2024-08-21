
package com.tdb.servicio;

import java.util.List;
import com.tdb.modelo.Usuario;
import org.springframework.stereotype.Service;


@Service
public interface IUsuarioServicio {
    
    
    public List<Usuario> listarUsuarios();

    public Usuario buscarUsuarioPorId (Integer idUsuario);

    public Usuario guardarUsuario(Usuario usuario);

    public void eliminarUsuario(Usuario usuario);


}
