package com.api.estoque.backend.dto;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.api.estoque.backend.model.Solicitacao;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SolicitacaoDTO {

    private Long idSol;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant dataSolicitacao;

    private UserDTO solicitante;

    @JsonProperty("solicitanteFK")
    private Long solicitanteFK;
    
    @JsonProperty("filialFK")
    private Long filialFK;

    private Set<ItemSolicitacaoDTO> itensDTO = new HashSet<>();

    public SolicitacaoDTO() {

    }

    public SolicitacaoDTO(Solicitacao obj) {
        idSol = obj.getIdSol();
        dataSolicitacao = obj.getDataSolicitacao();
        
        UserDTO solicitanteDTO = new UserDTO(obj.getSolicitante());
        filialFK = obj.getFilial().getIdFilial();
        setSolicitante(solicitanteDTO);

        itensDTO = obj.getItensSolicitados()
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

    public Set<ItemSolicitacaoDTO> getItensDTO() {
        return itensDTO;
    }

    public void AddItensDTO(Set<ItemSolicitacaoDTO> itensDTO) {
        this.itensDTO = itensDTO;
    }

    public Instant getDataSolicitacao() {
        return dataSolicitacao;
    }

    public void setDataSolicitacao(Instant dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }

}
