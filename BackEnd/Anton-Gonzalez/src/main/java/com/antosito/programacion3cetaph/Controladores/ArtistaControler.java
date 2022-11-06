package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Artista;
import com.antosito.programacion3cetaph.Entidades.Imagenes;
import com.antosito.programacion3cetaph.Entidades.Singles;
import com.antosito.programacion3cetaph.Servicios.ArtistaService;
import com.antosito.programacion3cetaph.Servicios.ArtistaServiceImpl;
import com.antosito.programacion3cetaph.Servicios.CloudinaryService;
import com.antosito.programacion3cetaph.Servicios.ImagenesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/artista")
public class ArtistaControler extends BaseControladorImplementacion<Artista, ArtistaServiceImpl> {

    @Autowired
    CloudinaryService cloudinaryService;

    @Autowired
    ArtistaService artistaService;

    @Autowired
    ImagenesService imagenesService;

    //Le damos un mapeo respetivo para llamar al metodo de repostory en este caso usamos
    @GetMapping("/searchArtist")
    public ResponseEntity<?> searchArtista(@RequestParam(required = false) String name) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.searchArtista(name));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @DeleteMapping("/deleteArtist/{id}") //Delete
    public ResponseEntity<?> delete(@PathVariable long id) {
        try {
            if (!artistaService.exists(id))
                return new ResponseEntity("no existe", HttpStatus.NOT_FOUND);

            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(artistaService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/createArtista")
    public ResponseEntity<?> upload(@RequestPart("artista") Artista artista, @RequestPart("file") MultipartFile file) throws IOException {
       try {
           BufferedImage bi = ImageIO.read(file.getInputStream());
           if (bi == null) {
               return new ResponseEntity("imagen no válida", HttpStatus.BAD_REQUEST);
           }
           Map result = cloudinaryService.upload(file);
           Imagenes imagenes = new Imagenes((String) result.get("url"), (String) result.get("public_id"));
           imagenesService.save(imagenes);
           artista.setImagenes(imagenes);
           return ResponseEntity.status(HttpStatus.OK).body(artistaService.save(artista));
       }catch(Exception e){
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se guardo la imagen");
        }
    }
    @GetMapping("")
    public ResponseEntity<Page<Artista>> getAllPaged(@PageableDefault(size = 10, page = 0) Pageable pageable){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(artistaService.findAllPaged(pageable));
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}




