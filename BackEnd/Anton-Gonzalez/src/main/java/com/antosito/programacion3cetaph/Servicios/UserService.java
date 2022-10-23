package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Rol;
import com.antosito.programacion3cetaph.Entidades.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;



public interface UserService {
    User saveUser(User user);

    Rol saveRol(Rol rol);
    void addRolToUser(String username, String rolName);
    User getUser(String username);
    Page<User> getAllUser(Pageable pageable);
}
