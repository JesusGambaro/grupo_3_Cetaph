package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Artista;

import java.util.List;

public interface ArtistaService extends BaseServices<Artista,Long>{
    List<Artista> searchArtista (String filtro) throws Exception;
    //Page<Artista> getAllArtista (Pageable pageable) throws Exception;
    boolean exists(long id);
}
