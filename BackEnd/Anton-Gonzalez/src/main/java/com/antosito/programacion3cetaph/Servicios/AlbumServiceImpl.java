package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Entidades.Singles;
import com.antosito.programacion3cetaph.Repositorios.AlbumRepository;
import com.antosito.programacion3cetaph.Repositorios.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class AlbumServiceImpl extends BaseServiceImplentation<Albums,Long> implements AlbumService {
    @Autowired
    private AlbumRepository albumRepository;

    public AlbumServiceImpl(BaseRepository<Albums, Long> baseRepository) {
        super(baseRepository);
    }

    //Creamos las listas en el metodo con las queries que determinamos en la repository
    @Override
    public List<Albums> SearchAlbums(Boolean filtroVil, String filtroName, Float filtroPriceMax, Float filtroPriceMin, Boolean fitroExp,Long filtroIdArtista) throws Exception {
        try {
            List<Albums> albumsList = albumRepository.SearchAlbum(filtroVil, filtroName, filtroPriceMax, filtroPriceMin, fitroExp, filtroIdArtista);
            return albumsList;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
    //Creamos las listas en el metodo con las queries que determinamos en la repository

    @Override
    public Page<Albums> searchAlbumsbyArtist(Long id, Pageable pageable) throws Exception {
        try {
            Page<Albums> albumsList = albumRepository.searchAlbumsByArtistas(id,pageable);
            return albumsList;
        }catch(Exception e){
            throw new Exception(e.getMessage());
        }
    }
    public boolean exists(long id){
        return albumRepository.existsById(id);
    }

    @Override
    public List<Albums> LandingCarrusel() throws Exception {
        try {
            List<Albums> albumsList = albumRepository.landingCarrusel();
            return albumsList;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
