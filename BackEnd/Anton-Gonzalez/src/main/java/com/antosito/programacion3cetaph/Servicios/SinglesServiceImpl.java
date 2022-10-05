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

    @Override
    public List<Singles> searchFilter(String filtroName) throws Exception {
        try {
            List<Singles> singles = singlesRepository.searchFilter(filtroName);
            return singles;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
