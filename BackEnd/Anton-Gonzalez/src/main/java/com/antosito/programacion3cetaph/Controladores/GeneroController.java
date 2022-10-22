package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Genero;
import com.antosito.programacion3cetaph.Servicios.GeneroService;
import com.antosito.programacion3cetaph.Servicios.GeneroServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/genero")
public class GeneroController extends BaseControladorImplementacion<Genero, GeneroServiceImpl> {

    @Autowired
    GeneroService generoService;


}
