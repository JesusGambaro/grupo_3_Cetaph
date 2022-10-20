package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Usuarios;
import com.antosito.programacion3cetaph.Repositorios.BaseRepository;
import com.antosito.programacion3cetaph.Repositorios.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuariosServiceImpl extends BaseServiceImplentation<Usuarios,Long> implements UsuariosService {

    @Autowired
    UsuariosRepository usuariosRepository;

    public UsuariosServiceImpl(BaseRepository<Usuarios, Long> baseRepository) {super(baseRepository);}
}
