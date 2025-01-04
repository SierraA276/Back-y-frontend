package com.tdb.servicio;

import com.tdb.modelo.Usuario;
import com.tdb.repositorio.IUsuarioRepositorio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class UsuarioServicioTest {

    @Mock
    private IUsuarioRepositorio usuarioRepositorio;

    @InjectMocks
    private UsuarioServicio usuarioServicio;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGuardarUsuario() {
        Usuario usuario = new Usuario();
        usuario.setNombreUsuario("John");
        usuario.setApellidoUsuario("Doe");
        usuario.setEmailUsuario("john.doe@example.com");

        when(usuarioRepositorio.save(usuario)).thenReturn(usuario);

        Usuario resultado = usuarioServicio.guardarUsuario(usuario);
        assertNotNull(resultado);
        assertEquals("John", resultado.getNombreUsuario());
        assertEquals("Doe", resultado.getApellidoUsuario());

        verify(usuarioRepositorio, times(1)).save(usuario);
    }

    @Test
    void testBuscarUsuarioPorId() {
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(1);
        usuario.setNombreUsuario("John");

        when(usuarioRepositorio.findById(1)).thenReturn(Optional.of(usuario));

        Usuario resultado = usuarioServicio.buscarUsuarioPorId(1);
        assertNotNull(resultado);
        assertEquals("John", resultado.getNombreUsuario());

        verify(usuarioRepositorio, times(1)).findById(1);
    }

    @Test
    void testEliminarUsuario() {
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(1);

        usuarioServicio.eliminarUsuario(usuario);
        verify(usuarioRepositorio, times(1)).delete(usuario);
    }
}
