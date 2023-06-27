package com.api.estoque.backend.model.PK;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.api.estoque.backend.model.Produto;
import com.api.estoque.backend.model.Estoque;

@Embeddable
public class ItemEstoquePK implements Serializable {
    private static final long serialVersionUID = 1L;

    //@JoinColumn(name = "id_produto")
    @ManyToOne
    @JoinColumn(name = "idProduto")
    private Produto produto;

    //@JoinColumn(name = "id_estoque")
    @ManyToOne
    @JoinColumn(name = "idEstoque")
    private Estoque estoque;

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Estoque getEstoque() {
        return estoque;
    }

    public void setEstoque(Estoque estoque) {
        this.estoque = estoque;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((produto == null) ? 0 : produto.hashCode());
        result = prime * result + ((estoque == null) ? 0 : estoque.hashCode());
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
        ItemEstoquePK other = (ItemEstoquePK) obj;
        if (produto == null) {
            if (other.produto != null)
                return false;
        } else if (!produto.equals(other.produto))
            return false;
        if (estoque == null) {
            if (other.estoque != null)
                return false;
        } else if (!estoque.equals(other.estoque))
            return false;
        return true;
    }

}
