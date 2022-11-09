package com.antosito.programacion3cetaph.Entidades;

import lombok.*;

import javax.persistence.*;
import java.util.List;

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table(name = "carrito")
    public class Cart extends Base {

        @OneToOne(cascade = CascadeType.PERSIST)
        private User user; //1,1


        @ManyToMany(cascade = CascadeType.REFRESH)
        private List<Albums> album; //2,3

    }




