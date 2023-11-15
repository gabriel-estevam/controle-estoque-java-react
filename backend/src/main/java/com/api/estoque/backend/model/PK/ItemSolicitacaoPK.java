package com.api.estoque.backend.model.PK;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.api.estoque.backend.model.Produto;
import com.api.estoque.backend.model.Solicitacao;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Embeddable
public class ItemSolicitacaoPK implements Serializable {
    private static final long serialVersionUID = 1L;

    @ManyToOne //(cascade = CascadeType.ALL)
    @JoinColumn(name = "idProduto")
    private Produto produto;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idSol")
    private Solicitacao solicitacao;
    
    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
    
    @JsonIgnore
    public Solicitacao getSolicitacao() {
        return solicitacao;
    }

    public void setSolicitacao(Solicitacao solicitacao) {
        this.solicitacao = solicitacao;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((produto == null) ? 0 : produto.hashCode());
        result = prime * result + ((solicitacao == null) ? 0 : solicitacao.hashCode());
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
        ItemSolicitacaoPK other = (ItemSolicitacaoPK) obj;
        if (produto == null) {
            if (other.produto != null)
                return false;
        } else if (!produto.equals(other.produto))
            return false;
        if (solicitacao == null) {
            if (other.solicitacao != null)
                return false;
        } else if (!solicitacao.equals(other.solicitacao))
            return false;
        return true;
    }
    
    
}