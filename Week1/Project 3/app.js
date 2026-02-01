import React, { useState, useEffect } from 'react';
import './App.css';

// Todo Item Component
function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      editTodo(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="todo-checkbox"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="todo-edit-input"
            autoFocus
          />
        ) : (
          <span className="todo-text">{todo.text}</span>
        )}
      </div>
      <div className="todo-actions">
        <span className="todo-category">{todo.category}</span>
        {isEditing ? (
          <>
            <button onClick={handleEdit} className="btn-save" title="Save">
              ✓
            </button>
            <button onClick={handleCancel} className="btn-cancel" title="Cancel">
              ✕
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="btn-edit" title="Edit">
              ✎
            </button>
            <button onClick={() => deleteTodo(todo.id)} className="btn-delete" title="Delete">
              🗑
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Filter Buttons Component
function FilterButtons({ filter, setFilter }) {
  return (
    <div className="filter-buttons">
      <button
        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
        onClick={() => setFilter('active')}
      >
        Active
      </button>
      <button
        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
    </div>
  );
}

// Statistics Component
function Statistics({ todos }) {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="statistics">
      <div className="stat-item">
        <span className="stat-number">{total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{active}</span>
        <span className="stat-label">Active</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{completed}</span>
        <span className="stat-label">Completed</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{completionRate}%</span>
        <span className="stat-label">Progress</span>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('Personal');
  const [searchQuery, setSearchQuery] = useState('');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        console.error('Error loading todos:', e);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      completed: false,
      category: category,
      createdAt: new Date().toISOString()
    };

    setTodos([newTodo, ...todos]);
    setInputText('');
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // Edit todo
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  // Clear completed todos
  const clearCompleted = () => {
    if (window.confirm('Delete all completed tasks?')) {
      setTodos(todos.filter(todo => !todo.completed));
    }
  };

  // Clear all todos
  const clearAll = () => {
    if (window.confirm('Delete all tasks? This cannot be undone.')) {
      setTodos([]);
    }
  };

  // Filter and search todos
  const getFilteredTodos = () => {
    let filtered = todos;

    // Apply status filter
    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>📝 Todo App</h1>
          <p>Stay organized and productive</p>
        </header>

        <Statistics todos={todos} />

        <form onSubmit={addTodo} className="todo-form">
          <div className="form-row">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="What needs to be done?"
              className="todo-input"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
            <button type="submit" className="btn-add">
              Add Task
            </button>
          </div>
        </form>

        <div className="controls">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search tasks..."
            className="search-input"
          />
          <FilterButtons filter={filter} setFilter={setFilter} />
        </div>

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📭</span>
              <p>
                {todos.length === 0
                  ? 'No tasks yet. Add one to get started!'
                  : searchQuery
                  ? 'No tasks match your search.'
                  : filter === 'completed'
                  ? 'No completed tasks yet.'
                  : 'No active tasks. Great job!'}
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="footer-actions">
            <button onClick={clearCompleted} className="btn-clear">
              Clear Completed
            </button>
            <button onClick={clearAll} className="btn-clear-all">
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;