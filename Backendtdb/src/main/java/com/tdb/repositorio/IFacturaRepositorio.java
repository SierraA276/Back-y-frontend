package com.tdb.repositorio;

import com.tdb.modelo.Factura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFacturaRepositorio extends JpaRepository<Factura, Integer> {
}
