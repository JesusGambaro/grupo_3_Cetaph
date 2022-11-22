package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Albums;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AlbumService extends BaseServices<Albums, Long> {

    //Declaramos las listas y los parametros que necesita
    Page<Albums> SearchAlbums(String nombre,
                              Float precioMax,
                              Float precioMin,
                              String formato,
                              Boolean explicito,
                              String genero,
                              Pageable pageable) throws Exception;


    Page<Albums> searchAlbumsbyArtist(Long id, Pageable pageable) throws Exception;

    //Page <Albums> findAllAlbums(Pageable pageable) throws Exception;

    boolean exists(long id);

    List<Albums> LandingCarrusel() throws Exception;
}
