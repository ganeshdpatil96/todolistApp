import React from 'react';

function TaskList({ tasks, toggleTaskCompleted }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={()=> toggleTaskCompleted(task.id)}
          />
        {task.description}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;