package com.antosito.programacion3cetaph.Repositorios;

import com.antosito.programacion3cetaph.Entidades.Albums;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlbumRepository extends BaseRepository<Albums,Long>{

    @Query(value = "select * from albums a where" +
            "(:filtroVil is null or a.es_vinilo = :filtroVil)" +
            "and (:filtroName is null or a.nombre LIKE :filtroName)" +
            "and (:filtroPriceMax is null or a.precio <= :filtroPriceMax or :filtroPriceMin is null or a.precio >= :filtroPriceMin)" +
            "and (:filtroExp is null or a.es_explicito = :filtroExp)",
            nativeQuery = true)
    List<Albums> SearchAlbum(@Param("filtroVil")Boolean filtroVil,
                             @Param("filtroName")String filtroName,
                             @Param("filtroPriceMin")Float filtroPriceMin,
                             @Param("filtroPriceMax")Float filtroPriceMax,
                             @Param("filtroExp")Boolean fitroExp);

}
