package br.com.fasttask.fasttask.controller;

import java.time.LocalDate;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.fasttask.fasttask.dto.UpdateUserDTO;
import br.com.fasttask.fasttask.dto.UserLoginDTO;
import br.com.fasttask.fasttask.dto.UserResponseDTO;
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
            UserResponseDTO responseDTO = new UserResponseDTO(newUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
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
            UserResponseDTO responseDTO = new UserResponseDTO(user);
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar usuário!");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Integer id,
            @RequestBody UpdateUserDTO dto) {
        if (!id.equals(dto.getId())) {
            return ResponseEntity.badRequest().body("Id do usuário não confere!");
        }

        try {
            byte[] photoBytes = null;
            if (dto.getPhotoBase64() != null && !dto.getPhotoBase64().isEmpty()) {
                String[] parts = dto.getPhotoBase64().split(",");
                photoBytes = Base64.getDecoder().decode(parts[1]);
            }

            User user = new User();
            user.setId(id);
            user.setName(dto.getName());
            user.setEmail(dto.getEmail());
            user.setAddress(dto.getAddress());
            user.setPhone(dto.getPhone());
            user.setBirthdate(LocalDate.parse(dto.getBirthdate()));
            user.setPhoto(photoBytes);

            if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
                user.setPassword(dto.getPassword());
            }

            User updated = userService.updateUser(user);
            UserResponseDTO responseDTO = new UserResponseDTO(updated);
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            // ideal: logar stack trace para debug
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Erro ao atualizar usuário!");
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
            UserResponseDTO responseDTO = new UserResponseDTO(user);
            return ResponseEntity.ok(responseDTO);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado.");
        } catch (InvalidRequestException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha inválida.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar a requisição.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.getSession().invalidate();

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
