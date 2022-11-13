package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Imagenes;
import com.antosito.programacion3cetaph.Repositorios.BaseRepository;
import com.antosito.programacion3cetaph.Repositorios.ImagenesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ImagenesServiceImpl extends BaseServiceImplentation<Imagenes,Long> implements ImagenesService {

    @Autowired
    private ImagenesRepository imagenesRepository;
    public boolean exists(long id){
        return imagenesRepository.existsById(id);
    }
    public ImagenesServiceImpl(BaseRepository<Imagenes, Long> baseRepository) {super(baseRepository);}
    public ArrayList<Imagenes> saveAllImg(ArrayList<Imagenes> imgs){
        return (ArrayList<Imagenes>) imagenesRepository.saveAll(imgs);
    }
}
