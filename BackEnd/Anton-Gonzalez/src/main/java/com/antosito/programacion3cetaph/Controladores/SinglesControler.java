package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Entidades.Imagenes;
import com.antosito.programacion3cetaph.Entidades.Singles;
import com.antosito.programacion3cetaph.Servicios.AlbumService;
import com.antosito.programacion3cetaph.Servicios.CloudinaryService;
import com.antosito.programacion3cetaph.Servicios.SinglesService;
import com.antosito.programacion3cetaph.Servicios.SinglesServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/singles")
public class SinglesControler extends BaseControladorImplementacion<Singles, SinglesServiceImpl>{
    //Le damos un mapeo respetivo para llamar al metodo de repostory en este caso usamos
    /* http://localhost:9000/api/v1/singles/search?Name=All */
    @GetMapping("/search")
    public ResponseEntity<?> searchFilter(@RequestParam String Name){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(servicio.searchFilter(Name));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" +e.getMessage()+"\"}");
        }
    }
    //Le damos un mapeo respetivo para llamar al metodo de repostory en este caso usamos
    /* http://localhost:9000/api/v1/singles/searchSinglesByArtist?Name=Plague  */
    @GetMapping("/searchSinglesByArtist")
    public ResponseEntity<?> searchSinglesBy(@RequestParam(required = false) String Name){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(servicio.searchSinglesByArtist(Name));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" +e.getMessage()+"\"}");
        }
    }
    @Autowired
    CloudinaryService cloudinaryService;

    @Autowired
    SinglesService singleService;
    /*Subimos los 30segs preview en este metodo y se lo asignamos a la single*/
    @PostMapping(value = "/uploadM",consumes ={ MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> upload(@RequestPart("Single") Singles singles, @RequestPart("file") MultipartFile multipartFile)throws IOException {
        try{
            Map result = cloudinaryService.uploadMusic(multipartFile);
            singles.setUrlMusic((String)result.get("url"));
            singles.setCloudinaryId((String) result.get("public_id"));
            return ResponseEntity.status(HttpStatus.OK).body(singleService.save(singles));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error, no se pudo guardar el dato.\"}"+e);
        }
    }

    @DeleteMapping("/deleteMusic/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") long id) throws Exception {
        if(!singleService.exists(id))
            return new ResponseEntity("no existe", HttpStatus.NOT_FOUND);
        Singles singleunic = singleService.findById(id);
        System.out.println(singleunic.getCloudinaryId());
        Map result = cloudinaryService.deleteMusic(singleunic.getCloudinaryId());
        singleService.delete(id);
        return new ResponseEntity("musica eliminada", HttpStatus.OK);
    }






//Get datos hasta un limite de 10 para el landing bar
    @GetMapping("/data")
    public ResponseEntity<?> carruselLanding(){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.LandingCarrusel());
        }catch (Exception e){
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" +e.getMessage()+"\"}");
        }
    }
}
