// src/Todo.jsx (Final Frontend Code)

import React, { useState, useEffect } from "react";
function Todo() {
  const [todos, settodos] = useState(''); // State for the input text
  const [todolist, settodolist] = useState([]); // State for the list of todos

  // Fetch initial data - your code here was perfect
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/todos');
        const data = await response.json();
        settodolist(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);

  // Function to add a new item
  async function additem(e) {
    e.preventDefault(); // Prevent form from reloading the page
    try {
      if (todos.trim() === '') {
        alert('Please enter a task');
        return;
      }
      const response = await fetch('http://localhost:5000/api/todos', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json' // Corrected 'content-type'
        },
        body: JSON.stringify({ text: todos })
      });
      const data = await response.json();
      settodolist([...todolist, data]);
      settodos(''); // Clear the input after adding
    } catch (err) {
      console.log(err);
    }
  }

  // Function to delete an item
  async function deleteitem(id) {
    try {
      // THIS IS THE FIX: Added a '/' before the id
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE"
      });
      settodolist(todolist.filter(item => item._id !== id));
    } catch (err) {
      console.log("Failed to delete:", err);
    }
  }

  return (
    <div className="container">
      <h1>TO-DO LIST</h1>
      {/* Using a form is better for accessibility and handling 'Enter' key */}
      <form className="todo-form" onSubmit={additem}>
        <input 
          type="text" 
          className="input-todo" 
          placeholder="ENTER YOUR LIST OF ITEM" 
          value={todos} 
          onChange={(e) => settodos(e.target.value)}
        />
        <button type="submit" className="add-btn">ADD</button>
      </form>
      <ul className="todo-list">
        {todolist.map((item) => (
          <li key={item._id}>
            <span className="todo-text">{item.text}</span>
            <button className="delete-btn" onClick={() => deleteitem(item._id)}>DELETE</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;