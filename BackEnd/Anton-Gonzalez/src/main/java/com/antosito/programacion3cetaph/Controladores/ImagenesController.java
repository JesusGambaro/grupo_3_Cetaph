package com.antosito.programacion3cetaph.Controladores;


import com.antosito.programacion3cetaph.Entidades.Imagenes;
import com.antosito.programacion3cetaph.Servicios.CloudinaryService;
import com.antosito.programacion3cetaph.Servicios.ImagenesService;
import com.antosito.programacion3cetaph.Servicios.ImagenesServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
@RequestMapping(path = "api/v1/img")
public class ImagenesController extends BaseControladorImplementacion<Imagenes, ImagenesServiceImpl>{

    @Autowired
    ImagenesService imagenesService;
    @Autowired
    CloudinaryService cloudinaryService;

    @PostMapping(value = "/uploadImg",consumes ={ MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> upload(@RequestPart("file") MultipartFile[] multipartFile)throws IOException {
        try {
            for (MultipartFile file : multipartFile){
                BufferedImage bi = ImageIO.read(file.getInputStream());
                if (bi == null) {
                    return new ResponseEntity("imagen no válida", HttpStatus.BAD_REQUEST);
                }
                Map result = cloudinaryService.upload(file);
            Imagenes imagenes = new Imagenes((String) result.get("url"));
           ResponseEntity.status(HttpStatus.OK).body(servicio.save(imagenes));
        }
            return ResponseEntity.status(HttpStatus.OK).body("{\"Ey\":\"Pudo guardar el dato.\"}");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error, no se pudo guardar el dato.\"}"+e);
        }
    }

}
