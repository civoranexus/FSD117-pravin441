# Quick Reference Cheat Sheet

Essential HTML, CSS, JavaScript, and React concepts for your projects.

---

## 📄 HTML5 Essentials

### Semantic Elements
```html
<header>    <!-- Page header -->
<nav>       <!-- Navigation links -->
<main>      <!-- Main content -->
<section>   <!-- Thematic grouping -->
<article>   <!-- Self-contained content -->
<aside>     <!-- Side content -->
<footer>    <!-- Page footer -->
```

### Common Elements
```html
<!-- Headings -->
<h1>Main Heading</h1> to <h6>Small Heading</h6>

<!-- Text -->
<p>Paragraph</p>
<span>Inline text</span>
<strong>Bold text</strong>
<em>Italic text</em>

<!-- Links & Images -->
<a href="url">Link</a>
<img src="path.jpg" alt="description">

<!-- Lists -->
<ul>                    <ol>
  <li>Item</li>           <li>Item 1</li>
</ul>                   </ol>

<!-- Forms -->
<form>
  <input type="text" placeholder="Name" required>
  <input type="email" placeholder="Email">
  <textarea rows="5"></textarea>
  <button type="submit">Submit</button>
</form>
```

---

## 🎨 CSS3 Essentials

### Selectors
```css
/* Element */
p { color: blue; }

/* Class */
.my-class { color: red; }

/* ID */
#my-id { color: green; }

/* Multiple */
h1, h2, h3 { margin: 0; }

/* Descendant */
.parent .child { padding: 10px; }

/* Pseudo-classes */
a:hover { color: red; }
input:focus { border: 2px solid blue; }
```

### Box Model
```css
.box {
  width: 300px;
  height: 200px;
  padding: 20px;      /* Space inside */
  margin: 10px;       /* Space outside */
  border: 2px solid black;
}
```

### Flexbox
```css
.container {
  display: flex;
  
  /* Direction */
  flex-direction: row | column;
  
  /* Main axis alignment */
  justify-content: center | flex-start | flex-end | space-between | space-around;
  
  /* Cross axis alignment */
  align-items: center | flex-start | flex-end | stretch;
  
  /* Wrap */
  flex-wrap: wrap | nowrap;
  
  /* Gap */
  gap: 20px;
}

.item {
  flex: 1;  /* Grow to fill space */
}
```

### Grid
```css
.grid-container {
  display: grid;
  
  /* Columns */
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  
  /* Rows */
  grid-template-rows: 100px auto 100px;
  
  /* Gap */
  gap: 20px;
  row-gap: 10px;
  column-gap: 15px;
}

.grid-item {
  grid-column: 1 / 3;  /* Span columns 1-3 */
  grid-row: 1 / 2;     /* Span rows 1-2 */
}
```

### Responsive Design
```css
/* Mobile First Approach */

/* Base styles (mobile) */
.container { 
  width: 100%; 
}

/* Tablet */
@media (min-width: 768px) {
  .container { 
    width: 750px; 
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { 
    width: 1000px; 
  }
}
```

### CSS Variables
```css
:root {
  --primary-color: #3498db;
  --font-size: 16px;
}

.element {
  color: var(--primary-color);
  font-size: var(--font-size);
}
```

### Transitions & Animations
```css
/* Transition */
.button {
  transition: all 0.3s ease;
}
.button:hover {
  transform: translateY(-5px);
}

/* Animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fadeIn 1s ease-in;
}
```

---

## 💻 JavaScript ES6+ Essentials

### Variables
```javascript
let age = 25;           // Can be reassigned
const name = "John";    // Cannot be reassigned
var old = "avoid";      // Old way, avoid using
```

### Data Types
```javascript
// Primitive types
let num = 42;                    // Number
let str = "Hello";               // String
let bool = true;                 // Boolean
let nothing = null;              // Null
let notDefined;                  // Undefined

// Reference types
let arr = [1, 2, 3];            // Array
let obj = { key: "value" };     // Object
```

### Functions
```javascript
// Traditional
function greet(name) {
  return `Hello ${name}`;
}

// Arrow function
const greet = (name) => {
  return `Hello ${name}`;
};

// Short arrow function
const greet = name => `Hello ${name}`;
```

### Template Literals
```javascript
const name = "John";
const age = 30;

// Old way
const message = "My name is " + name + " and I am " + age;

// ES6 way
const message = `My name is ${name} and I am ${age}`;
```

### Destructuring
```javascript
// Array destructuring
const [a, b, c] = [1, 2, 3];

// Object destructuring
const { name, age } = { name: "John", age: 30 };
```

### Spread Operator
```javascript
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

// Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
```

### Array Methods
```javascript
const numbers = [1, 2, 3, 4, 5];

// map - Transform each element
const doubled = numbers.map(num => num * 2);  // [2, 4, 6, 8, 10]

// filter - Keep elements that match condition
const evens = numbers.filter(num => num % 2 === 0);  // [2, 4]

// reduce - Reduce to single value
const sum = numbers.reduce((acc, num) => acc + num, 0);  // 15

// find - Find first match
const found = numbers.find(num => num > 3);  // 4

// forEach - Loop through array
numbers.forEach(num => console.log(num));
```

### DOM Manipulation
```javascript
// Select elements
const element = document.querySelector('.class');
const elements = document.querySelectorAll('.class');
const byId = document.getElementById('id');

// Modify content
element.textContent = 'New text';
element.innerHTML = '<strong>Bold</strong>';

// Modify attributes
element.setAttribute('src', 'image.jpg');
element.classList.add('active');
element.classList.remove('hidden');
element.classList.toggle('visible');

// Modify styles
element.style.color = 'red';
element.style.backgroundColor = 'blue';

// Create and append
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello';
document.body.appendChild(newDiv);
```

### Event Handling
```javascript
// Add event listener
element.addEventListener('click', function(e) {
  console.log('Clicked!', e);
});

// Arrow function
element.addEventListener('click', (e) => {
  console.log('Clicked!', e);
});

// Common events
'click', 'submit', 'change', 'input', 'focus', 'blur',
'keydown', 'keyup', 'mouseenter', 'mouseleave', 'scroll'
```

### Async JavaScript
```javascript
// Promises
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Async/Await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

---

## ⚛️ React Essentials

### Component Structure
```javascript
import React from 'react';

function MyComponent(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
}

export default MyComponent;
```

### useState Hook
```javascript
import { useState } from 'react';

function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### useEffect Hook
```javascript
import { useEffect } from 'react';

function Example() {
  const [data, setData] = useState(null);
  
  // Run on mount
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  // Run when dependency changes
  useEffect(() => {
    fetchData();
  }, [data]);
  
  // Cleanup
  useEffect(() => {
    const timer = setInterval(() => {}, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return <div>{data}</div>;
}
```

### Props
```javascript
// Parent component
function Parent() {
  return <Child name="John" age={30} />;
}

// Child component
function Child(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

// With destructuring
function Child({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}
```

### Event Handling
```javascript
function Form() {
  const [input, setInput] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', input);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Conditional Rendering
```javascript
function Greeting({ isLoggedIn }) {
  // If/else
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please log in</h1>;
  
  // Ternary
  return (
    <div>
      {isLoggedIn ? <h1>Welcome!</h1> : <h1>Please log in</h1>}
    </div>
  );
  
  // && operator
  return (
    <div>
      {isLoggedIn && <h1>Welcome!</h1>}
    </div>
  );
}
```

### Lists and Keys
```javascript
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

### localStorage
```javascript
// Save to localStorage
localStorage.setItem('key', 'value');
localStorage.setItem('user', JSON.stringify({ name: 'John' }));

// Get from localStorage
const value = localStorage.getItem('key');
const user = JSON.parse(localStorage.getItem('user'));

// Remove from localStorage
localStorage.removeItem('key');

// Clear all
localStorage.clear();
```

---

## 🔧 Common Patterns

### Form Validation
```javascript
const validateForm = (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || !emailRegex.test(email)) {
    return 'Invalid email';
  }
  
  if (!password || password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  
  return null; // Valid
};
```

### Debouncing
```javascript
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Usage
const searchHandler = debounce((query) => {
  console.log('Search:', query);
}, 300);
```

### Toggle Theme
```javascript
const toggleTheme = () => {
  const currentTheme = document.body.classList.contains('dark-theme');
  
  if (currentTheme) {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  }
};
```

---

## 🐛 Debugging Tips

### Console Methods
```javascript
console.log('Simple message');
console.error('Error message');
console.warn('Warning message');
console.table([{a: 1, b: 2}, {a: 3, b: 4}]);
console.time('timer');
// ... code ...
console.timeEnd('timer');
```

### Common Errors
```
"Cannot read property 'X' of undefined"
→ Check if object exists before accessing property

"X is not a function"
→ Check if you're calling the right thing

"Unexpected token"
→ Missing comma, bracket, or parenthesis

"Maximum call stack size exceeded"
→ Infinite recursion or loop
```

---

## 📚 Resources

- **MDN**: https://developer.mozilla.org
- **Can I Use**: https://caniuse.com (browser support)
- **CSS-Tricks**: https://css-tricks.com
- **JavaScript.info**: https://javascript.info
- **React Docs**: https://react.dev

---

**Keep this handy while coding! 🚀**