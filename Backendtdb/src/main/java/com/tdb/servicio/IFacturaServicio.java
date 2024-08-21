package com.tdb.servicio;

import com.tdb.modelo.Factura;
import java.util.List;

public interface IFacturaServicio {
    List<Factura> listarFacturas();
    Factura buscarFacturaPorId(Integer idFactura);
    Factura guardarFactura(Factura factura);
    void eliminarFactura(Factura factura);
}
