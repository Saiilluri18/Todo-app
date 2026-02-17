package com.hema.todoapp.controller;

import com.hema.todoapp.model.Todo;
import com.hema.todoapp.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// React frontend ki allow cheyadaniki CrossOrigin
@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000") // React frontend port
public class TodoController {

    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    // GET all todos
    @GetMapping
    public List<Todo> getAll(@RequestParam(required = false) Boolean completed) {
        return service.getAll(completed);
    }

    // CREATE todo
    @PostMapping
    public Todo create(@RequestBody Todo todo) {
        return service.save(todo);
    }

    // UPDATE todo
    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo todo) {
        todo.setId(id);
        return service.save(todo);
    }

    // DELETE todo
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
