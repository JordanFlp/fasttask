package br.com.fasttask.fasttask.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.fasttask.fasttask.model.Subitem;
import br.com.fasttask.fasttask.service.ISubitemService;

@RestController
@RequestMapping("/subitem")
public class SubitemController {

    @Autowired
    private ISubitemService subitemService;

    @PostMapping
    public ResponseEntity<Object> createSubitem(@RequestBody Subitem subitem) {
        try {
            Subitem newSubitem = subitemService.createSubitem(subitem);
            return ResponseEntity.status(HttpStatus.CREATED).body(newSubitem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar subitem!");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getSubitemById(@PathVariable Integer id) {
        try {
            Subitem subitem = subitemService.findSubitemById(id);
            if (subitem != null) {
                return ResponseEntity.status(HttpStatus.OK).body(subitem);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Subitem não encontrado!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Subitem não encontrado!");
        }
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<Object> getSubitemsByTaskId(@PathVariable Integer taskId) {
        try {
            List<Subitem> subitems = subitemService.findSubitemsByTaskId(taskId);
            return ResponseEntity.status(HttpStatus.OK).body(subitems);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar subitens!");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateSubitem(@PathVariable Integer id, @RequestBody Subitem subitem) {
        try {
            if (!id.equals(subitem.getId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id do subitem não confere!");
            }
            Subitem updatedSubitem = subitemService.updateSubitem(subitem);
            return ResponseEntity.status(HttpStatus.OK).body(updatedSubitem);
        } catch (Exception e) {
            e.printStackTrace();  // <---- log do erro completo no console backend
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar subitem!");
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSubitem(@PathVariable Integer id) {
        try {
            Subitem subitemToDelete = subitemService.findSubitemById(id);
            if (subitemToDelete != null) {
                subitemService.deleteSubitem(subitemToDelete);
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Subitem não encontrado!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir subitem!");
        }
    }
}
