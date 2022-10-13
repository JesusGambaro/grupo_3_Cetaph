package com.antosito.programacion3cetaph.Repositorios;

import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Entidades.Artista;
import org.aspectj.weaver.ast.Var;
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


   //Creamos una query que busca todos los singles de un artista
    @Query(value = "SELECT a2.* FROM artista a " +
            "INNER JOIN albums_artistas aa on a.id = aa.artistas_id " +
            "INNER JOIN albums a2 on aa.albums_id = a2.id " +
            "WHERE (:Name IS NULL OR a.nombre LIKE %:Name%)",
            nativeQuery = true)
    List<Albums> searchAlbumsByArtistas(@Param("Name")String Name);



}