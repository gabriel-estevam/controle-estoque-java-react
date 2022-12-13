package com.api.estoque.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.estoque.backend.model.Usuario;

@RestController
@RequestMapping(value = "/usuarios")
public class UsuarioController {

    @GetMapping
    public ResponseEntity<Usuario> findAll() {
        Usuario u = new Usuario(1L, "Maria", "maria@gmail.com", "123", 1, 0);
        return ResponseEntity.ok().body(u);
    }
}
