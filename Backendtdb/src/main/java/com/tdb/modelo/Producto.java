package com.tdb.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProducto;

    private String NombreProducto;
    private String DescripcionProducto;
    private Integer PrecioUnitario;
    private Double stock;

    @OneToMany(mappedBy = "producto")
    private List<Factura> facturas;
}
