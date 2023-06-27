package com.api.estoque.backend.dto;

import com.api.estoque.backend.model.Fornecedor;
import com.api.estoque.backend.model.Produto;
import com.api.estoque.backend.model.Usuario;
<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/dto/EstoqueDTO.java
import com.api.estoque.backend.model.Estoque;
========
import com.api.estoque.backend.model.Material;
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/dto/MaterialDTO.java
import com.api.estoque.backend.model.enums.StatusOption;
import com.fasterxml.jackson.annotation.JsonProperty;

<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/dto/EstoqueDTO.java
public class EstoqueDTO {
========
public class MaterialDTO {
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/dto/MaterialDTO.java

    private Long idMaterial;

    private Fornecedor fornecedor;
    
    @JsonProperty("FornecedorFK")
    private Long fornecedorFK;
    
    private Usuario usuario;
    
    @JsonProperty("UsuarioFK")
    private Long usuarioFK;

    private Produto produto;
    
    @JsonProperty("ProdutoFK")
    private Long produtoFK;

    private Integer status;
    private Integer quantidadeMinima;
    private Integer quantidadeMaxima;
    private Integer quantidadeIdeal;
    private Integer quantidadeAtual;

<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/dto/EstoqueDTO.java
    public EstoqueDTO() {
    }

    public EstoqueDTO(Estoque objWareHouse) {
        idWareHouse = objWareHouse.getIdEstoque();
        dataEntrada = objWareHouse.getDataEntrada();
========
    public MaterialDTO() {
    }

    public MaterialDTO(Material objMaterial) {
        idMaterial = objMaterial.getIdMaterial();
        quantidadeAtual = objMaterial.getQuantidadeAtual();
        quantidadeIdeal = objMaterial.getQuantidadeIdeal();
        quantidadeMaxima = objMaterial.getQuantidadeMaxima();
        quantidadeMinima = objMaterial.getQuantidadeMinima();
        fornecedor = objMaterial.getFornecedor();
        produto = objMaterial.getProduto();
        usuario = objMaterial.getUsuario();
        setStatus(objMaterial.getStatus());
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/dto/MaterialDTO.java
    }

    public Long getIdMaterial() {
        return idMaterial;
    }

    public void setIdMaterial(Long idMaterial) {
        this.idMaterial = idMaterial;
    }

    public Fornecedor getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Long getFornecedorFK() {
        return fornecedorFK;
    }

    public void setFornecedorFK(Long fornecedorFK) {
        this.fornecedorFK = fornecedorFK;
    }

    public Long getUsuarioFK() {
        return usuarioFK;
    }

    public void setUsuarioFK(Long usuarioFK) {
        this.usuarioFK = usuarioFK;
    }

    public Long getProdutoFK() {
        return produtoFK;
    }

    public void setProdutoFK(Long produtoFK) {
        this.produtoFK = produtoFK;
    }

    public Integer getQuantidadeMinima() {
        return quantidadeMinima;
    }

    public void setQuantidadeMinima(Integer quantidadeMinima) {
        this.quantidadeMinima = quantidadeMinima;
    }

    public Integer getQuantidadeMaxima() {
        return quantidadeMaxima;
    }

    public void setQuantidadeMaxima(Integer quantidadeMaxima) {
        this.quantidadeMaxima = quantidadeMaxima;
    }

    public Integer getQuantidadeIdeal() {
        return quantidadeIdeal;
    }

    public void setQuantidadeIdeal(Integer quantidadeIdeal) {
        this.quantidadeIdeal = quantidadeIdeal;
    }

    public Integer getQuantidadeAtual() {
        return quantidadeAtual;
    }

    public void setQuantidadeAtual(Integer quantidadeAtual) {
        this.quantidadeAtual = quantidadeAtual;
    }

    public StatusOption getStatus() {
        return StatusOption.valueOf(status);
    }

    public void setStatus(StatusOption status) {
        if(status != null) {
            this.status = status.getCode();
        }
    }
}
