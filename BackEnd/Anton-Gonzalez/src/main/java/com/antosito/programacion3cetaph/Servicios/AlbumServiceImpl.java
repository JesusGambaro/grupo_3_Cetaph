package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Albums;
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
    public List<Albums> SearchAlbums(Boolean filtroVil, String filtroName, Float filtroPriceMax, Float filtroPriceMin, Boolean fitroExp) throws Exception {
        try {
            List<Albums> albumsList = albumRepository.SearchAlbum(filtroVil, filtroName, filtroPriceMax, filtroPriceMin, fitroExp);
            return albumsList;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
    //Creamos las listas en el metodo con las queries que determinamos en la repository
    @Override
    public Page<Albums> searchAlbumsbyArtist(String Name, Pageable pageable) throws Exception {
        try {
            Page<Albums> albumsList = albumRepository.searchAlbumsByArtistas(Name,pageable);
            return albumsList;
        }catch(Exception e){
            throw new Exception(e.getMessage());
        }
    }
   /* @Override
    @Transactional
    public Page<Albums> findAllAlbums(Pageable pageable) throws Exception {
        try {
            Page<Albums> albumsList = BaseRepository.findAll(pageable);
            return albumsList;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }*/

    public boolean exists(long id){
        return albumRepository.existsById(id);
    }


}
