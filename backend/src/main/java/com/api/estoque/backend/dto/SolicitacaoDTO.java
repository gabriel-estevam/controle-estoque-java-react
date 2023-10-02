package com.api.estoque.backend.dto;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.api.estoque.backend.model.Solicitacao;
import com.api.estoque.backend.model.enums.SolicitacaoStatusOption;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SolicitacaoDTO {
    
    private Long idSol;
    private Long numeroSol;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant dataSolicitacao;

    private Integer status;
    private UserDTO solicitante;

    @JsonProperty("solicitanteFK")
    private Long solicitanteFK;
    
    @JsonProperty("filialFK")
    private Long filialFK;
    
   // @JsonProperty("itensSolicitacao")
    private Set<ItemSolicitacaoDTO> itensSolicitacao = new HashSet<>();

    public SolicitacaoDTO() {

    }

    public SolicitacaoDTO(Solicitacao obj) {
        idSol = obj.getIdSol();
        numeroSol = obj.getNumeroSol();
        dataSolicitacao = obj.getDataSolicitacao();
        
        UserDTO solicitanteDTO = new UserDTO(obj.getSolicitante());
        filialFK = obj.getFilial().getIdFilial();
        setSolicitante(solicitanteDTO);
        setStatus(obj.getStatus());

        itensSolicitacao = obj.getItensSolicitados()
            .stream()
            .map(x -> new ItemSolicitacaoDTO(x))
            .collect(Collectors.toSet());
    }

    public Long getIdSol() {
        return idSol;
    }

    public void setIdSol(Long idSol) {
        this.idSol = idSol;
    }

    public Long getNumeroSol() {
        return numeroSol;
    }

    public void setNumeroSol(Long numeroSol) {
        this.numeroSol = numeroSol;
    }

    @JsonIgnore
    public UserDTO getSolicitante() {
        return solicitante;
    }
    
    @JsonIgnore
    public void setSolicitante(UserDTO solicitante) {
        this.solicitante = solicitante;
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

    public Set<ItemSolicitacaoDTO> getItensSolicitacao() {
        return itensSolicitacao;
    }

    public void setItensSolicitacao(Set<ItemSolicitacaoDTO> itensSolicitacao) {
        this.itensSolicitacao = itensSolicitacao;
    }

    public Instant getDataSolicitacao() {
        return dataSolicitacao;
    }

    public void setDataSolicitacao(Instant dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }

    public SolicitacaoStatusOption getStatus() {
        return SolicitacaoStatusOption.valueOf(status);
    }

    public void setStatus(SolicitacaoStatusOption status) {
        if(status != null) {
            this.status = status.getCode();
        }
    }
}
