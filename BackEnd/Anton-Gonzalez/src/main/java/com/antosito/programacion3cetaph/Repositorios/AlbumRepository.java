package com.antosito.programacion3cetaph.Repositorios;

import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Entidades.Artista;
import com.antosito.programacion3cetaph.Entidades.Singles;
import org.aspectj.weaver.ast.Var;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AlbumRepository extends BaseRepository<Albums, Long> {

    //Una query que filtra por varios parametros para encontrar un producto especifico en la base de datos

    @Query(value = "select * from albums a" +
            " inner join albums_singles sa on a.id = sa.albums_id" +
            " inner join singles s on sa.singles_id = s.id" +
            " left join albums_artistas aa on a.id = aa.albums_id " +
            " left join artista ar on aa.artistas_id = ar.id" +
            " where (:filtroVil is null or a.es_vinilo = :filtroVil)" +
            " and (:filtroIdArtista IS NULL OR ar.id = :filtroIdArtista)"+
            " and (:filtroName is null or ((a.nombre LIKE %:filtroName%) or (s.nombre LIKE %:filtroName%) or (a.descripcion LIKE %:filtroName%)))" +
            " and (:filtroPriceMax is null or  a.precio <= :filtroPriceMax and :filtroPriceMin is null or a.precio >= :filtroPriceMin)" +
            " and ( :filtroExp is null or a.es_explicito = :filtroExp)",
            nativeQuery = true)
    List<Albums> SearchAlbum(@Param("filtroVil") Boolean filtroVil,
                             @Param("filtroName") String filtroName,
                             @Param("filtroPriceMin") Float filtroPriceMin,
                             @Param("filtroPriceMax") Float filtroPriceMax,
                             @Param("filtroExp") Boolean fitroExp,
                             @Param("filtroIdArtista") Long IdArtista);

    @Query(value = "SELECT * FROM albums a " +
            "INNER JOIN albums_artistas  aa on a.id = aa.albums_id " +
            "WHERE (:id IS NULL OR aa.artistas_id = :id)",
            nativeQuery = true)
    Page<Albums> searchAlbumsByArtistas(@Param("id")Long id,Pageable pageable);

    @Query(value = "SELECT * FROM albums a ORDER BY a.nombre LIMIT 10",
            nativeQuery = true)
    List<Albums> landingCarrusel();
}