package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Albums;

import java.util.List;

public interface AlbumService extends BaseServices<Albums,Long>{

    //Declaramos las listas y los parametros que necesita
    List<Albums>SearchAlbums(Boolean filtroVil,
                             String filtroName,
                             Float filtroPriceMin,
                             Float filtroPriceMax,
                             Boolean fitroExp) throws Exception;


    List<Albums>searchAlbumsbyArtist(String Name) throws Exception;

}
