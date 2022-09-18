package com.antosito.programacion3cetaph.Entidades;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "albums")
@Setter
@Getter
@NoArgsConstructor
@RequiredArgsConstructor
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

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_artista")
    private List<Artista> artistas;


}


