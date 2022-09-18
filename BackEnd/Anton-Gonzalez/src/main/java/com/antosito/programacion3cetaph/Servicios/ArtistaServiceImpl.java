package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Artista;
import com.antosito.programacion3cetaph.Repositorios.ArtistaRepository;
import com.antosito.programacion3cetaph.Repositorios.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtistaServiceImpl extends BaseServiceImplentation<Artista,Long> implements ArtistaService {

    @Autowired
    private ArtistaRepository artistaRepository;

    public ArtistaServiceImpl(BaseRepository<Artista, Long> baseRepository) {
        super(baseRepository);
    }
}
