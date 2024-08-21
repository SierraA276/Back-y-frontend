package com.tdb.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopeGastosMensuales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTopeGastosMensuales;

    private Double cantidadMaxima;
}
