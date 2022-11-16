package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Rol;
import com.antosito.programacion3cetaph.Entidades.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;



public interface UserService {
    User saveUser(User user) throws Exception;

    Rol saveRol(Rol rol);
    void addRolToUser(String username, String rolName);
    User getUser(String username);
    Page<User> getAllUser(Pageable pageable);
    boolean validate(User user);
    boolean comprobateROl(Rol rol);
    boolean existsByName (String rolname);

    boolean existsByUsername(String username);
}
