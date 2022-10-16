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

    /*Metodo para postear las imagenes para el album especifico*/
    /*Insertar url de posteo*/
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

    //Le damos un mapeo respetivo para llamar al metodo de repostory en este caso usamos
    /* http://localhost:9000/api/v1/album/searchAlbums?V=true&Name=Plague&Max=120&Min=120&Exp=true */
    @GetMapping("/searchAlbums")
    public ResponseEntity<?> searchAlbums(@RequestParam(required = false) Boolean V,@RequestParam(required = false) String Name,@RequestParam(required = false) Float Max,@RequestParam(required = false) Float Min,@RequestParam(required = false) Boolean Exp){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(servicio.SearchAlbums(V,Name,Min,Max,Exp));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" +e.getMessage()+"\"}");
        }
    }
    //Le damos un mapeo respetivo para llamar al metodo de repostory en este caso usamos
    /* http://localhost:9000/api/v1/album/searchAlbumsbyArtist?Name=Plague */
    @GetMapping("/searchAlbumsbyArtist")
    public ResponseEntity<?> searchAlbumsBy(@RequestParam(required = false)String Name){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.searchAlbumsbyArtist(Name));
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" +e.getMessage()+"\"}");
        }
    }
}
