package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Albums;
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
    @GetMapping("/filter")
    public ResponseEntity<?> searchFilter(@RequestParam(required = false) String filtroName){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(servicio.searchFilter(filtroName));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" +e.getMessage()+"\"}");
        }
    }
    @Autowired
    CloudinaryService cloudinaryService;

    @Autowired
    SinglesService singleService;

    @PostMapping(value = "/uploadM",consumes ={ MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> upload(@RequestPart("Single") Singles singles, @RequestPart("file") MultipartFile multipartFile)throws IOException {
        try{
            Map result = cloudinaryService.uploadMusic(multipartFile);
            singles.setUrlMusic((String)result.get("url"));
            return ResponseEntity.status(HttpStatus.OK).body(singleService.save(singles));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error, no se pudo guardar el dato.\"}"+e);
        }
    }

}
