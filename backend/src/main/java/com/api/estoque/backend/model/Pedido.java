package com.api.estoque.backend.model;

import java.io.Serializable;
import java.time.Instant;
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

import com.api.estoque.backend.model.enums.PedidoStatusOption;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "pedido")
public class Pedido implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPedido;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant dataEntrega;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant dataSolicitado;
    
    @OneToOne
    @JoinColumn(name = "idUsuario")
    private Usuario solicitante;
    
    @OneToOne
    @JoinColumn(name = "idFilial")
    private Filial filial;
    
    @OneToOne
    @JoinColumn(name = "idFornecedor")
    private Fornecedor fornecedor;
    
    private Long notaEntrada;
    
    private Integer status;

    @OneToMany(mappedBy = "id.pedido", orphanRemoval = true)
    private Set<ItemPedido> itens = new HashSet<>();

    public Pedido() {

    }
    
    public Pedido(
        Long idPedido, 
        Instant dataEntrega, 
        Instant dataSolicitado, 
        Usuario solicitante, 
        Filial filial,
        Fornecedor fornecedor, 
        Long notaEntrada, 
        PedidoStatusOption status
    ) {
        this.idPedido = idPedido;
        this.dataEntrega = dataEntrega;
        this.dataSolicitado = dataSolicitado;
        this.solicitante = solicitante;
        this.filial = filial;
        this.fornecedor = fornecedor;
        this.notaEntrada = notaEntrada;
        setStatus(status);
    }

    
    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }

    public Instant getDataEntrega() {
        return dataEntrega;
    }

    public void setDataEntrega(Instant dataEntrega) {
        this.dataEntrega = dataEntrega;
    }

    public Instant getDataSolicitado() {
        return dataSolicitado;
    }

    public void setDataSolicitado(Instant dataSolicitado) {
        this.dataSolicitado = dataSolicitado;
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

    public Fornecedor getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }

    public Long getNotaEntrada() {
        return notaEntrada;
    }

    public void setNotaEntrada(Long notaEntrada) {
        this.notaEntrada = notaEntrada;
    }

    public Set<ItemPedido> getItens() {
        return itens;
    }

    public void AddItens(Set<ItemPedido> itens) {
        this.itens.addAll(itens);
    }

    public PedidoStatusOption getStatus() {
        return PedidoStatusOption.valueOf(status);
    }

    public void setStatus(PedidoStatusOption status) {
        if(status != null) {
            this.status = status.getCode();
        }
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((idPedido == null) ? 0 : idPedido.hashCode());
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
        Pedido other = (Pedido) obj;
        if (idPedido == null) {
            if (other.idPedido != null)
                return false;
        } else if (!idPedido.equals(other.idPedido))
            return false;
        return true;
    }

}