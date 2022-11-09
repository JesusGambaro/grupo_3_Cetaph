package com.antosito.programacion3cetaph.Controladores;
import com.antosito.programacion3cetaph.Entidades.*;
import com.antosito.programacion3cetaph.Servicios.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST})
@RequestMapping(path = "api/v1/album")
public class AlbumControler extends BaseControladorImplementacion<Albums, AlbumServiceImpl>{
    @Autowired
    CloudinaryService cloudinaryService;

    @Autowired
    AlbumService albumService;

    @Autowired
    SinglesService singleService;

    @Autowired
    ImagenesService imagenesService;

    @Autowired
    ArtistaService artistaService;

    @Autowired
    CartService cartService;

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
    public ResponseEntity<?> searchAlbumsBy(@RequestParam(required = false)String Name, Pageable pageable){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.searchAlbumsbyArtist(Name, pageable));
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" +e.getMessage()+"\"}");
        }
    }

    @PostMapping(value = "/upload",consumes ={ MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> upload(@RequestPart("Album") Albums albums, @RequestPart("Imagenes") MultipartFile[] multipartFile,@RequestPart("SinglesList") List<Singles> singlesList,@RequestPart("musicFiles") MultipartFile[] multipartFileMusic,@RequestParam("idArtista") List<Long> idArtistas)throws IOException {
        try{
            List<Artista> artistaCreado = new ArrayList<>();
            for (Long id: idArtistas) {
                artistaCreado.add(artistaService.findById(id));
            }

            List<Imagenes> returnImgs =  new ArrayList<>();
            for (MultipartFile file : multipartFile){

                BufferedImage bi = ImageIO.read(file.getInputStream());
                if (bi == null) {
                    return new ResponseEntity("imagen no válida", HttpStatus.BAD_REQUEST);
                }
                Map result = cloudinaryService.upload(file);
                Imagenes imagenes = new Imagenes((String) result.get("url"),(String) result.get("public_id"));
                imagenesService.save(imagenes);
                returnImgs.add(imagenes);
            }


            List<Singles> singlesToAdd = new ArrayList<>();
            if (multipartFileMusic!=null){
                if (singlesList!=null){
                    int iterator=0;
                    for (MultipartFile music : multipartFileMusic){
                        Map result = cloudinaryService.uploadMusic(music);
                        Singles singles = singlesList.get(iterator);
                        singles.setUrlMusic((String)result.get("url"));
                        singles.setCloudinaryId((String) result.get("public_id"));
                        singleService.save(singles);
                        singlesToAdd.add(singles);
                        iterator++;
                    }
                }
            }

            albums.setArtistas(artistaCreado);
            albums.setSingles(singlesToAdd);
            albums.setImagenes(returnImgs);
            return ResponseEntity.status(HttpStatus.OK).body(albumService.save(albums));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error, no se pudo guardar el dato.\"}"+e);
        }
    }

    @DeleteMapping("/deleteComplete/{id}") //Delete
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            if(!albumService.exists(id))
                return new ResponseEntity("no existe", HttpStatus.NOT_FOUND);
            Albums album = albumService.findById(id);
            List<Imagenes> imagenes = (album.getImagenes());
            List<Singles> singles = (album.getSingles());

            List<Cart> CartContaining = (cartService.findCartbyAlbumList(album.getId()));
            for (Cart cart : CartContaining){
                System.out.println(cart.getId());
                cartService.delete((long)cart.getId());
            }

            albumService.delete(id);
            for (Imagenes img:imagenes){
                Map result = cloudinaryService.delete(img.getCloudinaryId());
                System.out.println("---------------------------------------------------------------------------");
                System.out.println("Borrando Imagenes");
                System.out.println("---------------------------------------------------------------------------");

                boolean seBorro = imagenesService.delete(img.getId());
                if (seBorro){
                    System.out.println("Se Borro Correctamente");
                }else{
                    System.out.println("No se Borro Correctamente");
                }
                try {

                }catch (Exception e){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error imgs\": \"" +e.getMessage()+"\"}");
                }

            }
            for (Singles single:singles){
                Map result = cloudinaryService.delete(single.getCloudinaryId());
                System.out.println("---------------------------------------------------------------------------");
                System.out.println("Borrando Canciones");
                System.out.println("---------------------------------------------------------------------------");
                boolean seBorro = singleService.delete(single.getId());
                if (seBorro){
                    System.out.println("Se Borro Correctamente");
                }else{
                    System.out.println("No se Borro Correctamente");
                }
            }
            return ResponseEntity.status(HttpStatus.OK).body("Se borro correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" +e.getMessage()+"\"}");
        }
    }

    @CrossOrigin(origins = "*")
    @PutMapping(value = "/update/{id}",consumes ={ MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateAlbumIMgs(@RequestPart("Album") Albums album,@RequestPart(value = "ImgsBorradas",required = false) List<Long> ImgsBorradas ,@RequestPart(value = "file",required = false) MultipartFile[] multipartFleImgs,@RequestPart( value ="SinglesList",required = false) List<Singles> singlesList,@RequestPart( value ="musicFiles" ,required = false) MultipartFile[] multipartFileMusic,@RequestPart(value = "CancionesBorradas",required = false) List<Long> CancionesBorradas,@PathVariable Long id, @RequestParam("idArtista")Long idArtista)throws IOException {
        try{
            List<Imagenes> returnImgs;
            List<Singles> returnCanciones;
            Albums albumUpdated = albumService.findById(id);
            returnImgs=albumUpdated.getImagenes();
            List<Artista> returnArtista = (albumUpdated.getArtistas());
            returnCanciones=albumUpdated.getSingles();
            if (multipartFleImgs != null) {
                for (MultipartFile file : multipartFleImgs){
                    BufferedImage bi = ImageIO.read(file.getInputStream());
                    if (bi == null) {
                        return new ResponseEntity("imagen no vÃ¡lida", HttpStatus.BAD_REQUEST);
                    }
                    Map result = cloudinaryService.upload(file);
                    Imagenes imagenes = new Imagenes((String) result.get("url"),(String) result.get("public_id"));
                    imagenesService.save(imagenes);
                    returnImgs.add(imagenes);
                }
            }
            for(Artista artista : returnArtista) {
                returnArtista.add(artistaService.findById(idArtista));
            }
            if (multipartFileMusic != null) {
                for (int i = 0; i < multipartFileMusic.length; i++) {
                    System.out.println("-------------------------------------------");
                    System.out.println("        Estoy creando una cancion          ");
                    System.out.println("-------------------------------------------");
                    Map result = cloudinaryService.uploadMusic(multipartFileMusic[i]);
                    singlesList.get(i).setCloudinaryId((String)result.get("public_id"));
                    singlesList.get(i).setUrlMusic((String)result.get("url"));
                    singleService.save(singlesList.get(i));
                    returnCanciones.add(singlesList.get(i));
                }


            }

            if (ImgsBorradas!=null){
                for (int i = 0; i < returnImgs.size(); i++) {
                    Imagenes img = returnImgs.get(i);
                    if(ImgsBorradas.contains(img.getId())){
                        returnImgs.remove(i);
                    }
                }
                album.setImagenes(returnImgs);

                for (Long ids:ImgsBorradas) {
                    Imagenes imagenExist = imagenesService.findById(ids);
                    cloudinaryService.delete(imagenExist.getCloudinaryId());
                    imagenesService.delete(ids);
                }
            }else {
                album.setImagenes(returnImgs);
            }
            if(CancionesBorradas!=null){
                System.out.println("-------------------------------------------");
                System.out.println("Borrando");
                for(int i = 0; i < returnCanciones.size(); i++) {
                    Singles singles = returnCanciones.get(i);
                    if (CancionesBorradas.contains(singles.getId())) returnCanciones.remove(i);
                    System.out.println("Borrando id" + singles.getId());
                }
                System.out.println("Guardando Canciones");
                album.setSingles(returnCanciones);
                for (Long ids:CancionesBorradas){
                    Singles singlesExist = singleService.findById(ids);
                    cloudinaryService.delete(singlesExist.getCloudinaryId());
                    singleService.delete(ids);
                }
            }else {
                System.out.println("Guardando Canciones");
                album.setSingles(returnCanciones);
            }
            System.out.println("-------------------------------------------");
            return ResponseEntity.status(HttpStatus.OK).body(albumService.update(id,album));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error, no se pudo guardar el dato.\"}"+e);
        }
    }
    @GetMapping("")
    public ResponseEntity<Page<Albums>> getAllPaged(@PageableDefault(size = 10, page = 0) Pageable pageable){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(albumService.findAllPaged(pageable));
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}
