package com.antosito.programacion3cetaph.Entidades;

import lombok.*;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "artista")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Audited
public class Artista extends Base {

    //Crear una relacion con singles
    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String nacionalidad;


}
