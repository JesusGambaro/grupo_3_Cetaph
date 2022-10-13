package com.antosito.programacion3cetaph.Servicios;

import com.antosito.programacion3cetaph.Entidades.Base;

import java.io.Serializable;
import java.util.List;

public interface BaseServices <E extends Base, ID extends Serializable>{

    //Estas son nuestros metodos base para el CRUD


    //Get All
    public List<E> findAll() throws Exception;
    //Get One
    public E findById(ID id) throws Exception;
    //Post
    public E save(E entity) throws Exception;
    //Put
    public E update(ID id, E entity) throws Exception;
    //Delete
    public boolean delete(ID id) throws Exception;
}
