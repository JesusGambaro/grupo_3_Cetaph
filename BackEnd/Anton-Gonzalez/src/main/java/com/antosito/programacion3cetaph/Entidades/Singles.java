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
@Audited
public class Singles extends Base {

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "duracion")
    private int duracion;

    @Column(name = "lanzamiento")
    private String fechaLanzamiento;

    @Column(name = "precio")
    private float precio;

    @Column(name = "stock")
    private int stock;

    @Column(name = "esExplicito")
    private boolean explicit;

    @OneToOne(cascade = CascadeType.PERSIST, optional = false)
    @JoinColumn(name = "genero_FK")
    private Generos genero;


}
