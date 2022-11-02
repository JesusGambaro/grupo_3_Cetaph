package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Entidades.Cart;
import com.antosito.programacion3cetaph.Servicios.AlbumService;
import com.antosito.programacion3cetaph.Servicios.CartService;
import com.antosito.programacion3cetaph.Servicios.CartServiceImpl;
import com.antosito.programacion3cetaph.Servicios.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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


}
