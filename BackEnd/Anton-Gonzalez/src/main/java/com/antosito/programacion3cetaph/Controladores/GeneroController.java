package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Genero;
import com.antosito.programacion3cetaph.Servicios.GeneroService;
import com.antosito.programacion3cetaph.Servicios.GeneroServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/genero")
public class GeneroController extends BaseControladorImplementacion<Genero, GeneroServiceImpl> {

    @Autowired
    GeneroService generoService;

    @GetMapping("")
    public ResponseEntity<Page<Genero>> getAllPaged(@PageableDefault(size = 10, page = 0) Pageable pageable){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(generoService.findAllPaged(pageable));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
