package com.todolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.todolist.model.Task;
import com.todolist.repository.TaskRepository;

import java.util.List;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public Task addTask(@RequestBody Task task) {
        task.setCompleted(false); // Set completion status to false by default
        return taskRepository.save(task);
    }

    @PutMapping("/{taskId}/toggle")
    public Task toggleTaskCompleted(@PathVariable Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found with id: " + taskId));

        task.setCompleted(!task.isCompleted());
        return taskRepository.save(task);
    }
}