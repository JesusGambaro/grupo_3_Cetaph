package com.antosito.programacion3cetaph.Repositorios;

import com.antosito.programacion3cetaph.Entidades.Singles;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SinglesRepository extends BaseRepository<Singles,Long>{
    @Query(value = "SELECT * Singles s WHERE " +
            "s.nombre LIKE %:filtroName% AND " +
            "s.precio >= :filtroPrecio AND " +
            "s.genero_fk = :filtroID",
            nativeQuery = true)
    List<Singles> searchFilter(@Param("filtroName") String filtroName, @Param("filtroPrecio")Float filtroPrecio, @Param("filtroID") Long filtroID);
}