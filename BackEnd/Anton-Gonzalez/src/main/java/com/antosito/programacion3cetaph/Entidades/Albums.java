package com.antosito.programacion3cetaph.Entidades;

import lombok.*;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "albums")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Albums extends Base{
    /*Declaramos todas la variables que van en nuestra base de datos
    extendiendo de una clase Base que le asigna a todos con una ID*/
    @Column(name = "nombre")
    private String nombre;

    @Column(name = "precio")
    private float precio;

    @Column(name = "stock")
    private int stock;

    @Column(name = "lanzamiento")
    private String fechaLanzamiento;

    @Column(name = "duracion")
    private String duracion;

    @Column(name ="descripcion")
    private String descripcion;

    @Column(name = "esVinilo")
    private boolean esVinilo;

    @Column(name = "imgUrl")
    private String urlImg;

    @Column(name = "esExplicito")
    private boolean explicit;

    @Column(name = "genero")
    private String genero;
    /*Una relacion de muchos a muchos, albumnes pueden tener multiples artistas y viceversa*/
    @ManyToMany(cascade = CascadeType.REFRESH)
    private List<Artista> artistas;
    /*Una relacion de muchos a muchos, singles(Cancion individual) puede tener muchos artistas y viceversa */
    @ManyToMany(cascade = CascadeType.REFRESH)
    private List<Singles> singles;


}


