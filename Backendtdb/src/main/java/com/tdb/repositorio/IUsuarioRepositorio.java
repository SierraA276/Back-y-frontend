
package com.tdb.repositorio;

import com.tdb.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;



public interface IUsuarioRepositorio extends JpaRepository<Usuario, Integer> {
    
}
