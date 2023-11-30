package com.api.estoque.backend.dto;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.api.estoque.backend.model.Pedido;
import com.api.estoque.backend.model.enums.PedidoStatusOption;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PedidoDTO {

    private Long idPedido;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant dataEntrega;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant dataSolicitado;

    private Integer status;
    private UserDTO solicitante;

    private FornecedorDTO fornecedor;

    @JsonProperty("fornecedorFK")
    private Long fornecedorFK;

    @JsonProperty("solicitanteFK")
    private Long solicitanteFK;
    
    @JsonProperty("filialFK")
    private Long filialFK;

    private Long notaEntrada;

    private Set<ItemPedidoDTO> itens = new HashSet<>();

    public PedidoDTO() {
        
    }

    public PedidoDTO(Pedido obj) {
        idPedido = obj.getIdPedido();
        dataEntrega = obj.getDataEntrega();
        dataSolicitado = obj.getDataSolicitado();
        notaEntrada = obj.getNotaEntrada();
        
        filialFK = obj.getFilial().getIdFilial();
        
        UserDTO solicitanteDTO = new UserDTO(obj.getSolicitante());
        FornecedorDTO fornecedorDTO = new FornecedorDTO(obj.getFornecedor());

        itens = obj.getItens()
                    .stream()
                    .map(x -> new ItemPedidoDTO(x))
                    .collect(Collectors.toSet());

        setStatus(obj.getStatus());
        setSolicitante(solicitanteDTO);
        setFornecedor(fornecedorDTO);
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

    public UserDTO getSolicitante() {
        return solicitante;
    }

    public void setSolicitante(UserDTO solicitante) {
        this.solicitante = solicitante;
    }

    public FornecedorDTO getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(FornecedorDTO fornecedor) {
        this.fornecedor = fornecedor;
    }

    public Long getFornecedorFK() {
        return fornecedorFK;
    }

    public void setFornecedorFK(Long fornecedorFK) {
        this.fornecedorFK = fornecedorFK;
    }

    public Long getSolicitanteFK() {
        return solicitanteFK;
    }

    public void setSolicitanteFK(Long solicitanteFK) {
        this.solicitanteFK = solicitanteFK;
    }

    public Long getFilialFK() {
        return filialFK;
    }

    public void setFilialFK(Long filialFK) {
        this.filialFK = filialFK;
    }

    public Long getNotaEntrada() {
        return notaEntrada;
    }

    public void setNotaEntrada(Long notaEntrada) {
        this.notaEntrada = notaEntrada;
    }

    public Set<ItemPedidoDTO> getItens() {
        return itens;
    }

    public void setItens(Set<ItemPedidoDTO> itens) {
        this.itens = itens;
    }

    public PedidoStatusOption getStatus() {
        return PedidoStatusOption.valueOf(status);
    }

    public void setStatus(PedidoStatusOption status) {
        if(status != null) {
            this.status = status.getCode();
        }
    }
}