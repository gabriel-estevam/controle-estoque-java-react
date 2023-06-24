package com.api.estoque.backend.dto;

import java.time.Instant;

import com.api.estoque.backend.model.Fornecedor;
import com.api.estoque.backend.model.Produto;
import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.model.WareHouse;
import com.api.estoque.backend.model.enums.StatusOption;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class WareHouseDTO {

    private Long idWareHouse;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant dataEntrada;

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

    public WareHouseDTO() {
    }

    public WareHouseDTO(WareHouse objWareHouse) {
        idWareHouse = objWareHouse.getIdWareHouse();
        dataEntrada = objWareHouse.getDataEntrada();
        quantidadeAtual = objWareHouse.getQuantidadeAtual();
        quantidadeIdeal = objWareHouse.getQuantidadeIdeal();
        quantidadeMaxima = objWareHouse.getQuantidadeMaxima();
        quantidadeMinima = objWareHouse.getQuantidadeMinima();
        fornecedor = objWareHouse.getFornecedor();
        produto = objWareHouse.getProduto();
        usuario = objWareHouse.getUsuario();
        setStatus(objWareHouse.getStatus());
    }

    public Long getIdWareHouse() {
        return idWareHouse;
    }

    public void setIdWareHouse(Long idWareHouse) {
        this.idWareHouse = idWareHouse;
    }

  //  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss", timezone = "GMT")
    public Instant getDataEntrada() {
        return dataEntrada;
    }

    @JsonIgnore
    public void setDataEntrada(Instant dataEntrada) {
        this.dataEntrada = dataEntrada;
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
