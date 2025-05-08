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

import br.com.fasttask.fasttask.exception.InvalidRequestException;
import br.com.fasttask.fasttask.exception.TaskNotFoundException;
import br.com.fasttask.fasttask.model.Task;
import br.com.fasttask.fasttask.service.ITaskService;
import org.springframework.web.bind.annotation.CrossOrigin;





@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
	
	 @Autowired
	    private ITaskService taskService;

	    @PostMapping
	    public ResponseEntity<Object> createTask(@RequestBody Task task) {
	        try {
	            Task newTask = taskService.createTask(task);
	            return ResponseEntity.status(HttpStatus.CREATED).body(newTask);
	        } catch (InvalidRequestException e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar tarefa!");
	        }
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Object> getTaskById(@PathVariable Integer id) {
	        try {
	            Task task = taskService.findTaskById(id);
	            return ResponseEntity.status(HttpStatus.OK).body(task);
	        } catch (TaskNotFoundException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar tarefa!");
	        }
	    }

	    @GetMapping("/user/{userId}")
	    public ResponseEntity<Object> getTasksByUserId(@PathVariable Integer userId) {
	        try {
	            List<Task> tasks = taskService.findTasksByUserId(userId);
	            return ResponseEntity.status(HttpStatus.OK).body(tasks);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar tarefas!");
	        }
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<Object> updateTask(@PathVariable Integer id, @RequestBody Task task) {
	        try {
	            if (!id.equals(task.getId())) {
	                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id da tarefa não confere!");
	            }
	            Task updatedTask = taskService.updateTask(task);
	            return ResponseEntity.status(HttpStatus.OK).body(updatedTask);
	        } catch (TaskNotFoundException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	        } catch (InvalidRequestException e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar tarefa!");
	        }
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Object> deleteTask(@PathVariable Integer id) {
	        try {
	            Task taskToDelete = taskService.findTaskById(id);
	            if (taskToDelete != null) {
	                taskService.deleteTask(taskToDelete);
	                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	            } else {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarefa não encontrada!");
	            }
	        } catch (InvalidRequestException e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir tarefa!");
	        }
	    }
}
