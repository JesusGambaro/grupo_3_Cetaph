package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Entidades.Artista;
import com.antosito.programacion3cetaph.Entidades.Cart;
import com.antosito.programacion3cetaph.Entidades.Imagenes;
import com.antosito.programacion3cetaph.Servicios.*;
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
    @Autowired
    AlbumService albumService;

    @Autowired
    CartService cartService;

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
                return new ResponseEntity<>("no existe", HttpStatus.NOT_FOUND);
            Artista delArtista = artistaService.findById(id);
            List<Albums> AlbumsList = albumService.findAll();

            List<Artista> artistaList;
            for (Albums alb:AlbumsList){
                //filtrado de albums q tengan el artista

                if (alb.getArtistas().contains(delArtista)){
                    List<Cart> CartContaining = (cartService.findCartbyAlbumList(alb.getId()));
                    if (alb.getArtistas().size() > 1){
                        artistaList = alb.getArtistas();
                        artistaList.remove(delArtista);
                        alb.setArtistas(artistaList);
                        albumService.update(alb.getId(),alb);
                    }else{
                        for (Cart cart:CartContaining) {
                            List<Albums> cartAlbumList = cart.getAlbum();
                            for (int i = 0; i < cartAlbumList.size(); i++) {
                                if (cartAlbumList.get(i).getId().equals(alb.getId())){
                                    cartAlbumList.remove(i);
                                }
                            }
                            cart.setAlbum(cartAlbumList);
                            cartService.delete(cart.getId());
                            cartService.save(cart);
                        }
                        albumService.delete(alb.getId());
                    }

                }
            }

            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(artistaService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/createArtista")
    public ResponseEntity<?> upload(@RequestPart("artista") Artista artista, @RequestPart("Imagen") MultipartFile file) throws IOException {
       try {
           BufferedImage bi = ImageIO.read(file.getInputStream());
           if (bi == null) {
               return new ResponseEntity<>("imagen no válida", HttpStatus.BAD_REQUEST);
           }
           var result = cloudinaryService.upload(file);
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
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/updateArtista/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,@RequestPart("artista") Artista artista,@RequestPart(value = "ImgBorrada",required = false) Long ImgBorrada ,@RequestPart(value = "Imagen",required = false) MultipartFile multipartFleImg) {
        try {
            Artista artistaRecuperado = artistaService.findById(id);
            Imagenes imagenPresente = artistaRecuperado.getImagenes();
            if (multipartFleImg != null){
                BufferedImage bi = ImageIO.read(multipartFleImg.getInputStream());
                if (bi == null) {
                    return new ResponseEntity<>("Imagen no valida", HttpStatus.BAD_REQUEST);
                }
                var result = cloudinaryService.upload(multipartFleImg);
                Imagenes imagenes = new Imagenes((String) result.get("url"),(String) result.get("public_id"));
                imagenesService.save(imagenes);
                artista.setImagenes(imagenes);
            }
            if(ImgBorrada != null){
                Imagenes imagenExiste = imagenesService.findById(imagenPresente.getId());
                cloudinaryService.delete(imagenExiste.getCloudinaryId());
                imagenesService.delete(imagenPresente.getId());
            }
            return ResponseEntity.status(HttpStatus.OK).body(artistaService.update(id, artista));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se guardo el artista");
        }
    }
}




