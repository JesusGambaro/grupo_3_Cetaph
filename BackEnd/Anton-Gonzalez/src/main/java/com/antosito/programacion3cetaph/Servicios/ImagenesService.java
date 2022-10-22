package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Imagenes;

import java.util.ArrayList;

public interface ImagenesService extends BaseServices<Imagenes,Long> {
    boolean exists(long id);
    public ArrayList<Imagenes> saveAllImg(ArrayList<Imagenes> imgs);
}
