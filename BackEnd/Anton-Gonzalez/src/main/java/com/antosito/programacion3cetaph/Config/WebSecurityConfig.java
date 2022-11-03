package com.antosito.programacion3cetaph.Config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.time.Duration;
import java.util.Arrays;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder passwordEncoder;


    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        CustomAuthenticationFilters customAuthenticationFilters = new CustomAuthenticationFilters(authenticationManagerBean());
        customAuthenticationFilters.setFilterProcessesUrl("/api/login");
        httpSecurity.cors().and().csrf().disable().authorizeRequests()
                .antMatchers("/api/login/**", "/api/v1/token/refresh/**", "/api/v1/register/**","/api/v1/updateAlbumImgs/**").permitAll().and()
                .authorizeRequests().antMatchers(GET, "/api/v1/**").permitAll().and()
                .authorizeRequests().antMatchers(POST, "/api/v1/**").permitAll().and()
                .authorizeRequests().antMatchers(PUT, "/api/v1/**").permitAll().and()
                .authorizeRequests().antMatchers(DELETE, "/api/v1/**").permitAll().and()
                .addFilter(customAuthenticationFilters).sessionManagement().sessionCreationPolicy(STATELESS).and()
                .addFilterBefore(new CustomAuthorizationFilters(), UsernamePasswordAuthenticationFilter.class);

    }
    //WebMvcConfig

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cors = new CorsConfiguration();
        cors.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "HEAD", "DELETE"));
        UrlBasedCorsConfigurationSource source = new
                UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors.applyPermitDefaultValues());
        return source;
    }
}



