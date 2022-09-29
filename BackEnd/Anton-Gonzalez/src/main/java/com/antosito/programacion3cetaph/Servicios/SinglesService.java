package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Singles;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;


public interface SinglesService extends BaseServices<Singles,Long> {
    List<Singles> searchFilter(String filtroName,Float filtroPrecio,Long filtroID) throws Exception;
}
