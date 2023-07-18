package com.api.estoque.backend.dto;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import com.api.estoque.backend.model.EstoqueEntrada;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class EstoqueEntradaDTO {
    private Long idEstoque;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant dataEntrada;

    
    @JsonProperty("usuario")
    private UserDTO usuario;

    @JsonProperty("usuarioFK")
    private Long usuarioFK;

    @JsonProperty("filialFK")
    private Long filialFK;

    private Set<ItemEstoqueEntradaDTO> itensEstoque = new HashSet<>();

    public EstoqueEntradaDTO() {

    }

    public EstoqueEntradaDTO(EstoqueEntrada estoqueEntrada) {
        idEstoque = estoqueEntrada.getIdEstoque();
        dataEntrada = estoqueEntrada.getDataEntrada();
        UserDTO userDTO = new UserDTO(estoqueEntrada.getUsuario());
        setUserDTO(userDTO);
        filialFK = estoqueEntrada.getFilial().getIdFilial();
        itensEstoque = estoqueEntrada.getItemEstoque()
            .stream()
            .map(x -> new ItemEstoqueEntradaDTO(x))
            .collect(Collectors.toSet());
    }

    public Long getIdEstoque() {
        return idEstoque;
    }

    public void setIdEstoque(Long idEstoque) {
        this.idEstoque = idEstoque;
    }
    
    public Instant getDataEntrada() {
        return dataEntrada;
    }
    
    public void setDataEntrada(Instant dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    @JsonIgnore
    public UserDTO getUserDTO() {
        return usuario;
    }

    @JsonIgnore
    public void setUserDTO(UserDTO userDTO) {
        this.usuario = userDTO;
    }

    public Set<ItemEstoqueEntradaDTO> getItensEstoque() {
        return itensEstoque;
    }

    public void setItensEstoque(Set<ItemEstoqueEntradaDTO> itensEstoque) {
        this.itensEstoque = itensEstoque;
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

}
