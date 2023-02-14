package com.api.estoque.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.api.estoque.backend.security.jwt.JwtAuthFilter;
import com.api.estoque.backend.security.jwt.JwtService;
import com.api.estoque.backend.service.impl.UsuarioServiceImpl;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UsuarioServiceImpl usuarioService;

    @Autowired
    private JwtService jwtService;

   // @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public OncePerRequestFilter jwFilter() {
        return new JwtAuthFilter(jwtService, usuarioService);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // esse metodo faz a autenticação dos usuários, de onde vamos buscar os usuarios
        auth.userDetailsService(usuarioService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Esse metodo para a autorização, isto é, ele pega o usuario autentica e
        // verifica qual a role daquele usuario
        http.cors().and().csrf().disable() // desativamos essa configuração no ambiente de dev
                   .authorizeRequests()
                // .antMatchers("/api/clientes/**").hasRole("USER")//aqui nesse metodo definimos
                // qual url vai poder acesssar e quais a roles do usuario
                // .permitAll() //esse metodo permite acesso a url mesmo não estando autenticado
                // .antMatchers("/api/clientes/**").authenticated() // segunda forma de liberar
                // acesso é verificar se o
                // usuario esta autenticado, isto é, se ele passou pelo
                // metodo acima
                  .antMatchers(HttpMethod.POST,  "/api/auth/**").permitAll()
                  .antMatchers("/api/users/**").permitAll()//.hasRole("ADMIN")
                  .antMatchers("/api/filiais/**").permitAll()
                  //.antMatchers("/api/users/**").hasRole("ADMIN")
                  .anyRequest().authenticated()
                  .and() //volta para a raiz do http
               // .httpBasic(); // autenticação via header
                 .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) /*a seção do usuario virou stateless, isto é
                cada requisição passada tem que ter um token JWT                                                                           
               */
        // .formLogin(); // cria o formulario de login do spring security ou é possivel
        // passar um caminho
        // de um formulario de login customizado
               .and()
               .addFilterBefore(jwFilter(), UsernamePasswordAuthenticationFilter.class); //add o filter jwt criado na seção ANTES do filter padraão do spring security;
    }
    
}
