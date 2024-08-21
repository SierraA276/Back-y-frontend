
package com.tdb.servicio;

import com.tdb.modelo.Usuario;
import com.tdb.repositorio.IUsuarioRepositorio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServicio implements IUsuarioServicio{

    @Autowired
    private IUsuarioRepositorio usuarioRepositorio;
    
    @Override
    public List<Usuario> listarUsuarios() {
        return usuarioRepositorio.findAll();    }

    @Override
    public Usuario buscarUsuarioPorId(Integer idUsuario) {
        Usuario usuario =usuarioRepositorio.findById(idUsuario).orElse(null);
        return usuario;
    }

    @Override
    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    @Override
    public void eliminarUsuario(Usuario usuario) {
        usuarioRepositorio.delete(usuario); 
    }
  
}
