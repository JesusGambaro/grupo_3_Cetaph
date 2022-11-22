package com.antosito.programacion3cetaph.Entidades;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "artista")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class Artista extends Base {
    /*Declaramos todas la variables que van en nuestra base de datos
    extendiendo de una clase Base que le asigna a todos con una ID*/
    @Column(name = "nombre")
    private String nombre;

    @Column(name = "nacionalidad")
    private String nacionalidad;

    @Column(name = "fechanacimiento")
    private String fechanacimiento;

    @Column(name = "descripcion")
    private String descripcion;

    @OneToOne(cascade = CascadeType.REFRESH)
    private Imagenes imagenes;

}
