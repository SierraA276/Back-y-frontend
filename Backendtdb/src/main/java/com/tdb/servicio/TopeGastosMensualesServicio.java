package com.tdb.servicio;

import com.tdb.modelo.TopeGastosMensuales;
import com.tdb.repositorio.ITopeGastosMensualesRepositorio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TopeGastosMensualesServicio implements ITopeGastosMensualesServicio {

    @Autowired
    private ITopeGastosMensualesRepositorio topeRepositorio;

    @Override
    public List<TopeGastosMensuales> listarTopes() {
        return topeRepositorio.findAll();
    }

    @Override
    public TopeGastosMensuales buscarTopePorId(Integer idTope) {
        return topeRepositorio.findById(idTope).orElse(null);
    }

    @Override
    public TopeGastosMensuales guardarTope(TopeGastosMensuales tope) {
        return topeRepositorio.save(tope);
    }

    @Override
    public void eliminarTope(TopeGastosMensuales tope) {
        topeRepositorio.delete(tope);
    }
}
