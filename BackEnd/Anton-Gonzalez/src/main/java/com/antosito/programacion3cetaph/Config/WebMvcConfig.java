package com.antosito.programacion3cetaph.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/login")
                .allowedOrigins("http://localhost:3000")
                .allowedOrigins("GET", "POST", "PUT");
    }
}
