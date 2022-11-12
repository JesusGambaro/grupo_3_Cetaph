package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Entidades.Singles;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AlbumService extends BaseServices<Albums,Long>{

    //Declaramos las listas y los parametros que necesita
    List<Albums>SearchAlbums(Boolean filtroVil,
                             String filtroName,
                             Float filtroPriceMin,
                             Float filtroPriceMax,
                             Boolean fitroExp,
                             Long IdArtista) throws Exception;


    Page<Albums> searchAlbumsbyArtist(Long id, Pageable pageable) throws Exception;

    //Page <Albums> findAllAlbums(Pageable pageable) throws Exception;

    boolean exists(long id);
    List<Albums> LandingCarrusel() throws Exception;
}
