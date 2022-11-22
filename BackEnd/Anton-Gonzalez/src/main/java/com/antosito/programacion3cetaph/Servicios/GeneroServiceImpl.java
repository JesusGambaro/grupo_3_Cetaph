package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Genero;
import com.antosito.programacion3cetaph.Repositorios.BaseRepository;
import com.antosito.programacion3cetaph.Repositorios.GeneroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GeneroServiceImpl extends BaseServiceImplentation<Genero,Long> implements GeneroService {

    @Autowired
    private GeneroRepository generoRepository;

    public GeneroServiceImpl(BaseRepository<Genero,Long> baseRepository){super(baseRepository);}

}
