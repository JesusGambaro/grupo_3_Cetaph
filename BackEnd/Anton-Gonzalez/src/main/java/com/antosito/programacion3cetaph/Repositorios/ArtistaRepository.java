package com.antosito.programacion3cetaph.Repositorios;

import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Entidades.Artista;
import com.antosito.programacion3cetaph.Entidades.Singles;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtistaRepository extends BaseRepository<Artista,Long>{

    @Query(value = "select aa* from Artista a join " +
            "albums_artistas aa on a.artista_id = aa.artistas_id " +
            "where (:filtro is null or aa.artista_id like :filtro)",
    nativeQuery = true)
    List<Albums> searchAlbumbyArtista (@Param("filtro")Long filtro);

    @Query(value = "select s.single_id from artista a join " +
            "artista_single s on a.id = s.artista_id " +
            "where (:filtro is null or a.id like :filtro)",
    nativeQuery = true)
    List<Artista> searchSinglebyArtista (@Param("filtro")Long filtro);
}
