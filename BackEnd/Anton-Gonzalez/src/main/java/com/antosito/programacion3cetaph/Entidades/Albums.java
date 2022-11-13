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

    @Enumerated(EnumType.STRING)
    @Column(name = "formato")
    private FormatType formato;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Imagenes> imagenes;

    @Column(name = "esExplicito")
    private boolean explicit;


    @OneToOne(cascade = CascadeType.REFRESH)
    private Genero genero;

    /*Una relacion de muchos a muchos, albumnes pueden tener multiples artistas y viceversa*/
    @Column(name = "artistas")
    @ManyToMany(cascade = CascadeType.REFRESH)
    private List<Artista> artistas;

    /*Una relacion de muchos a muchos, singles(Cancion individual) puede tener muchos artistas y viceversa */
    @Column(name = "singles")
    @OneToMany(cascade = CascadeType.ALL)
    private List<Singles> singles;


}


