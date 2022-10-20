package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Usuarios;
import com.antosito.programacion3cetaph.Servicios.UsuariosServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/user")
public class UsuariosController extends BaseControladorImplementacion<Usuarios, UsuariosServiceImpl> {

}
