package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Base;
import com.antosito.programacion3cetaph.Servicios.BaseServiceImplentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public abstract class BaseControladorImplementacion<E extends Base, S extends BaseServiceImplentation<E, Long>> implements BaseControlador<E, Long> {

    @Autowired
    protected S servicio;
    //Creamos los mapeos que llamen a los metodos de los servicios
    //Estos metodos contienen el CRUD base de nuestro producto
    @GetMapping("/normal") //Get All
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error, por favor intente mas tarde.\"}");

        }
    }

    @GetMapping("/{id}") //Get One
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error, por favor intente mas tarde.\"}");
        }
    }

    @PostMapping(value = "", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_JSON_VALUE}) //Post
    public ResponseEntity<?> save(@RequestBody E entity) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error, no se pudo guardar el dato.\"}" + e);
        }
    }

    @PutMapping("/{id}") //Put
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody E entity) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.update(id, entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error, no se pudo guardar el dato.\"}");
        }

    }

    @DeleteMapping("/{id}") //Delete
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(servicio.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error, no se pudo guardar el dato.\"}");
        }
    }
}