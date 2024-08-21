package com.tdb.repositorio;

import com.tdb.modelo.MaximaDeuda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMaximaDeudaRepositorio extends JpaRepository<MaximaDeuda, Integer> {
}
