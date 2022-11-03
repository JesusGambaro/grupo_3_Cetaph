package com.antosito.programacion3cetaph.Entidades;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table(name = "carrito")
    public class Cart extends Base {



        @OneToOne(cascade = CascadeType.ALL)
        private User user; //1,1

        @ManyToMany(cascade = CascadeType.REFRESH)
        private List<Albums> album; //2,3

    }




