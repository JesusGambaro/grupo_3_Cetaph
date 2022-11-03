package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Albums;
import com.antosito.programacion3cetaph.Entidades.Cart;
import com.antosito.programacion3cetaph.Entidades.User;
import com.antosito.programacion3cetaph.Repositorios.BaseRepository;
import com.antosito.programacion3cetaph.Repositorios.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl extends BaseServiceImplentation<Cart,Long> implements CartService{

    @Autowired
    CartRepository cartRepository;

    public CartServiceImpl (BaseRepository<Cart,Long> baseRepository){super(baseRepository);}

    @Override
    public Cart getCartbyUser(User user) {
        return cartRepository.findByUser(user);
    }
}
