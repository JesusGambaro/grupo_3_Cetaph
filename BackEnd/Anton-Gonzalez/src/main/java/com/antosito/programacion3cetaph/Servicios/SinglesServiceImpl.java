package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Singles;
import com.antosito.programacion3cetaph.Repositorios.BaseRepository;
import com.antosito.programacion3cetaph.Repositorios.SinglesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SinglesServiceImpl extends BaseServiceImplentation<Singles, Long> implements SinglesService {

    @Autowired
    private SinglesRepository singlesRepository;


    public SinglesServiceImpl(BaseRepository<Singles, Long> baseRepository) {
        super(baseRepository);
    }


    public boolean exists(long id){
        return singlesRepository.existsById(id);
    }



    //Creamos las listas en el metodo con las queries que determinamos en la repository
    @Override
    public List<Singles> searchFilter(String filtroName) throws Exception {
        try {
            List<Singles> singles = singlesRepository.searchFilter(filtroName);
            return singles;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<Singles> searchSinglesByArtist(String Name) throws Exception {
        try{
            List<Singles> singlesList = singlesRepository.searchSinglebyArtista(Name);
            return singlesList;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<Singles> LandingCarrusel() throws Exception {
        try {
            List<Singles> singlesList = singlesRepository.landingCarrusel();
            return singlesList;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

}
