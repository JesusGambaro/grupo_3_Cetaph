package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Entidades.Artista;
import com.antosito.programacion3cetaph.Entidades.Singles;
import com.antosito.programacion3cetaph.Repositorios.ArtistaRepository;
import com.antosito.programacion3cetaph.Repositorios.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtistaServiceImpl extends BaseServiceImplentation<Artista,Long> implements ArtistaService {

    @Autowired
    private ArtistaRepository artistaRepository;

    public ArtistaServiceImpl(BaseRepository<Artista, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    public List<Albums> searchAlbumbyArtista(Long filtro) throws Exception {
        try {
            List<Albums> albumsList = artistaRepository.searchAlbumbyArtista(filtro);
            return albumsList;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<Singles> searchSinglebyArtista(Long filtro) throws Exception {
        try {
            List<Singles> singlesList = artistaRepository.searchSinglebyArtista(filtro);
            return singlesList;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
