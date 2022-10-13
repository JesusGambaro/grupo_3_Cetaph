package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Artista;
import com.antosito.programacion3cetaph.Servicios.ArtistaServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/artista")
public class ArtistaControler extends BaseControladorImplementacion<Artista, ArtistaServiceImpl>{

    //Le damos un mapeo respetivo para llamar al metodo de repostory en este caso usamos
    @GetMapping("/searchArtist")
    public ResponseEntity<?> searchArtista (@RequestParam(required = false) String name){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.searchArtista(name));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" +e.getMessage()+"\"}");
        }
    }
}
