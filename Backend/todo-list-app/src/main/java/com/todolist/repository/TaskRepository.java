package com.todolist.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.todolist.model.*;

public interface TaskRepository extends JpaRepository<Task, Long>{

}
