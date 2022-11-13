package com.antosito.programacion3cetaph.Entidades;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(name = "Imagen")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Imagenes extends Base {
    @Column(name = "img_url")
    private String urlImg;

    @Column(name = "cloudinary_id")
    private String CloudinaryId;

}
