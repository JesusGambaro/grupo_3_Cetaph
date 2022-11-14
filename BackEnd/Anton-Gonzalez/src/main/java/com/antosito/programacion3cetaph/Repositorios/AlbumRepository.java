package com.antosito.programacion3cetaph.Repositorios;

import com.antosito.programacion3cetaph.Entidades.Albums;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AlbumRepository extends BaseRepository<Albums, Long> {

    //Una query que filtra por varios parametros para encontrar un producto especifico en la base de datos
    @Query(value = "SELECT * from albums alb " +
            "inner join genero g on alb.genero_id = g.id " +
            "left join albums_singles `as` on `as`.albums_id = alb.id " +
            "left join singles s on `as`.singles_id = s.id " +
            "left join albums_artistas aa on alb.id = aa.albums_id " +
            "left join artista ar on aa.artistas_id = ar.id " +
            "where ((alb.nombre like concat('%', :fTexto, '%') OR s.nombre like concat('%', :fTexto, '%') or " +
            "alb.descripcion like concat('%', :fTexto, '%') or ar.nombre like concat('%', :fTexto, '%')) OR :fTexto is null) " +
            "and (alb.precio between :fPrecioMin and :fPrecioMax or :fPrecioMin is null or :fPrecioMax is null) " +
            "and (alb.precio >= :fPrecioMin or :fPrecioMin is null) " +
            "and (alb.precio <= :fPrecioMax or :fPrecioMax is null) " +
            "and (alb.formato LIKE concat('%', :fFormato, '%') or :fFormato is null) " +
            "and (g.genero LIKE concat('%', :fGenero, '%') or :fGenero is null) " +
            "and (alb.es_explicito = :fExplicito or :fExplicito is null) " +
            "group by alb.id",
            countQuery = "SELECT count(*) from albums alb " +
                    "inner join genero g on alb.genero_id = g.id " +
                    "left join albums_singles `as` on `as`.albums_id = alb.id " +
                    "left join singles s on `as`.singles_id = s.id " +
                    "left join albums_artistas aa on alb.id = aa.albums_id " +
                    "left join artista ar on aa.artistas_id = ar.id " +
                    "where ((alb.nombre like concat('%', :fTexto, '%') OR s.nombre like concat('%', :fTexto, '%') or " +
                    "alb.descripcion like concat('%', :fTexto, '%') or ar.nombre like concat('%', :fTexto, '%')) OR :fTexto is null) " +
                    "and (alb.precio between :fPrecioMin and :fPrecioMax or :fPrecioMin is null or :fPrecioMax is null) " +
                    "and (alb.precio >= :fPrecioMin or :fPrecioMin is null) " +
                    "and (alb.precio <= :fPrecioMax or :fPrecioMax is null) " +
                    "and (alb.formato LIKE concat('%', :fFormato, '%') or :fFormato is null) " +
                    "and (g.genero LIKE concat('%', :fGenero, '%') or :fGenero is null) " +
                    "and (alb.es_explicito = :fExplicito or :fExplicito is null) " +
                    "group by alb.id",
            nativeQuery = true)
    Page<Albums> SearchAlbum(@Param("fTexto") String fTexto,
                             @Param("fPrecioMin") Float fPrecioMin,
                             @Param("fPrecioMax") Float fPrecioMax,
                             @Param("fFormato") String fFormato,
                             @Param("fExplicito") Boolean fExplicito,
                             @Param("fGenero") String fGenero,
                             Pageable pageable
    );

    @Query(value = "SELECT * FROM albums a " +
            "INNER JOIN albums_artistas  aa on a.id = aa.albums_id " +
            "WHERE (:id IS NULL OR aa.artistas_id = :id)",
            nativeQuery = true)
    Page<Albums> searchAlbumsByArtistas(@Param("id") Long id, Pageable pageable);

    @Query(value = "SELECT * FROM albums a ORDER BY a.nombre LIMIT 10",
            nativeQuery = true)
    List<Albums> landingCarrusel();
}