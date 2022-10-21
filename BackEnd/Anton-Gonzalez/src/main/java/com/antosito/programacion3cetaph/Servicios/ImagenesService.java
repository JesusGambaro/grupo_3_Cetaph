package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Imagenes;

public interface ImagenesService extends BaseServices<Imagenes,Long> {
    boolean exists(long id);

}
