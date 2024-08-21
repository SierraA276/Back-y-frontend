package com.tdb.servicio;

import com.tdb.modelo.HistorialCompras;
import com.tdb.repositorio.IHistorialComprasRepositorio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HistorialComprasServicio implements IHistorialComprasServicio {

    @Autowired
    private IHistorialComprasRepositorio historialRepositorio;

    @Override
    public List<HistorialCompras> listarHistorial() {
        return historialRepositorio.findAll();
    }

    @Override
    public HistorialCompras buscarHistorialPorId(Integer idHistorial) {
        return historialRepositorio.findById(idHistorial).orElse(null);
    }

    @Override
    public HistorialCompras guardarHistorial(HistorialCompras historial) {
        return historialRepositorio.save(historial);
    }

    @Override
    public void eliminarHistorial(HistorialCompras historial) {
        historialRepositorio.delete(historial);
    }
}
