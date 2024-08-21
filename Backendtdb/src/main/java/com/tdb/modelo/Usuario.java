    package com.tdb.modelo;

    import com.fasterxml.jackson.annotation.JsonBackReference;
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    @Entity
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Usuario {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer idUsuario;

        private String nombreUsuario;
        private String apellidoUsuario;
        private String emailUsuario;

        @ManyToOne
        @JoinColumn(name = "rol_id", referencedColumnName = "idRol")
        @JsonBackReference
        private Rol rol;

            @ManyToOne
        @JoinColumn(name = "maxima_deuda_id", referencedColumnName = "idMaximaDeuda")
        private MaximaDeuda maximaDeuda;

        @ManyToOne
        @JoinColumn(name = "tope_gastos_mensuales_id", referencedColumnName = "idTopeGastosMensuales")
        private TopeGastosMensuales topeGastosMensuales;

        @Override
        public String toString() {
            return "Usuario{idUsuario=" + idUsuario + ", nombreUsuario='" + nombreUsuario + '\'' + 
                   ", apellidoUsuario='" + apellidoUsuario + '\'' + 
                   ", emailUsuario='" + emailUsuario + '\'' + 
                   ", rol=" + (rol != null ? rol.getIdRol() : "null") + '}';
        }
    }
