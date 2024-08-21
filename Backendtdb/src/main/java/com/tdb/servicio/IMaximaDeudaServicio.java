package com.tdb.servicio;

import com.tdb.modelo.MaximaDeuda;
import java.util.List;

public interface IMaximaDeudaServicio {
    List<MaximaDeuda> listarDeudas();
    MaximaDeuda buscarDeudaPorId(Integer idDeuda);
    MaximaDeuda guardarDeuda(MaximaDeuda deuda);
    void eliminarDeuda(MaximaDeuda deuda);
}
