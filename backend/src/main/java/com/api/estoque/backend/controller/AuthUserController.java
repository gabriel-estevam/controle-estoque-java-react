package com.api.estoque.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.estoque.backend.dto.CredencialsDTO;
import com.api.estoque.backend.dto.TokenDTO;

import com.api.estoque.backend.service.AuthUserService;

@RestController
@RequestMapping(value = "api/auth")
public class AuthUserController {

    @Autowired
    private AuthUserService authUserService;

    @PostMapping
    public ResponseEntity<TokenDTO> autenticar(@RequestBody CredencialsDTO credenciais) {
       TokenDTO token = authUserService.autenticar(credenciais);
      return ResponseEntity.ok().body(token);
    }
}
