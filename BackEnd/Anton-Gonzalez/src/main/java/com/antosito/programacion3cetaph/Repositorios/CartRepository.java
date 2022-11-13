package com.antosito.programacion3cetaph.Repositorios;

import com.antosito.programacion3cetaph.Entidades.Cart;
import com.antosito.programacion3cetaph.Entidades.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CartRepository extends JpaRepository<Cart,Long> {
    Cart findByUser(User user);

    @Query(value = "select * from carrito cart " +
            "inner join carrito_album cal on cart.id = cal.cart_id " +
            "inner join albums a on cal.album_id = a.id where a.id = :filtro",
    nativeQuery = true)
    List<Cart> findCartbyAlbumList(@Param("filtro")Long Id);

}

