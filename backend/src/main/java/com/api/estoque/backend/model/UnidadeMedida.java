package com.api.estoque.backend.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "unidade_medida")
public class UnidadeMedida implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "idUnidadeMedida")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUnidadeMedida;
    
    @Column(name = "unidadeMedida")
    private String unidadeMedida;
    
    @Column(length = 50)
    private String sigla;

    public UnidadeMedida() {

    }

    public UnidadeMedida(Long idUnidadeMedida, String unidadeMedida, String sigla) {
        this.idUnidadeMedida = idUnidadeMedida;
        this.unidadeMedida = unidadeMedida;
        this.sigla = sigla;
    }

    public Long getIdUnidadeMedida() {
        return idUnidadeMedida;
    }

    public void setIdUnidadeMedida(Long idUnidadeMedida) {
        this.idUnidadeMedida = idUnidadeMedida;
    }

    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((idUnidadeMedida == null) ? 0 : idUnidadeMedida.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        UnidadeMedida other = (UnidadeMedida) obj;
        if (idUnidadeMedida == null) {
            if (other.idUnidadeMedida != null)
                return false;
        } else if (!idUnidadeMedida.equals(other.idUnidadeMedida))
            return false;
        return true;
    }

}
