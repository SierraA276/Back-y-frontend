package com.tdb.modelo;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRol;

    private String NombreRol;

    @OneToMany(mappedBy = "rol")
    @JsonManagedReference
    private List<Usuario> usuarios;

    @Override
    public String toString() {
        return "Rol{idRol=" + idRol + ", NombreRol='" + NombreRol + '\'' + '}';
    }
}
