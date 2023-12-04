package com.api.estoque.backend.dto;

import java.time.Instant;

import com.api.estoque.backend.model.Recebimento;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RecebimentoDTO {

    private Long idRecebimento;
    private String observacao;
    private Integer notaEntrada;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant dataEntrada;

    @JsonProperty("usuarioFK")
    private Long usuarioFK;

    @JsonProperty("filialFK")
    private Long filialFK;
    
    
    @JsonProperty("solicitacaoFK")
    private Long solicitacaoFK;
    
    public RecebimentoDTO() {

    }

    public RecebimentoDTO(Recebimento obj) {
        idRecebimento = obj.getIdRecebimento();
        dataEntrada = obj.getDataEntrada();
        observacao = obj.getObservacao();
        notaEntrada = obj.getNotaEntrada();
        usuarioFK = obj.getUsuario().getIdUsuario();
        filialFK = obj.getFilial().getIdFilial();
        solicitacaoFK = obj.getSolicitacao().getIdSol();
    }

    public Long getIdRecebimento() {
        return idRecebimento;
    }

    public void setIdRecebimento(Long idRecebimento) {
        this.idRecebimento = idRecebimento;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public Instant getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(Instant dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public Integer getNotaEntrada() {
        return notaEntrada;
    }

    public void setNotaEntrada(Integer notaEntrada) {
        this.notaEntrada = notaEntrada;
    }

    public Long getUsuarioFK() {
        return usuarioFK;
    }

    public void setUsuarioFK(Long usuarioFK) {
        this.usuarioFK = usuarioFK;
    }

    public Long getFilialFK() {
        return filialFK;
    }

    public void setFilialFK(Long filialFK) {
        this.filialFK = filialFK;
    }

    public Long getSolicitacaoFK() {
        return solicitacaoFK;
    }

    public void setSolicitacaoFK(Long solicitacaoFK) {
        this.solicitacaoFK = solicitacaoFK;
    }

    
}