package com.antosito.programacion3cetaph.Entidades;

public enum FormatType {
    Vinilo(1, "Vinilo"),
    DVD(2, "DVD"),
    CD(3, "CD"),
    BlueRay(4, "BlueRay"),
    BoxSet(5, "BoxSet");


    private int Asignacion;
    private String name;

    FormatType(int asignacion, String name) {
        this.Asignacion = asignacion;
        this.name = name;
    }

    public int getAsignacion() {
        return Asignacion;
    }
}
