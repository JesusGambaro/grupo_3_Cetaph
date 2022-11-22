package com.antosito.programacion3cetaph.Entidades;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "genero")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Genero extends Base {
    @Column(name = "genero")
    private String generoName;
}
