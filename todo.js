import { useState } from "react";

function TodoApp() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo("");
  };

  return (
    <div>
      <h2>Todo App</h2>
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
