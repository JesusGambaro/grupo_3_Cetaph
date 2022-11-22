package com.antosito.programacion3cetaph.Entidades;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

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

    @Column(name = "duracion")
    private int duracion;

    @Column(name = "es_explicito")
    private boolean explicit;

    @Column(name = "music_url")
    private String urlMusic;

    @Column(name = "cloudinary_id")
    private String CloudinaryId;


}
