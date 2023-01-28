package com.api.estoque.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.api.estoque.backend.dto.CredencialsDTO;
import com.api.estoque.backend.dto.TokenDTO;
import com.api.estoque.backend.model.UserModel;
import com.api.estoque.backend.security.jwt.JwtService;
import com.api.estoque.backend.service.exceptions.InvalidPasswordException;
import com.api.estoque.backend.service.impl.UsuarioServiceImpl;

@RestController
@RequestMapping(value = "api/auth")
public class AuthUserController {

    @Autowired
    private UsuarioServiceImpl usuarioServiceImpl;

    @Autowired
    private JwtService jwtService;

    @PostMapping
    public TokenDTO autenticar(@RequestBody CredencialsDTO credenciais) {
        try 
        {
            /*Usuario usuario = Usuario.builder()
                                     .login(credenciais.getLogin())
                                     .senha(credenciais.getSenha())
                                     .build();*/
            UserModel usuario = 
            new UserModel(null, 
                        null, 
                        credenciais.getEmail(), 
                        credenciais.getPassword(), 
                        null, 
                        null);
            UserDetails usuarioAutenticado = usuarioServiceImpl.autenticar(usuario);
            String token = jwtService.gerarToken(usuario);
            return new TokenDTO(usuario.getEmail(), token);
        } 
        catch (UsernameNotFoundException | InvalidPasswordException e ){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
        }
    }
}
