package com.antosito.programacion3cetaph.Entidades;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "artista")
@Setter
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
@Audited
public class Artista extends Base {


    //Crear una relacion con singles
    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String nacionalidad;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_album")
    private List<Albums> albums;

}
