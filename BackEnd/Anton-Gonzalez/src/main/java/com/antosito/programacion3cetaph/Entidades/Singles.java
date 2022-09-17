package com.antosito.programacion3cetaph.Entidades;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "singles")
@NoArgsConstructor
@RequiredArgsConstructor
@Setter
@Getter
@Audited
public class Singles extends Base {

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "duracion")
    private String duracion;

    @Column(name = "lanzamiento")
    private String fechaLanzamiento;

}
