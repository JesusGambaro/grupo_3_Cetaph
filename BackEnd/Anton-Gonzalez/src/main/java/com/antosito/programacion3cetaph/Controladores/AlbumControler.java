package com.antosito.programacion3cetaph.Controladores;
import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Servicios.AlbumService;
import com.antosito.programacion3cetaph.Servicios.AlbumServiceImpl;
import com.antosito.programacion3cetaph.Servicios.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping(path = "api/v1/album")
public class AlbumControler extends BaseControladorImplementacion<Albums, AlbumServiceImpl>{
    @Autowired
    CloudinaryService cloudinaryService;

    @Autowired
    AlbumService albumService;

    @PostMapping(value = "/uploadImg",consumes ={ MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> upload(@RequestPart("album") Albums albums, @RequestPart("file") MultipartFile multipartFile)throws IOException {
        try{
            BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
            if(bi == null){
                return new ResponseEntity("imagen no válida", HttpStatus.BAD_REQUEST);
            }
            Map result = cloudinaryService.upload(multipartFile);

            albums.setUrlImg((String)result.get("url"));

            return ResponseEntity.status(HttpStatus.OK).body(albumService.save(albums));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error, no se pudo guardar el dato.\"}"+e);
        }
    }

}
