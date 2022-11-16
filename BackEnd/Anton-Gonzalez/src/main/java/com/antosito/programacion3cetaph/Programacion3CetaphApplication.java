package com.antosito.programacion3cetaph;


import com.antosito.programacion3cetaph.Entidades.User;
import com.antosito.programacion3cetaph.Servicios.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

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
            if(!userService.existsByUsername("admin")) {
                userService.saveUser(new User("admin", "admin@gmail.com", "admin","adminpass", new ArrayList<>()));
                if (userService.getUser("admin") == null) {
                    userService.addRolToUser("admin", "Admin");
                }
            }
        };
    }
}

