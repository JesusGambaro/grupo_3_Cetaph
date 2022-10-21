package com.antosito.programacion3cetaph.Entidades;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(name = "imgs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Imagenes extends Base{
    @Column(name = "imgUrl")
    private String urlImg;


}
