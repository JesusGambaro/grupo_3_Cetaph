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
import java.util.ArrayList;
@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/img")
public class ImagenesController extends BaseControladorImplementacion<Imagenes, ImagenesServiceImpl>{

    @Autowired
    ImagenesService imagenesService;
    @Autowired
    CloudinaryService cloudinaryService;
    @DeleteMapping("/deleteImg/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") long id) throws Exception {
        if(!imagenesService.exists(id))
            return new ResponseEntity<>("no existe", HttpStatus.NOT_FOUND);
        Imagenes imagen = imagenesService.findById(id);
        var result = cloudinaryService.delete(imagen.getCloudinaryId());
        imagenesService.delete(id);
        return new ResponseEntity<>("imagen eliminada", HttpStatus.OK);
    }


    @PostMapping(value = "/uploadImg",consumes ={ MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> upload(@RequestPart("file") MultipartFile[] multipartFile)throws IOException {
        try {
            ArrayList<Imagenes> returnImgs =  new ArrayList<>();
            for (MultipartFile file : multipartFile){
                BufferedImage bi = ImageIO.read(file.getInputStream());
                if (bi == null) {
                    return new ResponseEntity<>("imagen no válida", HttpStatus.BAD_REQUEST);
                }
                var result = cloudinaryService.upload(file);
                Imagenes imagenes = new Imagenes((String) result.get("url"),(String) result.get("public_id"));
                returnImgs.add(imagenes);
            }

            return ResponseEntity.status(HttpStatus.OK).body(imagenesService.saveAllImg(returnImgs));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error, no se pudo guardar el dato.\"}"+e);
        }
    }

}
