package com.antosito.programacion3cetaph.Repositorios;

import com.antosito.programacion3cetaph.Entidades.Albums;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/*@Repository
public interface AlbumRepository extends BaseRepository<Albums, Long> {

    @Query(value = "select * from albums a where" +
            "(a.es_vinilo = :filtroVil)" +
            "and (a.nombre LIKE %:filtroName%)" +
            "and ( a.precio <= :filtroPriceMax and a.precio >= :filtroPriceMin)" +
            "and ( a.es_explicito = :filtroExp)",
            nativeQuery = true)
    List<Albums> SearchAlbum(@Param("filtroVil") Boolean filtroVil,
                             @Param("filtroName") String filtroName,
                             @Param("filtroPriceMin") Float filtroPriceMin,
                             @Param("filtroPriceMax") Float filtroPriceMax,
                             @Param("filtroExp") Boolean fitroExp);

}*/
@Repository
public interface AlbumRepository extends BaseRepository<Albums, Long> {

    @Query(value = "select * from albums a" +
            " inner join albums_singles sa on a.id = sa.albums_id" +
            " inner join singles s on sa.singles_id = s.id" +
            " where (:filtroVil is null or a.es_vinilo = :filtroVil)" +
            " and (:filtroName is null or ((a.nombre LIKE %:filtroName%) or (s.nombre LIKE %:filtroName%) or (a.descripcion LIKE %:filtroName%)))" +
            " and (:filtroPriceMax is null or  a.precio <= :filtroPriceMax and :filtroPriceMin is null or a.precio >= :filtroPriceMin)" +
            " and ( :filtroExp is null or a.es_explicito = :filtroExp)",
            nativeQuery = true)
    List<Albums> SearchAlbum(@Param("filtroVil") Boolean filtroVil,
                             @Param("filtroName") String filtroName,
                             @Param("filtroPriceMin") Float filtroPriceMin,
                             @Param("filtroPriceMax") Float filtroPriceMax,
                             @Param("filtroExp") Boolean fitroExp);
}