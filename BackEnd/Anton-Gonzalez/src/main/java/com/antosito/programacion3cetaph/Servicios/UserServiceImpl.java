package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Rol;
import com.antosito.programacion3cetaph.Entidades.User;
import com.antosito.programacion3cetaph.Repositorios.RolRepository;
import com.antosito.programacion3cetaph.Repositorios.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpMessage;
import org.apache.http.HttpResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final RolRepository rolRepository;

    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            log.error("Usuario no encontrado");
            throw new UsernameNotFoundException("Usuario no encontrado");
        } else {
            log.info("Usuario encontrado {} " + username);
        }
        Collection<SimpleGrantedAuthority> autorizacion = new ArrayList<>();
        user.getRoles().forEach(rol ->
        {
            autorizacion.add(new SimpleGrantedAuthority(rol.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), autorizacion);
    }

    @Override
    public User saveUser(User user){
            Rol rol = rolRepository.findByName("Usuario");
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.getRoles().add(rol);
            return userRepository.save(user);
    }

    @Override
    public Rol saveRol(Rol rol) {
        log.info("Guardando nuevo rol {}", rol.getName());
        return rolRepository.save(rol);
    }

    @Override
    public void addRolToUser(String username, String rolName) {
        log.info("Asignando nuevo rol {} al usuario {} " + username, rolName);
        User user = userRepository.findByUsername(username);
        Rol rol = rolRepository.findByName(rolName);
        user.getRoles().add(rol);
    }

    @Override
    public User getUser(String username) {
        log.info("Encontrando usuario {} en la base de datos", username);
        return userRepository.findByUsername(username);
    }

    @Override
    public Page<User> getAllUser(Pageable pageable) {
        log.info("Encontrando a todos los usuarios por pagina");
        return userRepository.findAll(pageable);
    }

    @Override
    public boolean validate(User user) {

            if (user.getUsername().equals(userRepository.findUserByUsername(user.getUsername()))
                    ||
                    user.getEmail().equals(userRepository.findEmailbyIncomingEmail(user.getEmail()))) {
                System.out.println("Pase");
                return true;
            } else {
                System.out.println("No pase");
                return false;
            }

    }
}


