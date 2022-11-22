package com.antosito.programacion3cetaph.Entidades;


import lombok.*;

import javax.persistence.Entity;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rol extends Base {
    private String name;
}
