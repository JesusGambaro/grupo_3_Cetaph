package com.antosito.programacion3cetaph.Controladores;


import com.antosito.programacion3cetaph.Entidades.Cart;
import com.antosito.programacion3cetaph.Entidades.Rol;
import com.antosito.programacion3cetaph.Entidades.User;
import com.antosito.programacion3cetaph.Servicios.CartService;
import com.antosito.programacion3cetaph.Servicios.UserService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

import static org.apache.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;

    @Autowired
    CartService cartService;

    @GetMapping("/users")
    public ResponseEntity<Page<User>> getAllUser(@PageableDefault(size = 10, page = 0) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUser(pageable));
    }

    @PostMapping("/register")
    public ResponseEntity<User> saveUser(@RequestBody User user,HttpServletRequest request,HttpServletResponse response) throws Exception {
        if (!userService.validate(user)) {
            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/register").toUriString());
            Algorithm algorithm = Algorithm.HMAC256("cetaphweb".getBytes());
            String accessToken = JWT.create()
                    .withSubject(user.getUsername())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 86400000))
                    .withIssuer(request.getRequestURL().toString())
                    .withClaim("rol", user.getRoles().stream().map(Rol::getName).collect(Collectors.toList()))
                    .sign(algorithm);
            List<String> tokens = new ArrayList<>();
            tokens.add(accessToken);
            response.setContentType(APPLICATION_JSON_VALUE);
            Cart cart = new Cart();
            cart.setUser(user);
            cartService.save(cart);
            new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            return ResponseEntity.created(uri).body(userService.saveUser(user));
        } else {
            return new ResponseEntity("Usuario o mail ya existentes", HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/roles/save")
    public ResponseEntity<Rol> saveRol(@RequestBody Rol rol) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/roles/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRol(rol));
    }

    @PostMapping("/roles/addNewRole")
    public ResponseEntity<?> newRole(@RequestBody roleToUserForm Form) {
        userService.addRolToUser(Form.getUsername(), Form.getRolName());
        return ResponseEntity.ok().build();
    }
    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            try {
                String refreshToken = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("cetaphweb".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                String username = decodedJWT.getSubject();
                User user = userService.getUser(username);
                String accessToken = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis()+10*60*1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("rol",user.getRoles().stream().map(Rol::getName).collect(Collectors.toList()))
                        .sign(algorithm);
                Map<String,String> tokens = new HashMap<>();
                tokens.put("access_token",accessToken);
                tokens.put("refresh_token",refreshToken);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(),tokens);
            }catch (Exception e){
                response.setHeader("Error",e.getMessage());
                response.setStatus(FORBIDDEN.value());
                // response.sendError(FORBIDDEN.value());
                Map<String,String> error = new HashMap<>();
                error.put("error_message", e.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(),error);
            }
        }else{
            throw new RuntimeException("No hay tokens frescos");
        }
    }
    @GetMapping("/verify")
    public String[] verificar(@RequestParam("token")String token){
        Algorithm algorithm = Algorithm.HMAC256("cetaphweb".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getClaim("rol").asArray(String.class);
    }

}
@Data
@CrossOrigin(origins = "*")
class roleToUserForm {
    private String username;
    private String rolName;

}
