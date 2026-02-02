# Week 2: Advanced React & Next.js - Complete Learning Guide

## 📚 Topics Covered

1. **React Hooks** (useState, useEffect, useContext, useRef, useMemo, useCallback)
2. **State Management** (Context API, Local Storage)
3. **API Integration** (fetch, axios, error handling)
4. **Next.js** (SSR, SSG, File-based routing, API routes)

---

## 🎣 React Hooks Deep Dive

### 1. useState - State Management

```javascript
import { useState } from 'react';

function Counter() {
  // Basic useState
  const [count, setCount] = useState(0);
  
  // With object
  const [user, setUser] = useState({ name: '', email: '' });
  
  // With array
  const [items, setItems] = useState([]);
  
  // Functional update (when new state depends on previous)
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };
  
  // Update object
  const updateUser = () => {
    setUser(prev => ({ ...prev, name: 'John' }));
  };
  
  // Update array
  const addItem = (item) => {
    setItems(prev => [...prev, item]);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

### 2. useEffect - Side Effects

```javascript
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Run once on mount
  useEffect(() => {
    console.log('Component mounted');
    
    // Cleanup function
    return () => {
      console.log('Component will unmount');
    };
  }, []); // Empty dependency array
  
  // Run when count changes
  useEffect(() => {
    fetchData();
  }, [count]); // Runs when count changes
  
  // Run on every render (avoid this!)
  useEffect(() => {
    console.log('Every render');
  }); // No dependency array
  
  // Fetch data example
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return <div>{loading ? 'Loading...' : JSON.stringify(data)}</div>;
}
```

### 3. useContext - Global State Management

```javascript
import { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext();

// 2. Create Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    theme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create custom hook
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Use in component
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}

// 5. Wrap app with provider
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

### 4. useRef - DOM Access & Persistent Values

```javascript
import { useRef, useEffect } from 'react';

function InputFocus() {
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  
  useEffect(() => {
    // Focus input on mount
    inputRef.current.focus();
    
    // Increment render count (doesn't cause re-render)
    renderCount.current += 1;
  });
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <p>Render count: {renderCount.current}</p>
    </div>
  );
}
```

### 5. useMemo - Performance Optimization

```javascript
import { useState, useMemo } from 'react';

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  
  // Without useMemo (recalculates on every render)
  const expensiveValue = calculateExpensiveValue(items);
  
  // With useMemo (only recalculates when items change)
  const memoizedValue = useMemo(() => {
    return calculateExpensiveValue(items);
  }, [items]); // Only recalculate if items change
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive value: {memoizedValue}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment (doesn't recalculate memoizedValue)
      </button>
    </div>
  );
}

function calculateExpensiveValue(items) {
  console.log('Calculating...');
  return items.reduce((sum, item) => sum + item.value, 0);
}
```

### 6. useCallback - Memoize Functions

```javascript
import { useState, useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  
  // Without useCallback (creates new function on every render)
  const handleClick = () => {
    console.log('Clicked');
  };
  
  // With useCallback (same function reference unless dependencies change)
  const memoizedHandleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty array = function never changes
  
  const incrementCount = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Can use functional update
  
  return (
    <div>
      <Child onClick={memoizedHandleClick} />
      <button onClick={incrementCount}>Count: {count}</button>
    </div>
  );
}

// Child only re-renders if onClick changes
const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
});
```

---

## 🌐 API Integration

### Using Fetch API

```javascript
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('https://api.example.com/data');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;
  
  return <div>{JSON.stringify(data)}</div>;
}
```

### POST Request Example

```javascript
const createUser = async (userData) => {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token_here'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
```

### Using Axios (Alternative to Fetch)

```javascript
import axios from 'axios';

// Create axios instance with defaults
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// GET request
const fetchData = async () => {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// POST request
const createData = async (data) => {
  try {
    const response = await api.post('/data', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Interceptors (for auth tokens, etc.)
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
```

---

## 💾 LocalStorage Integration

```javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Save to localStorage whenever value changes
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', 'Guest');
  const [todos, setTodos] = useLocalStorage('todos', []);
  
  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

---

## ⚡ Next.js Fundamentals

### File-Based Routing

```
pages/
├── index.js              → /
├── about.js              → /about
├── blog/
│   ├── index.js         → /blog
│   ├── [slug].js        → /blog/:slug (dynamic)
│   └── [...slug].js     → /blog/* (catch-all)
└── api/
    └── hello.js         → /api/hello (API route)
```

### Creating Pages

```javascript
// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

// pages/about.js
export default function About() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
}

// pages/blog/[slug].js (Dynamic route)
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  
  return <h1>Blog Post: {slug}</h1>;
}
```

### Navigation

```javascript
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navigation() {
  const router = useRouter();
  
  return (
    <nav>
      {/* Declarative navigation */}
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog/my-post">Blog Post</Link>
      
      {/* Programmatic navigation */}
      <button onClick={() => router.push('/about')}>
        Go to About
      </button>
    </nav>
  );
}
```

### Data Fetching Methods

#### 1. Server-Side Rendering (SSR)
```javascript
// Runs on every request
export async function getServerSideProps(context) {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data } // Passed to component as props
  };
}

export default function Page({ data }) {
  return <div>{JSON.stringify(data)}</div>;
}
```

#### 2. Static Site Generation (SSG)
```javascript
// Runs at build time
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data },
    revalidate: 60 // Regenerate page every 60 seconds
  };
}

export default function Page({ data }) {
  return <div>{JSON.stringify(data)}</div>;
}
```

#### 3. Static Paths (for dynamic routes)
```javascript
// Generate paths at build time
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  const paths = posts.map(post => ({
    params: { id: post.id.toString() }
  }));
  
  return {
    paths,
    fallback: false // Show 404 for unknown paths
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.id}`);
  const post = await res.json();
  
  return {
    props: { post }
  };
}

export default function Post({ post }) {
  return <div>{post.title}</div>;
}
```

### API Routes

```javascript
// pages/api/hello.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello World' });
  } else if (req.method === 'POST') {
    const { name } = req.body;
    res.status(200).json({ message: `Hello ${name}` });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// pages/api/users/[id].js (Dynamic API route)
export default function handler(req, res) {
  const { id } = req.query;
  
  // Fetch user by ID
  res.status(200).json({ id, name: 'John Doe' });
}
```

### Next.js App Structure

```javascript
// pages/_app.js (Global app wrapper)
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <header>My App Header</header>
      <Component {...pageProps} />
      <footer>My App Footer</footer>
    </div>
  );
}

export default MyApp;

// pages/_document.js (HTML document wrapper)
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### Image Optimization

```javascript
import Image from 'next/image';

function Profile() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={500}
      height={500}
      priority // Load immediately
    />
  );
}
```

---

## 🎯 Complete Project Examples

### Weather App (useState + useEffect + API)

See `project1-weather-app/` for complete implementation featuring:
- ✅ useState for state management
- ✅ useEffect for API calls
- ✅ Geolocation API
- ✅ LocalStorage for search history
- ✅ Error handling
- ✅ Loading states

### Movie Search (useContext + API)

See `project2-movie-search/` for complete implementation featuring:
- ✅ useContext for global state
- ✅ Custom hooks
- ✅ LocalStorage for favorites
- ✅ Multiple components
- ✅ OMDB API integration

### Blog with Next.js (SSR + SSG)

See `project3-nextjs-blog/` for complete implementation featuring:
- ✅ File-based routing
- ✅ getStaticProps
- ✅ getServerSideProps
- ✅ Dynamic routes
- ✅ API routes
- ✅ Markdown posts

---

## 🚀 Best Practices

### 1. Hook Rules
- Only call hooks at the top level
- Only call hooks in React functions
- Use ESLint plugin: `eslint-plugin-react-hooks`

### 2. useEffect Dependencies
- Always include all dependencies
- Use functional updates to avoid unnecessary dependencies
- Clean up side effects (timers, subscriptions)

### 3. Performance
- Use `useMemo` for expensive calculations
- Use `useCallback` for callback functions passed to children
- Use `React.memo()` for component memoization

### 4. State Management
- Keep state as local as possible
- Lift state up when needed by multiple components
- Use Context for truly global state
- Consider external libraries (Redux, Zustand) for complex apps

### 5. API Calls
- Handle loading and error states
- Use try-catch for error handling
- Implement request cancellation for cleanup
- Consider using libraries like React Query

---

## 📚 Resources

- React Docs: https://react.dev
- Next.js Docs: https://nextjs.org/docs
- OpenWeather API: https://openweathermap.org/api
- OMDB API: http://www.omdbapi.com
- JSONPlaceholder: https://jsonplaceholder.typicode.com

---

**Happy Learning! 🎉**