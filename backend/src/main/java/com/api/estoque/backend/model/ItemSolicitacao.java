package com.api.estoque.backend.model;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.api.estoque.backend.model.PK.ItemSolicitacaoPK;

@Entity
@Table(name = "item_solicitacao")
public class ItemSolicitacao implements Serializable {
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private ItemSolicitacaoPK id = new ItemSolicitacaoPK();

    public ItemSolicitacao() {
        
    }

    public ItemSolicitacao(Produto produto, Double quantidade, String observacao) {
        super();
        id.setProduto(produto);
        id.setQuantidade(quantidade);
        id.setObservacao(observacao);
    }

    public ItemSolicitacaoPK getId() {
        return id;
    }

    public void setId(ItemSolicitacaoPK id) {
        this.id = id;
    }

    public Produto getProduto() {
        return id.getProduto();
    }

    public void setProduto(Produto produto) {
        id.setProduto(produto);
    }

    public String getObservacao() {
        return id.getObservacao();
    }

    public void setObservacao(String observacao) {
        id.setObservacao(observacao);
    }
    
    public Double getQuantidade() {
        return id.getQuantidade();
    }

    public void setQuantidade(Double quantidade) {
        id.setQuantidade(quantidade);
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