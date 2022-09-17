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
@Table(name = "imagenes")
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Audited
public class Imagenes extends Base {

    @Column(name = "url")
    private String url;

}
