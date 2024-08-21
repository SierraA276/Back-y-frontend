package com.tdb.servicio;

import com.tdb.modelo.TopeGastosMensuales;
import java.util.List;

public interface ITopeGastosMensualesServicio {
    List<TopeGastosMensuales> listarTopes();
    TopeGastosMensuales buscarTopePorId(Integer idTope);
    TopeGastosMensuales guardarTope(TopeGastosMensuales tope);
    void eliminarTope(TopeGastosMensuales tope);
}
