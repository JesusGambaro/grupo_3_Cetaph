package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Artista;
import com.antosito.programacion3cetaph.Entidades.Imagenes;
import com.antosito.programacion3cetaph.Entidades.Singles;
import com.antosito.programacion3cetaph.Servicios.AlbumService;
import com.antosito.programacion3cetaph.Servicios.ArtistaService;
import com.antosito.programacion3cetaph.Servicios.ArtistaServiceImpl;
import com.antosito.programacion3cetaph.Servicios.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/artista")
public class ArtistaControler extends BaseControladorImplementacion<Artista, ArtistaServiceImpl>{

    @Autowired
    CloudinaryService cloudinaryService;

    @Autowired
    ArtistaService artistaService;

    //Le damos un mapeo respetivo para llamar al metodo de repostory en este caso usamos
    @GetMapping("/searchArtist")
    public ResponseEntity<?> searchArtista (@RequestParam(required = false) String name){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.searchArtista(name));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" +e.getMessage()+"\"}");
        }
    }

    @DeleteMapping("/deleteArtist/{id}") //Delete
    public ResponseEntity<?> delete(@PathVariable long id) {
        try {
            if(!artistaService.exists(id))
                return new ResponseEntity("no existe", HttpStatus.NOT_FOUND);
            List<Singles> singles = (artistaService.findById(id).getSingles());
            for (Singles sing : singles){
                Map result = cloudinaryService.deleteMusic(sing.getCloudinaryId());
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(artistaService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" +e.getMessage()+"\"}");
        }
    }
}
