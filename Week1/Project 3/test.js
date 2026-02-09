// src/App.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Todo App', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders todo app heading', () => {
    render(<App />);
    expect(screen.getByText(/todo app/i)).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const addButton = screen.getByRole('button', { name: /add task/i });
    
    await userEvent.type(input, 'Buy groceries');
    await userEvent.click(addButton);
    
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test('marks todo as complete', async () => {
    render(<App />);
    
    // Add a todo first
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await userEvent.type(input, 'Complete project');
    await userEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    // Find and click checkbox
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    
    expect(checkbox).toBeChecked();
  });

  test('deletes a todo', async () => {
    render(<App />);
    
    // Add a todo
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await userEvent.type(input, 'Task to delete');
    await userEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    // Delete it
    const deleteButton = screen.getByTitle(/delete/i);
    await userEvent.click(deleteButton);
    
    expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
  });

  test('filters todos by status', async () => {
    render(<App />);
    
    // Add multiple todos
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    
    await userEvent.type(input, 'Active task');
    await userEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    await userEvent.type(input, 'Completed task');
    await userEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    // Complete second task
    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[1]);
    
    // Filter by completed
    await userEvent.click(screen.getByRole('button', { name: /completed/i }));
    
    expect(screen.getByText('Completed task')).toBeInTheDocument();
    expect(screen.queryByText('Active task')).not.toBeInTheDocument();
  });

  test('persists todos in localStorage', async () => {
    const { unmount } = render(<App />);
    
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await userEvent.type(input, 'Persistent task');
    await userEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    // Unmount and remount
    unmount();
    render(<App />);
    
    expect(screen.getByText('Persistent task')).toBeInTheDocument();
  });

  test('shows empty state when no todos', () => {
    render(<App />);
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  test('displays todo statistics', async () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    
    // Add 3 todos
    await userEvent.type(input, 'Task 1');
    await userEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    await userEvent.type(input, 'Task 2');
    await userEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    await userEvent.type(input, 'Task 3');
    await userEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    // Complete one
    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);
    
    expect(screen.getByText(/3/)).toBeInTheDocument(); // Total
    expect(screen.getByText(/2/)).toBeInTheDocument(); // Active
    expect(screen.getByText(/1/)).toBeInTheDocument(); // Completed
  });
});