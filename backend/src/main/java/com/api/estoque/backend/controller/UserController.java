package com.api.estoque.backend.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.api.estoque.backend.dto.UserDTO;
import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.service.FilialService;
import com.api.estoque.backend.service.UserService;

@RestController
@RequestMapping(value = "api/users")
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private FilialService filialService;

    @GetMapping
    public ResponseEntity<Page<Usuario>> findByNameContaining(
                                                                @RequestParam(name = "name", required = false) String name, 
                                                                @PageableDefault(sort = "id", direction = Direction.ASC) Pageable pageable
                                                            ) 
    {
        Page<Usuario> list = service.findByNameContaining(name, pageable);
        //List<Usuario> list = service.findByNameContaining(name);
       // List<UserDTO> listDto = list.stream().map(parseDto -> new UserDTO(parseDto)).collect(Collectors.toList());
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable Long id) {
        Usuario usuario = service.findById(id);
      //  return ResponseEntity.ok().body(new UserDTO(User));
        return ResponseEntity.ok().body(usuario);
    }

    @PostMapping
    public ResponseEntity<Usuario> insert(@RequestBody UserDTO userDTO) {

        Filial filialCarregada = filialService.findById(Long.parseLong(userDTO.getFilialFK()));
        userDTO.setPassword(encoder.encode(userDTO.getPassword()));
        Usuario usuario = service.fromDto(userDTO);
        usuario.setFilial(filialCarregada);
        usuario = service.insert(usuario);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                                             .path("/{id}")
                                             .buildAndExpand(usuario.getId())
                                             .toUri(); /* ele insere um novo User e na sequencia reterna no header da resposta o caminho para 
                                             recuperar (select by id) dado inserido*/
        return ResponseEntity.created(uri).body(usuario); // ao inserir um dado no banco de dados, devemos usar o status 201 created
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Usuario> update(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        userDTO.setId(id);
        userDTO.setPassword(encoder.encode(userDTO.getPassword()));
        Usuario usuario = service.fromDto(userDTO);
        Filial filialUpdate = filialService.findById(Long.parseLong(userDTO.getFilialFK()));
        usuario.setFilial(filialUpdate);
        usuario = service.update(id, usuario);
        return ResponseEntity.ok().body(usuario);
    }

}
