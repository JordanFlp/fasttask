package br.com.fasttask.fasttask.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.fasttask.fasttask.dto.UserLoginDTO;
import br.com.fasttask.fasttask.exception.EmailAlreadyExistsException;
import br.com.fasttask.fasttask.exception.InvalidRequestException;
import br.com.fasttask.fasttask.exception.UserNotFoundException;
import br.com.fasttask.fasttask.model.User;
import br.com.fasttask.fasttask.service.IUserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;

    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        try {
            User newUser = userService.createNewUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (InvalidRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar usuário!");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Integer id) {
        try {
            User user = userService.findUserById(id);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar usuário!");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable Integer id, @RequestBody User user) {
        try {
            if (!id.equals(user.getId()))
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id do usuário não confere!");

            User updatedUser = userService.updateUser(user);
            return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (InvalidRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar usuário!");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Integer id) {
        try {
            User userToDelete = userService.findUserById(id);
            if (userToDelete != null) {
                userService.deleteUser(userToDelete);
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado!");
            }
        } catch (InvalidRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir usuário!");
        }
    }



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO loginRequest) {
        try {
            User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
            // Retornar usuário ou um token de autenticação se necessário
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado.");
        } catch (InvalidRequestException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha inválida.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar a requisição.");
        }
    }


    // Endpoint para logout
@PostMapping("/logout")
public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
    try {
        // Invalida a sessão
        request.getSession().invalidate();

        // Opcional: limpar cookies ou outros dados de sessão, caso necessário
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.status(HttpStatus.OK).body("Logout realizado com sucesso.");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar o logout.");
    }
}



}


