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

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_artista")
    private List<Artista> artistas;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "album_single",
            joinColumns = @JoinColumn(name = "album_id"),
            inverseJoinColumns = @JoinColumn(name = "single_id")
    )
    private List<Singles>singles;

}


