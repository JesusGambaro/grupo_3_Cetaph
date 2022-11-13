package com.antosito.programacion3cetaph.Repositorios;

import com.antosito.programacion3cetaph.Entidades.Artista;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtistaRepository extends BaseRepository<Artista,Long>{

    //Query que busca el Artista por su nombre
    @Query(value = "SELECT * FROM artista a WHERE :filtro IS NULL OR a.nombre LIKE %:filtro%",
    nativeQuery = true)
    List<Artista> searchArtista (@Param("filtro")String filtro);
}