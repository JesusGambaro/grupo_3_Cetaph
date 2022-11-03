package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Cart;
import com.antosito.programacion3cetaph.Entidades.User;
import org.springframework.stereotype.Service;


public interface CartService extends BaseServices<Cart,Long>{
    Cart getCartbyUser(User user);
}
