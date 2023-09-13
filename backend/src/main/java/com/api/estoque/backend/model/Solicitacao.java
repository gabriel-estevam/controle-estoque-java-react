package com.api.estoque.backend.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "solicitacao")
public class Solicitacao implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSol;
    
    @OneToOne
    @JoinColumn(name = "idUsuario")
    private Usuario solicitante;

    @OneToOne
    @JoinColumn(name = "idFilial")
    private Filial filial;

    @OneToMany(mappedBy = "id.solicitacao")
    private Set<ItemSolicitacao> itensSolicitados = new HashSet<>();

    public Solicitacao() {

    }

    public Solicitacao(Long idSol, Usuario solicitante, Filial filial) {
        this.idSol = idSol;
        this.solicitante = solicitante;
        this.filial = filial;
    }

    public Long getIdSol() {
        return idSol;
    }

    public void setIdSol(Long idSol) {
        this.idSol = idSol;
    }

    public Usuario getSolicitante() {
        return solicitante;
    }

    public void setSolicitante(Usuario solicitante) {
        this.solicitante = solicitante;
    }

    public Filial getFilial() {
        return filial;
    }

    public void setFilial(Filial filial) {
        this.filial = filial;
    }

    public Set<ItemSolicitacao> getItensSolicitados() {
        return itensSolicitados;
    }

    public void AddItensSolicitados(Set<ItemSolicitacao> itensSolicitados) {
        this.itensSolicitados.addAll(itensSolicitados);
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((idSol == null) ? 0 : idSol.hashCode());
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
        Solicitacao other = (Solicitacao) obj;
        if (idSol == null) {
            if (other.idSol != null)
                return false;
        } else if (!idSol.equals(other.idSol))
            return false;
        return true;
    }
}