package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Rol;
import com.antosito.programacion3cetaph.Entidades.User;
import com.antosito.programacion3cetaph.Servicios.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2")
public class UserController {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<Page<User>> getAllUser(@PageableDefault(size = 10, page = 0) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUser(pageable));
    }

    @PostMapping("/users/save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v2/users/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @PostMapping("/roles/save")
    public ResponseEntity<Rol> saveRol(@RequestBody Rol rol) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v2/roles/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRol(rol));
    }

    @PostMapping("/roles/addNewRole")
    public ResponseEntity<?> newRole(@RequestBody roleToUserForm Form) {
        userService.addRolToUser(Form.getUsername(), Form.getRolName());
        return ResponseEntity.ok().build();
    }
}
@Data
class roleToUserForm {
    private String username;
    private String rolName;

}
