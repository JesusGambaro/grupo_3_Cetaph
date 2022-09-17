package com.antosito.programacion3cetaph.Entidades.Auditorias;

import com.antosito.programacion3cetaph.Config.CustomRevisionListener;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.RevisionEntity;
import org.hibernate.envers.RevisionNumber;
import org.hibernate.envers.RevisionTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "revinfo")
@RevisionEntity(CustomRevisionListener.class)
@Getter
@Setter
public class Revision implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REV_SEQ")
    @SequenceGenerator(name = "REV_SEQ", sequenceName = "REV_SEQ")
    @RevisionNumber
    private int id;
    @Column(name ="revisionTimeStamp")
    @Temporal(TemporalType.TIMESTAMP)
    @RevisionTimestamp
    private Date date;

}
