package com.antosito.programacion3cetaph.Config;

import com.antosito.programacion3cetaph.Entidades.Auditorias.Revision;
import org.hibernate.envers.RevisionListener;


public class CustomRevisionListener implements RevisionListener {
    public void newRevision(Object revisionEntity){
        final Revision revision = (Revision) revisionEntity;

    }
}
