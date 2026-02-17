package com.hema.todoapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodoController {

    @GetMapping("/api/todos")
    public String getTodos() {
        return "Backend Working Successfully";
    }

}
