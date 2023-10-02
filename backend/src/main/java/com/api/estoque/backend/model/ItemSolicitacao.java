package com.api.estoque.backend.model;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.api.estoque.backend.model.PK.ItemSolicitacaoPK;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "item_solicitacao")
public class ItemSolicitacao implements Serializable {
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private ItemSolicitacaoPK id = new ItemSolicitacaoPK();

    private Double quantidade;
    private String observacao;

    public ItemSolicitacao() {
        
    }

    public ItemSolicitacao(
        Solicitacao solicitacao,
        Produto produto, 
        Double quantidade, 
        String observacao) {
        super();
        id.setSolicitacao(solicitacao);
        id.setProduto(produto);
        this.quantidade = quantidade;
        this.observacao = observacao;
    }

    public ItemSolicitacaoPK getId() {
        return id;
    }

    public void setId(ItemSolicitacaoPK id) {
        this.id = id;
    }

    @JsonIgnore
    public Solicitacao getSolicitacao() {
        return id.getSolicitacao();
    }
    
    public void setSolicitacao(Solicitacao solicitacao) {
        id.setSolicitacao(solicitacao);
    }

    public Produto getProduto() {
        return id.getProduto();
    }

    public void setProduto(Produto produto) {
        id.setProduto(produto);
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
    
    public Double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
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
        ItemSolicitacao other = (ItemSolicitacao) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}