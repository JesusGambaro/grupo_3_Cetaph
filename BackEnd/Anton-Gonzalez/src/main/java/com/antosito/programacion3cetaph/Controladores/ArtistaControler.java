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
    @GetMapping("/SinglesBy")
    public ResponseEntity<?> searchSinglesByArtist(@RequestParam Long Name){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(servicio.searchSinglebyArtista(Name));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" +e.getMessage()+"\"}");
        }
    }
    @GetMapping("/AlbumsBy")
    public ResponseEntity<?> searchAlbumsByArtist(@RequestParam Long Name){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(servicio.searchAlbumbyArtista(Name));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" +e.getMessage()+"\"}");
        }
    }
}
