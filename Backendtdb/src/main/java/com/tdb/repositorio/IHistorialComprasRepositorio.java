package com.tdb.repositorio;

import com.tdb.modelo.HistorialCompras;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IHistorialComprasRepositorio extends JpaRepository<HistorialCompras, Integer> {
}
