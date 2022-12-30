package com.api.estoque.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.estoque.backend.dto.AuthDTO;
import com.api.estoque.backend.service.AuthService;

@RestController
@RequestMapping(value = "/signin")
public class AuthController {

    @Autowired
    private AuthService auth;

    @PostMapping
    public ResponseEntity<Boolean> signin(@RequestBody AuthDTO authDTO) {
        boolean valid = auth.validateInfo(authDTO);
        return ResponseEntity.ok().body(valid);
    }
}
