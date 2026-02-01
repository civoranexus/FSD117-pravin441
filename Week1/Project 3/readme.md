# React Todo App

A modern, feature-rich todo application built with React, demonstrating React hooks, state management, and local storage.

## Features

- ✅ Add, edit, and delete tasks
- ✔️ Mark tasks as complete/incomplete
- 🏷️ Categorize tasks (Personal, Work, Shopping, Health, Other)
- 🔍 Search tasks
- 🎯 Filter by status (All, Active, Completed)
- 📊 Real-time statistics
- 💾 Persistent storage (localStorage)
- 📱 Fully responsive design
- ✨ Smooth animations
- 🎨 Modern UI/UX

## Technologies Used

- **React 18**: Latest React features
- **React Hooks**:
  - `useState` - State management
  - `useEffect` - Side effects and lifecycle
- **localStorage**: Data persistence
- **CSS3**: Modern styling with animations
- **ES6+**: Arrow functions, destructuring, spread operator

## File Structure

```
project3-react-todo/
│
├── public/
│   └── index.html         # HTML template
│
├── src/
│   ├── App.jsx           # Main component
│   ├── App.css           # Styles
│   ├── index.js          # React entry point
│   └── index.css         # Global styles
│
├── package.json          # Dependencies
└── README.md            # This file
```

## Component Breakdown

### Main Components

1. **App** - Main container component
   - Manages all state
   - Contains business logic
   - Handles localStorage

2. **TodoItem** - Individual todo component
   - Displays todo text
   - Toggle complete/incomplete
   - Edit and delete functionality
   - Category badge

3. **FilterButtons** - Filter controls
   - All, Active, Completed filters
   - Active state styling

4. **Statistics** - Dashboard component
   - Total tasks
   - Active tasks
   - Completed tasks
   - Completion percentage

## How to Run

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm start
```

3. **Open in browser**:
Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder.

## Features Explained

### Add Todo
1. Type task in input field
2. Select category from dropdown
3. Click "Add Task" button
4. Task appears at top of list

### Edit Todo
1. Click edit (✎) button on any task
2. Input field appears
3. Modify text
4. Click save (✓) or cancel (✕)

### Complete/Uncomplete Todo
- Click checkbox to toggle completion status
- Completed tasks show strikethrough text
- Opacity reduced for completed tasks

### Delete Todo
1. Click delete (🗑) button
2. Confirm deletion in popup
3. Task is removed

### Filter Tasks
- **All**: Shows all tasks
- **Active**: Shows incomplete tasks only
- **Completed**: Shows completed tasks only

### Search Tasks
- Type in search box
- Tasks filter in real-time
- Case-insensitive search

### Categories
Tasks can be categorized as:
- Personal
- Work
- Shopping
- Health
- Other

### Clear Functions
- **Clear Completed**: Removes all completed tasks
- **Clear All**: Removes all tasks (with confirmation)

## React Concepts Demonstrated

### State Management
```javascript
const [todos, setTodos] = useState([]);
const [inputText, setInputText] = useState('');
const [filter, setFilter] = useState('all');
```

### useEffect Hook
```javascript
// Load from localStorage on mount
useEffect(() => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) setTodos(JSON.parse(savedTodos));
}, []);

// Save to localStorage on change
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);
```

### Props Drilling
```javascript
<TodoItem
  todo={todo}
  toggleTodo={toggleTodo}
  deleteTodo={deleteTodo}
  editTodo={editTodo}
/>
```

### Conditional Rendering
```javascript
{filteredTodos.length === 0 ? (
  <EmptyState />
) : (
  <TodoList />
)}
```

### Array Methods
- `map()` - Render list items
- `filter()` - Filter tasks
- `find()` - Find specific task
- Spread operator - Update arrays immutably

## Styling Features

### CSS Variables
```css
:root {
  --primary: #6366f1;
  --success: #10b981;
  --danger: #ef4444;
  /* Easy theme customization */
}
```

### Grid Layout
```css
.statistics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
}
```

### Animations
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 480px
- Flexible layouts
- Touch-friendly buttons

## localStorage Implementation

### Save Data
```javascript
localStorage.setItem('todos', JSON.stringify(todos));
```

### Load Data
```javascript
const savedTodos = localStorage.getItem('todos');
const parsedTodos = JSON.parse(savedTodos);
```

### Data Structure
```javascript
{
  id: 1706789123456,
  text: "Complete React project",
  completed: false,
  category: "Work",
  createdAt: "2024-02-01T10:30:00.000Z"
}
```

## Customization Guide

### Change Colors
Edit CSS variables in `App.css`:
```css
:root {
  --primary: #your-color;
  --success: #your-color;
  --danger: #your-color;
}
```

### Add New Categories
In `App.jsx`, add to the select options:
```javascript
<option value="YourCategory">Your Category</option>
```

### Modify Statistics
Edit the `Statistics` component to show different metrics.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy state initialization
- Efficient re-renders (React's virtual DOM)
- Debouncing search (can be added)
- Memoization with `useMemo` (can be added)

## Future Enhancements

- [ ] Due dates for tasks
- [ ] Priority levels
- [ ] Dark mode
- [ ] Drag and drop reordering
- [ ] Subtasks
- [ ] Backend integration
- [ ] User authentication
- [ ] Multiple todo lists
- [ ] Export/import functionality
- [ ] Keyboard shortcuts

## Learning Outcomes

This project teaches:
- ✅ React component structure
- ✅ State management with hooks
- ✅ Props and prop drilling
- ✅ Event handling
- ✅ Controlled components
- ✅ localStorage API
- ✅ Array manipulation methods
- ✅ Conditional rendering
- ✅ CSS-in-JS concepts
- ✅ Responsive design

## Common Issues & Solutions

### Issue: Data not persisting
**Solution**: Check browser's localStorage in DevTools > Application > Local Storage

### Issue: App not starting
**Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install`

### Issue: Styling not applied
**Solution**: Make sure CSS files are imported in component files

## Deployment

### Netlify
```bash
npm run build
# Drag and drop the build folder to Netlify
```

### Vercel
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm install gh-pages --save-dev
# Add to package.json:
# "homepage": "https://yourusername.github.io/repo-name"
# "predeploy": "npm run build"
# "deploy": "gh-pages -d build"
npm run deploy
```

## Credits

Built with React for learning modern web development and state management.

## License

Free to use for personal and educational purposes.

---

**Happy Coding with React! ⚛️**