package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Singles;

import java.util.List;


public interface SinglesService extends BaseServices<Singles, Long> {
    //Creamos las listas en el metodo con las queries que determinamos en la repository
    List<Singles> searchFilter(String filtroName) throws Exception;

    //Creamos las listas en el metodo con las queries que determinamos en la repository
    List<Singles> searchSinglesByArtist(String Name) throws Exception;

    //Creamos las listas en el metodo con las queries que determinamos en la repository
    List<Singles> LandingCarrusel() throws Exception;
    boolean exists(long id);
}
