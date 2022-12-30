package com.api.estoque.backend.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.api.estoque.backend.dto.UserDTO;
import com.api.estoque.backend.model.UserModel;
import com.api.estoque.backend.service.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private PasswordEncoder encoder;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserDTO>> findAll() {
        List<UserModel> list = service.findAll();
        List<UserDTO> listDto = list.stream().map(parseDto -> new UserDTO(parseDto)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listDto);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id) {
        UserModel User = service.findById(id);
        return ResponseEntity.ok().body(new UserDTO(User));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<UserDTO> insert(@RequestBody UserDTO UserDTO) {
        UserDTO.setPassword(encoder.encode(UserDTO.getPassword()));
        UserModel User = service.fromDto(UserDTO);
        User = service.insert(User);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(User.getId())
                .toUri(); // ele insere um novo User e na sequencia reterna no header da resposta o
                          // caminho para
                          // recuperar (select by id) dado inserido
        return ResponseEntity.created(uri).body(new UserDTO(User)); // ao inserir um dado no banco de dados,
                                                                    // devemos usar o status
        // 201 created
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(value = "/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody UserDTO UserDTO) {
        UserDTO.setId(id);
        UserDTO.setPassword(encoder.encode(UserDTO.getPassword()));
        UserModel User = service.fromDto(UserDTO);
        User = service.update(id, User);
        return ResponseEntity.ok().body(new UserDTO(User));
    }

}
