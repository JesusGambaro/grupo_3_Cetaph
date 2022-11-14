package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Entidades.Cart;
import com.antosito.programacion3cetaph.Entidades.User;
import com.antosito.programacion3cetaph.Servicios.AlbumService;
import com.antosito.programacion3cetaph.Servicios.CartService;
import com.antosito.programacion3cetaph.Servicios.CartServiceImpl;
import com.antosito.programacion3cetaph.Servicios.UserService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/cart")
public class CartController extends BaseControladorImplementacion<Cart, CartServiceImpl> {
    @Autowired
    CartService cartService;
    @Autowired
    UserService userService;
    @Autowired
    AlbumService albumService;

    public String getUsername(String token){
        Algorithm algorithm = Algorithm.HMAC256("cetaphweb".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getSubject();
    }
    @GetMapping("/get")
    public ResponseEntity<?> getUserCart(@RequestParam("token") String token) throws Exception {
        User userCurrent = userService.getUser(getUsername(token));
        if(userCurrent == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El usuario no existe");
        }
        List<Albums> albumCart = new ArrayList<>();
        Cart cart  = cartService.getCartbyUser(userCurrent);
        if (cart == null){
            cart = new Cart(userCurrent,albumCart);
        }
        cartService.save(cart);
        return ResponseEntity.status(HttpStatus.OK).body(cart.getAlbum());
    }
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestParam("idAlbum")Long id,@RequestParam("token") String token) throws Exception {

        User userCurrent = userService.getUser(getUsername(token));
        System.out.println(userCurrent);
        Cart cart = cartService.getCartbyUser(userCurrent);
        List<Albums> albumCart = new ArrayList<>();

        if(userCurrent == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El usuario no existe");
        }

        if (cart == null){
            cart = new Cart(userCurrent,albumCart);
        }else{

            albumCart = cart.getAlbum();
        }

        if(albumService.exists(id)){
            albumCart.add(albumService.findById(id));
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro el album");
        }

        cart.setAlbum(albumCart);
        cartService.delete(cart.getId());
        cartService.save(cart);
        return ResponseEntity.status(HttpStatus.OK).body("Se Guardo");
    }




    @PutMapping("/deleteAlbum/")
    public ResponseEntity<?> deleteAlbum(@RequestParam("idAlbumBorrado")Long id,@RequestParam("token") String token) throws Exception {
        User user = userService.getUser(getUsername(token));

        if (user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro el usuario");
        }
        try {
            //TODO Update not working
            Cart oldCart = cartService.getCartbyUser(user);
            List<Albums> albumsList = oldCart.getAlbum();

            if (!albumService.exists(id)){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro el album");
            }
            for (int i = 0; i < albumsList.size() ; i++) {
                if (albumsList.get(i).getId().equals(id)){
                    albumsList.remove(i);
                }

            }
            Cart newCart = new Cart(user,albumsList);
            cartService.delete(oldCart.getId());
            cartService.save(newCart);
            return ResponseEntity.status(HttpStatus.OK).body("Se actualizo");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se actualizo");
        }
    }


    @PutMapping("/update")
    public ResponseEntity<?> updateCart(@RequestParam("idAlbum")Long id,@RequestParam("token") String token) throws Exception {
        User userCurrent = userService.getUser(getUsername(token));
        Cart cart = cartService.getCartbyUser(userCurrent);
        List<Albums> albumCart = cart.getAlbum();
        if(albumService.exists(id)){
            albumCart.add(albumService.findById(id));
            for(Albums ignored : albumCart){
                cart.setAlbum(albumCart);
            }
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro el album");
        }
        return ResponseEntity.status(HttpStatus.OK).body(cartService.save(cart));
    }

    @PutMapping("/cleanCart")
    public ResponseEntity<?> cleanCart(@RequestParam("token") String token) throws Exception {
        User user = userService.getUser(getUsername(token));

        if (user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro el usuario");
        }
        try {
            //TODO Update not working
            Cart oldCart = cartService.getCartbyUser(user);
            Cart newCart = new Cart(user,new ArrayList<>());
            cartService.delete(oldCart.getId());
            cartService.save(newCart);
            return ResponseEntity.status(HttpStatus.OK).body("Se actualizo");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se actualizo");
        }
    }


    @DeleteMapping("/{id}") //Delete
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(cartService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error, no se pudo guardar el dato.\"}");
        }
    }
}
