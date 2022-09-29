package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Generos;
import com.antosito.programacion3cetaph.Servicios.GenerosServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/generos")
public class GenerosController extends BaseControladorImplementacion<Generos, GenerosServiceImpl>{
}
