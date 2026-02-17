import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:8080/api/todos";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    if (!title) return;
    try {
      await axios.post(API, { title });
      setTitle("");
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await axios.put(`${API}/${todo.id}`, {
        ...todo,
        completed: !todo.completed
      });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Todo App</h2>

      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo"
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={addTodo} style={{ marginLeft: "5px" }}>Add</button>
      </div>

      <ul style={{ padding: 0, listStyle: "none" }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px", backgroundColor: todo.completed ? "#e0ffe0" : "#fff" }}>
            <span
              onClick={() => toggleComplete(todo)}
              style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
            >
              {todo.title} {todo.completed && "✔️"}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{ backgroundColor: "red", color: "#fff", border: "none", borderRadius: "3px" }}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
