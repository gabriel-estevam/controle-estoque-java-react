package com.api.estoque.backend.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.api.estoque.backend.service.impl.UsuarioServiceImpl;

//classe responsavel por filtrar o token da requisição e validar cada pedaço e enviar ao contexto Spring Security da aplicação

public class JwtAuthFilter extends OncePerRequestFilter {

    private JwtService jwtService;
    private UsuarioServiceImpl usuarioService;
    
    public JwtAuthFilter(JwtService jwtService, UsuarioServiceImpl usuarioService) {
        this.jwtService = jwtService;
        this.usuarioService = usuarioService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, 
                                    HttpServletResponse httpServletResponse, 
                                    FilterChain filterChain) throws ServletException, IOException 
    { 
    //nesse metodo estamos interceptando uma requisição e filtrando o token e enviando de volta ao spring security
        
        //validando o token do header da requisição
        String authorization = httpServletRequest.getHeader("Authorization");

        if(authorization != null && authorization.startsWith("Bearer")) 
        {
            //valida as condições do header authorization
            String token = authorization.split(" ")[1]; //Se ok, pega o token
            boolean isValid = jwtService.tokenValido(token); //verifica se o token é valido

            if(isValid) 
            {
                //se token valido: pega o login do usuario (dentro do token) e envia ao  userdetail
                String loginUsuario = jwtService.obterLoginUsuario(token); //pega o login do usuario atraves do token
                UserDetails usuario = usuarioService.loadUserByUsername(loginUsuario); //aqui ele carrega o usuario com todas suas permissoes definidas, na sequencia envia para o spring security
                UsernamePasswordAuthenticationToken user = 
                new UsernamePasswordAuthenticationToken(usuario, 
                                                        null, 
                                                        usuario.getAuthorities()); //aqui estamos informando para o Spring Security nosso usuario autenticado
                user.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest)); //aqui estamos informando o spring security que é uma autenticação web
                SecurityContextHolder.getContext().setAuthentication(user); //envia todas as informações ao contexto do Spring Security
            }

        }
        filterChain.doFilter(httpServletRequest, httpServletResponse); //realiza o filtro da request interceptada (metodo acima)
    }
}

