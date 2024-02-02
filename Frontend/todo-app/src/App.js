import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    
    fetch('http://localhost:8080/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = () => {
    
    fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: newTask, completed: false }),
    })
      .then(response => response.json())
      .then(data => setTasks([...tasks, data]));

    setNewTask('');
  };

  const toggleTaskCompleted = taskId => {
    fetch('http://localhost:8080/tasks/${taskId}/toggle', {
      method: 'PUT',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP error! Status: ${response.status}' );
        }
        return response.json();
      })
      .then(updatedTask => {
        console.log('Task updated successfully:', updatedTask);
        // ... rest of the function
      })
      .catch(error => console.error('Error updating task:', error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <TaskList tasks={tasks} toggleTaskCompleted={toggleTaskCompleted} />
    </div>
  );
}

export default App;