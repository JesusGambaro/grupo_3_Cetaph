package com.antosito.programacion3cetaph.Servicios;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {
    Cloudinary cloudinary;

    private Map<String, String> valuesMap = new HashMap<>();


    /*Configuracion del Cloudnary, setting del enviroment creado para guardar las imagenes y musica*/
    public CloudinaryService() {
        valuesMap.put("cloud_name", "dknpio4ug");
        valuesMap.put("api_key", "291232833726476");
        valuesMap.put("api_secret", "0MMWANLBXvt7_FCQ4c7veixfr0o");
        cloudinary = new Cloudinary(valuesMap);
    }

    /*??? Que es esto franco?, si abajo tambien tenes lo mismo?, es para imagenes?*/
    /*Metodo para subir imagenes a cloudnary*/
    public Map upload(MultipartFile multipartFile) throws IOException {
        File file = convert(multipartFile);
        Map result = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
        file.delete();
        return result;
    }
    /*Metodo para subir la preview de 30segs en cloudnary*/
    public Map uploadMusic(MultipartFile multipartFile) throws IOException {
        File file = convert(multipartFile);
        Map result = cloudinary.uploader().upload(file, ObjectUtils.asMap("resource_type", "video"));
        file.delete();
        return result;
    }

    /*Delete de cualquiera de los archivos que se especifique*/
    public Map delete(String id) throws IOException {
        Map result = cloudinary.uploader().destroy(id, ObjectUtils.emptyMap());
        return result;
    }
    /*Conversion de los archivos en cloudnary a un archivo local*/
    private File convert(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        FileOutputStream fo = new FileOutputStream(file);
        fo.write(multipartFile.getBytes());
        fo.close();
        return file;
    }


}
