package com.api.estoque.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.api.estoque.backend.dto.CredencialsDTO;
import com.api.estoque.backend.dto.TokenDTO;
import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.security.jwt.JwtService;
import com.api.estoque.backend.service.exceptions.AccoutIsLockedException;
import com.api.estoque.backend.service.exceptions.InvalidPasswordException;
import com.api.estoque.backend.service.impl.UsuarioServiceImpl;

@Service
public class AuthUserService {

    @Autowired
    private UsuarioServiceImpl usuarioServiceImpl;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService usuarioService;

    public TokenDTO autenticar(CredencialsDTO credenciais) {
        try 
        {
            Usuario usuarioS = usuarioService.findByEmail(credenciais.getEmail());
            Usuario usuario =  new Usuario(
                usuarioS.getIdUsuario(), 
                usuarioS.getName(), 
                credenciais.getEmail(), 
                credenciais.getPassword(), 
                usuarioS.getRole(), 
                usuarioS.getStatus()
            );
            
            usuario.setFilial(usuarioS.getFilial());
            usuario.getEmail();
            UserDetails usuarioAutenticado = usuarioServiceImpl.autenticar(usuario);
            String token = jwtService.gerarToken(usuario);
            boolean statusUser = usuarioAutenticado.isAccountNonLocked();
            
            if(!statusUser) {
                throw new AccoutIsLockedException("Usuario bloqueado! Entre em contato com o Administrador do Sistema");
            }

            return new TokenDTO(usuario.getEmail(), token);
        } 
        catch (UsernameNotFoundException e){
            throw new UsernameNotFoundException("Usuário não encontrado!");
        }
        catch(InvalidPasswordException e) {
            throw new InvalidPasswordException("Usuário ou Senha Invalido!");
        }
    }
}
