
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get('/api/tasks'); // Fetch tasks from backend
      // setTasks(response.data);
      
    axios.get('http://localhost:5000/api/tasks', {
      withCredentials: true,
      headers: {
        'X-CSRFToken': getCookie('csrftoken') // Make sure to define getCookie() function
      }
    })
    .then(response => {
      console.log(response.json);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
   fetchData();
  }, []); // Empty dependency array to run only on initial render

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newTask) return; // Prevent empty task submission

    try {
      const response = await axios.post('/api/tasks', { title: newTask });
      setTasks([...tasks, response.data]); // Add new task to local state
      setNewTask(''); // Clear input field
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error message)
    }
  };

  const handleMarkComplete = async (taskId) => {
    try {
      const response = await axios.put(`/api/tasks/${taskId}`);
      setTasks(tasks.map((task) => (task.id === taskId ? response.data : task)));
    } catch (error) {
      console.error(error); // Handle errors appropriately
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error); // Handle errors appropriately
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newTask} onChange={handleChange} placeholder="Add a new task" />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span className={task.completed ? 'completed' : ''}>{task.title}</span>
            <button onClick={() => handleMarkComplete(task.id)}>
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
