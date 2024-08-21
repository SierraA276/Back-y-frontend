package com.tdb.Controller;


import com.Tdb.Exception.ExceptionRecursoNoEncontrado;
import com.tdb.modelo.Usuario;
import com.tdb.servicio.IUsuarioServicio;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("tdb-usuario")
@CrossOrigin(value = "http://localhost:3000")
public class UsuarioControlador {
       
    private static final Logger logger
    = LoggerFactory.getLogger(UsuarioControlador.class);

    @Autowired
    private IUsuarioServicio usuarioServicio;

    @GetMapping ("/usuarios")
    public List <Usuario> obtenerUsuarios(){
        var usuarios = usuarioServicio.listarUsuarios();
        usuarios.forEach((usuario -> logger.info(usuario.toString())));
        return usuarios;
    }
    @PostMapping("/usuarios")
    public Usuario agregarUsuario(@RequestBody Usuario usuario) {
        logger.info("Usuario a agregar: " + usuario);
        return usuarioServicio.guardarUsuario(usuario);
    }
   
    @GetMapping ("/usuarios/{id}")
    public ResponseEntity<Usuario> consultarEmpleadoId(@PathVariable Integer id) {
        Usuario usuario = usuarioServicio.buscarUsuarioPorId(id);
        if (usuario == null) {
            throw new ExceptionRecursoNoEncontrado("No se encontró el Id del usuario: " + id);
        }
        return ResponseEntity.ok(usuario);
    }
    
    @PutMapping("/usuarios/{id}")
    public  ResponseEntity<Usuario> ModificarUsuarioId(@PathVariable Integer id,@RequestBody Usuario usuarioObj){
        Usuario usuario = usuarioServicio.buscarUsuarioPorId(id);
        if (usuario ==null){
            throw new ExceptionRecursoNoEncontrado("No se encontró el Id del usuario: " + id);
     }
        usuario.setNombreUsuario(usuarioObj.getNombreUsuario());
        usuario.setApellidoUsuario(usuarioObj.getApellidoUsuario());
        usuario.setEmailUsuario(usuarioObj.getEmailUsuario());

        if (usuarioObj.getMaximaDeuda() != null) {
        usuario.setMaximaDeuda(usuarioObj.getMaximaDeuda());
    }

    if (usuarioObj.getTopeGastosMensuales() != null) {
        usuario.setTopeGastosMensuales(usuarioObj.getTopeGastosMensuales());
    }
        
        
        usuarioServicio.guardarUsuario(usuario);
        return ResponseEntity.ok(usuario);
    }
            
    
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Map<String, Boolean>> EliminarUsuarioId(@PathVariable Integer id) {
        Usuario usuario = usuarioServicio.buscarUsuarioPorId(id);
        if (usuario == null) {
            throw new ExceptionRecursoNoEncontrado("No se encontró el Id del usuario: " + id);
        }
        usuarioServicio.eliminarUsuario(usuario);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("Eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}