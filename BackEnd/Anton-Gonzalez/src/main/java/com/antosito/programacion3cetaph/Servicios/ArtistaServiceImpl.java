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

    public boolean exists(long id){
        return artistaRepository.existsById(id);
    }
    @Override
    public List<Artista> searchArtista(String filtro) throws Exception {
       try {
           List <Artista> artistaList = artistaRepository.searchArtista(filtro);
           return artistaList;
       }catch (Exception e){
           throw new Exception(e.getMessage());
       }
    }
}
