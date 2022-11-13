package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Repositorios.AlbumRepository;
import com.antosito.programacion3cetaph.Repositorios.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlbumServiceImpl extends BaseServiceImplentation<Albums, Long> implements AlbumService {
    @Autowired
    private AlbumRepository albumRepository;

    public AlbumServiceImpl(BaseRepository<Albums, Long> baseRepository) {
        super(baseRepository);
    }

    //Creamos las listas en el metodo con las queries que determinamos en la repository
    @Override
    public Page<Albums> SearchAlbums(String nombre, Float min, Float max, String formato, Boolean explicito,
                                     String genero,
                                     Pageable pageable) throws Exception {
        try {
            return albumRepository.SearchAlbum(nombre, min, max, formato, explicito,
                    genero,
                    pageable);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
    //Creamos las listas en el metodo con las queries que determinamos en la repository

    @Override
    public Page<Albums> searchAlbumsbyArtist(Long id, Pageable pageable) throws Exception {
        try {
            return albumRepository.searchAlbumsByArtistas(id, pageable);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public boolean exists(long id) {
        return albumRepository.existsById(id);
    }

    @Override
    public List<Albums> LandingCarrusel() throws Exception {
        try {
            return albumRepository.landingCarrusel();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
