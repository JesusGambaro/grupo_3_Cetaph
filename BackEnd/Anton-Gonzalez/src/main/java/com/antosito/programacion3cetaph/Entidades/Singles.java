package com.antosito.programacion3cetaph.Entidades;

import lombok.*;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "singles")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Singles extends Base {
/*Declaramos todas la variables que van en nuestra base de datos
extendiendo de una clase Base que le asigna a todos con una ID*/
    @Column(name = "nombre")
    private String nombre;

    @Column(name = "genero")
    private String genero;

    @Column(name = "duracion")
    private int duracion;

    @Column(name = "lanzamiento")
    private String fechaLanzamiento;

    @Column(name = "esExplicito")
    private boolean explicit;

    @Column(name = "MusicUrl")
    private String urlMusic;

    @OneToOne(optional = false)
    private Genero genero_fk;

}
