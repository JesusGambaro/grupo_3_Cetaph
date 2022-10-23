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


}

