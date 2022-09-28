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
@Audited
public class Albums extends Base{

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "lanzamiento")
    private String fechaLanzamiento;

    @Column(name = "duracion")
    private String duracion;

    @Column(name = "genero")
    private String genero;

    @Column(name ="descripcion")
    private String descripcion;

    @Column(name = "esVinilo")
    private boolean esVinilo;

    @Column(name = "imgUrl")
    private String url;

    @Column(name = "esExplicito")
    private boolean explicit;

    @ManyToMany(cascade = CascadeType.REFRESH)
    private List<Artista> artistas;

    @ManyToMany(cascade = CascadeType.REFRESH)
    private List<Singles> singles;

}


