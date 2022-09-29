package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Generos;
import com.antosito.programacion3cetaph.Repositorios.BaseRepository;
import com.antosito.programacion3cetaph.Repositorios.GenerosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GenerosServiceImpl extends BaseServiceImplentation<Generos,Long> implements GenerosService {
    @Autowired
    private GenerosRepository generosRepository;

    public GenerosServiceImpl(BaseRepository<Generos, Long> baseRepository) {
        super(baseRepository);
    }
}
