package com.api.estoque.backend.model;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.api.estoque.backend.model.enums.TipoMovimento;

public class Estoque implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @Column(name = "idEstoque")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEstoque;
    
    private Double quantidadeMovimentada;
    private Instant dataMovimento;
    private Integer tipoMovimento;
    
    public Estoque() {

    }
    
    public Estoque(Long idEstoque, Double quantidadeMovimentada, Instant dataMovimento, TipoMovimento tipoMovimento) {
        this.idEstoque = idEstoque;
        this.quantidadeMovimentada = quantidadeMovimentada;
        this.dataMovimento = dataMovimento;
        setTipoMovimento(tipoMovimento);
    }

    public Long getIdEstoque() {
        return idEstoque;
    }

    public void setIdEstoque(Long idEstoque) {
        this.idEstoque = idEstoque;
    }

    public Double getQuantidadeMovimentada() {
        return quantidadeMovimentada;
    }

    public void setQuantidadeMovimentada(Double quantidadeMovimentada) {
        this.quantidadeMovimentada = quantidadeMovimentada;
    }

    public Instant getDataMovimento() {
        return dataMovimento;
    }

    public void setDataMovimento(Instant dataMovimento) {
        this.dataMovimento = dataMovimento;
    }

    public TipoMovimento getTipoMovimento() {
        return TipoMovimento.valueOf(tipoMovimento);
    }

    public void setTipoMovimento(TipoMovimento code) {
        if(code != null) {
            this.tipoMovimento = code.getCode();
        }
    }
}