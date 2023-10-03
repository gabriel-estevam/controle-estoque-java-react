package com.api.estoque.backend.model;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.api.estoque.backend.model.enums.SolicitacaoStatusOption;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "solicitacao")
public class Solicitacao implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSol;

    private Long numeroSol;

    @OneToOne
    @JoinColumn(name = "idUsuario")
    private Usuario solicitante;

    @OneToOne
    @JoinColumn(name = "idFilial")
    private Filial filial;

    @OneToMany(mappedBy = "id.solicitacao", orphanRemoval = true)
    private Set<ItemSolicitacao> itensSolicitados = new HashSet<>();

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant dataSolicitacao;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant updatedAt;

    @Column(name = "status")
    private Integer status;

    public Solicitacao() {

    }

    public Solicitacao(
        Long idSol, 
        Long numeroSol, 
        Usuario solicitante, 
        Filial filial, 
        Instant dataSolicitacao,
        Instant updatedAt,
        SolicitacaoStatusOption status) {
        this.idSol = idSol;
        this.numeroSol = numeroSol;
        this.solicitante = solicitante;
        this.filial = filial;
        this.dataSolicitacao = dataSolicitacao;
        this.updatedAt = updatedAt;
        setStatus(status);
    }

    public Long getIdSol() {
        return idSol;
    }

    public void setIdSol(Long idSol) {
        this.idSol = idSol;
    }

    public Long getNumeroSol() {
        return numeroSol;
    }

    public void setNumeroSol(Long numeroSol) {
        this.numeroSol = numeroSol;
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

    public Instant getDataSolicitacao() {
        return dataSolicitacao;
    }

    public void setDataSolicitacao(Instant dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public SolicitacaoStatusOption getStatus() {
        return SolicitacaoStatusOption.valueOf(status);
    }

    public void setStatus(SolicitacaoStatusOption status) {
        if(status != null) {
            this.status = status.getCode();
        }
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