package com.antosito.programacion3cetaph.Controladores;

import com.antosito.programacion3cetaph.Entidades.Singles;
import com.antosito.programacion3cetaph.Servicios.SinglesServiceImpl;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/singles")
public class SinglesControler extends BaseControladorImplementacion<Singles, SinglesServiceImpl>{
    @GetMapping("/filter")
    public ResponseEntity<?> searchFilter(@RequestParam(required = false) String filtroName, @RequestParam(required = false) Float filtroPrecio, @RequestParam(required = false) Long filtroID){
        System.out.println("Llego esto "+filtroName+ " y "+filtroPrecio+ " tambien " +filtroID);
        try{
            return ResponseEntity.status(HttpStatus.OK).body(servicio.searchFilter(filtroName,filtroPrecio,filtroID));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" +e.getMessage()+"\"}");
        }
    }

}
