package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Cart;
import com.antosito.programacion3cetaph.Entidades.User;
import com.antosito.programacion3cetaph.Repositorios.BaseRepository;
import com.antosito.programacion3cetaph.Repositorios.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl extends BaseServiceImplentation<Cart,Long> implements CartService{

    @Autowired
    CartRepository cartRepository;

    public CartServiceImpl (BaseRepository<Cart,Long> baseRepository){super(baseRepository);}

    @Override
    public Cart getCartbyUser(User user) {
        return cartRepository.findByUser(user);
    }

    @Override
    public List<Cart> findCartbyAlbumList(Long name){return cartRepository.findCartbyAlbumList(name);}


    @Transactional
    public boolean delete(Long id) throws Exception {
        try {
            if (cartRepository.existsById(id)){
                cartRepository.deleteById(id);
                return true;
            }else{
                throw new Exception();
            }

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
