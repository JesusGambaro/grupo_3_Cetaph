package com.antosito.programacion3cetaph.Entidades;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    /*Una relacion de uno a muchos, un artista puede tener muchas singles*/
    @OneToMany(cascade = CascadeType.REFRESH, orphanRemoval = true)
    @JoinTable(
            name = "artista_single",
            joinColumns = @JoinColumn(name = "artista_id"),
            inverseJoinColumns = @JoinColumn(name = "single_id")
    )
    private List<Singles> singles = new ArrayList<Singles>();

}
