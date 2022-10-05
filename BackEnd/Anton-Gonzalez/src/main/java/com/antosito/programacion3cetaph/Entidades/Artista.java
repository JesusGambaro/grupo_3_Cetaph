package com.antosito.programacion3cetaph.Entidades;

import lombok.*;
import org.hibernate.envers.Audited;

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

    //Crear una relacion con singles
    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String nacionalidad;

    @OneToMany(cascade = CascadeType.REFRESH, orphanRemoval = true)
    @JoinTable(
            name = "artista_single",
            joinColumns = @JoinColumn(name = "artista_id"),
            inverseJoinColumns = @JoinColumn(name = "single_id")
    )
    private List<Singles> singles = new ArrayList<Singles>();

}
