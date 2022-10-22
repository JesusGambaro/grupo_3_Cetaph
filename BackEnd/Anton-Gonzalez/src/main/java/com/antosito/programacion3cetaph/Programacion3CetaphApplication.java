package com.antosito.programacion3cetaph;

import com.antosito.programacion3cetaph.Entidades.Rol;
import com.antosito.programacion3cetaph.Entidades.User;
import com.antosito.programacion3cetaph.Servicios.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;

@SpringBootApplication
@EnableConfigurationProperties
public class Programacion3CetaphApplication {

    public static void main(String[] args) {
        SpringApplication.run(Programacion3CetaphApplication.class, args);
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
   @Bean
    CommandLineRunner runner(UserService userService) {
       return args -> {
           userService.saveRol(new Rol("Admin"));
           userService.saveRol(new Rol("Usuario"));
           userService.saveRol(new Rol("Aquaman"));

           userService.saveUser(new User("Marcos Anton", "DayLiveXD", "ojoseco6971", new ArrayList<>()));
           userService.saveUser(new User("Jesus Gambaro", "Nicole Kidman", "Epico", new ArrayList<>()));
           userService.saveUser(new User("Agustin Recabarren", "JZ3R0", "anashe", new ArrayList<>()));
           userService.saveUser(new User("Franco Gonzalez", "Frankling", "aquaman", new ArrayList<>()));

           userService.addRolToUser("DayLiveXD", "Admin");
           userService.addRolToUser("Nicole Kidman", "Admin");
           userService.addRolToUser("JZ3R0", "Usuario");
           userService.addRolToUser("Frankling", "Aquaman");
       };
   }


}

