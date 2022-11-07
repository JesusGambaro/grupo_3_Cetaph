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
import org.springframework.data.domain.Pageable;
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
        String tokenUser = decodedJWT.getSubject();
        return tokenUser;
    }
    @GetMapping("/get")
    public ResponseEntity<?> getUserCart(@RequestParam("token") String token) throws Exception {
        User userCurrent = userService.getUser(getUsername(token));
        return ResponseEntity.status(HttpStatus.OK).body(cartService.getCartbyUser(userCurrent));
    }
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestParam("id")Long id,@RequestParam("token") String token) throws Exception {

        User userCurrent = userService.getUser(getUsername(token));
        System.out.println(userCurrent);
        List<Albums> albumCart = new ArrayList<Albums>();
        if(userCurrent == null){
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El usuario no existe");
        }

        if(albumService.exists(id)){
            albumCart.add(albumService.findById(id));
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro el album");
        }
        Cart newCart = new Cart(userCurrent,albumCart);
        return ResponseEntity.status(HttpStatus.OK).body(cartService.save(newCart));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCart(@RequestParam("id")Long id,@RequestParam("token") String token) throws Exception {
        User userCurrent = userService.getUser(getUsername(token));
        System.out.println(userCurrent);
        Cart cart = cartService.getCartbyUser(userCurrent);
        List<Albums> albumCart = cart.getAlbum();
        if(albumService.exists(id)){
            albumCart.add(albumService.findById(id));
            for(Albums albums : albumCart){
                cart.setAlbum(albumCart);
            }
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro el album");
        }
        return ResponseEntity.status(HttpStatus.OK).body(cartService.save(cart));
    }

}
