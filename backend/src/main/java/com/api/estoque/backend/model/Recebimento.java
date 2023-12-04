package com.api.estoque.backend.model;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "recebimento")
public class Recebimento implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRecebimento;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant dataEntrada;

    private String observacao;
    
    @OneToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    @OneToOne
    @JoinColumn(name = "idSol")
    private Solicitacao solicitacao;
    
    @OneToOne
    @JoinColumn(name = "idFilial")
    private Filial filial;

    private Integer notaEntrada;
    
    public Recebimento() {
        
    }
        
    public Recebimento(
        Long idRecebimento, 
        Instant dataEntrada, 
        String observacao, 
        Usuario usuario,
        Solicitacao solicitacao, 
        Filial filial, 
        Integer notaEntrada
    ) {
        this.idRecebimento = idRecebimento;
        this.dataEntrada = dataEntrada;
        this.observacao = observacao;
        this.usuario = usuario;
        this.solicitacao = solicitacao;
        this.filial = filial;
        this.notaEntrada = notaEntrada;
    }

    public Long getIdRecebimento() {
        return idRecebimento;
    }
    
    public void setIdRecebimento(Long idRecebimento) {
        this.idRecebimento = idRecebimento;
    }
    
    public Integer getNotaEntrada() {
        return notaEntrada;
    }

    public void setNotaEntrada(Integer notaEntrada) {
        this.notaEntrada = notaEntrada;
    }

    public Instant getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(Instant dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Solicitacao getSolicitacao() {
        return solicitacao;
    }

    public void setSolicitacao(Solicitacao solicitacao) {
        this.solicitacao = solicitacao;
    }

    public Filial getFilial() {
        return filial;
    }

    public void setFilial(Filial filial) {
        this.filial = filial;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((idRecebimento == null) ? 0 : idRecebimento.hashCode());
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
        Recebimento other = (Recebimento) obj;
        if (idRecebimento == null) {
            if (other.idRecebimento != null)
                return false;
        } else if (!idRecebimento.equals(other.idRecebimento))
            return false;
        return true;
    }
}