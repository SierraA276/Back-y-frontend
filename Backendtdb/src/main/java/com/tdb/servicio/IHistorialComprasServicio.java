package com.tdb.servicio;

import com.tdb.modelo.HistorialCompras;
import java.util.List;

public interface IHistorialComprasServicio {
    List<HistorialCompras> listarHistorial();
    HistorialCompras buscarHistorialPorId(Integer idHistorial);
    HistorialCompras guardarHistorial(HistorialCompras historial);
    void eliminarHistorial(HistorialCompras historial);
}
