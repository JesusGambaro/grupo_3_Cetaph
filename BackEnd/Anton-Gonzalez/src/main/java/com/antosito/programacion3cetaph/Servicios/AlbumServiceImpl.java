package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Repositorios.AlbumRepository;
import com.antosito.programacion3cetaph.Repositorios.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlbumServiceImpl extends BaseServiceImplentation<Albums,Long> implements AlbumService {
    @Autowired
    private AlbumRepository albumRepository;

    public AlbumServiceImpl(BaseRepository<Albums, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    public List<Albums> SearchAlbums(Boolean filtroVil, String filtroName, Float filtroPriceMax,Float filtroPriceMin, Boolean fitroExp) throws Exception {
        try {
            System.out.println("Me llego "+filtroName+" ,"+filtroVil+" ,"+filtroPriceMax+" ,"+filtroPriceMin+" ,"+fitroExp);
            List<Albums> albumsList = albumRepository.SearchAlbum(filtroVil,filtroName,filtroPriceMax,filtroPriceMin,fitroExp);
            return albumsList;
        }catch(Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
