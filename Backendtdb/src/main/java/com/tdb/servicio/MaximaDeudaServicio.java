package com.tdb.servicio;

import com.tdb.modelo.MaximaDeuda;
import com.tdb.repositorio.IMaximaDeudaRepositorio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MaximaDeudaServicio implements IMaximaDeudaServicio {

    @Autowired
    private IMaximaDeudaRepositorio deudaRepositorio;

    @Override
    public List<MaximaDeuda> listarDeudas() {
        return deudaRepositorio.findAll();
    }

    @Override
    public MaximaDeuda buscarDeudaPorId(Integer idDeuda) {
        return deudaRepositorio.findById(idDeuda).orElse(null);
    }

    @Override
    public MaximaDeuda guardarDeuda(MaximaDeuda deuda) {
        return deudaRepositorio.save(deuda);
    }

    @Override
    public void eliminarDeuda(MaximaDeuda deuda) {
        deudaRepositorio.delete(deuda);
    }
}
