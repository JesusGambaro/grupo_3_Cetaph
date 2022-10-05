package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Entidades.Artista;
import com.antosito.programacion3cetaph.Entidades.Singles;



import java.util.List;

public interface ArtistaService extends BaseServices<Artista,Long>{
    List<Albums> searchAlbumbyArtista (Long filtro) throws Exception;
    List<Singles> searchSinglebyArtista (Long filtro) throws Exception;
}
