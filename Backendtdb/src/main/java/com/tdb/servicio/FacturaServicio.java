package com.tdb.servicio;

import com.tdb.modelo.Factura;
import com.tdb.repositorio.IFacturaRepositorio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FacturaServicio implements IFacturaServicio {

    @Autowired
    private IFacturaRepositorio facturaRepositorio;

    @Override
    public List<Factura> listarFacturas() {
        return facturaRepositorio.findAll();
    }

    @Override
    public Factura buscarFacturaPorId(Integer idFactura) {
        return facturaRepositorio.findById(idFactura).orElse(null);
    }

    @Override
    public Factura guardarFactura(Factura factura) {
        return facturaRepositorio.save(factura);
    }

    @Override
    public void eliminarFactura(Factura factura) {
        facturaRepositorio.delete(factura);
    }
}
