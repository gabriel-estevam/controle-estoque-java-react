package com.api.estoque.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public List<Usuario> findAll() {
        return repository.findAll();
    }

    public Usuario findById(Long id) {
        Optional<Usuario> usuario = repository.findById(id);
        return usuario.get();
    }
}
