package com.tdb.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaximaDeuda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMaximaDeuda;

    private Double cantidadMaxima;
}

