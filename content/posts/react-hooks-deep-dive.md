---
slug: "react-hooks-deep-dive"
title: "React Hooks: A Deep Dive"
date: "2023-11-28"
excerpt: "Understanding React Hooks from the ground up - how they work, when to use them, and common patterns for building better components."
coverImage: "/images/blog/react-hooks.svg"
category: "Web Dev"
tags: ["react", "javascript", "hooks"]
---

# React Hooks: A Deep Dive

React Hooks transformed how we write components. Let's explore how they work under the hood and learn patterns for using them effectively.

## Why Hooks?

Before Hooks, managing state and side effects required class components with lifecycle methods. Hooks let us use these features in functional components, leading to:

- **More reusable code**: Custom hooks extract logic
- **Simpler components**: No more `this` binding
- **Better code organization**: Related logic stays together

## The Rules of Hooks

Two critical rules to remember:

1. **Only call Hooks at the top level**: Never inside loops, conditions, or nested functions
2. **Only call Hooks from React functions**: Components or custom hooks

These rules ensure React can track hook state correctly.

## Essential Hooks

### useState

The most common hook for managing component state:

```javascript
function Counter() {
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

**Pro tip**: When the new state depends on the previous state, use the functional form:

```javascript
setCount(prevCount => prevCount + 1);
```

### useEffect

For side effects like data fetching, subscriptions, or DOM manipulation:

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    }

    fetchUser();
  }, [userId]); // Re-run when userId changes

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

**Cleanup**: Return a function from `useEffect` to clean up:

```javascript
useEffect(() => {
  const subscription = subscribeToData(id);

  return () => {
    subscription.unsubscribe();
  };
}, [id]);
```

### useContext

Access context without nesting Consumer components:

```javascript
const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button className={`btn-${theme}`}>
      Themed Button
    </button>
  );
}
```

### useRef

Create mutable references that persist across renders:

```javascript
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

## Advanced Hooks

### useMemo

Memoize expensive calculations:

```javascript
function ProductList({ products, filterTerm }) {
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(filterTerm.toLowerCase())
    );
  }, [products, filterTerm]);

  return <div>{/* Render filtered products */}</div>;
}
```

### useCallback

Memoize callback functions (useful for preventing unnecessary child re-renders):

```javascript
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Function reference stays the same

  return <Child onClick={handleClick} />;
}
```

### useReducer

For complex state logic:

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

## Custom Hooks

The real power of hooks is creating your own:

```javascript
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Usage
function ResponsiveComponent() {
  const { width } = useWindowSize();

  return <div>Window width: {width}px</div>;
}
```

## Common Patterns

### Data Fetching Hook

```javascript
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

### Local Storage Hook

```javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

## Performance Tips

1. **Don't optimize prematurely**: Start simple, optimize when needed
2. **Use React DevTools Profiler**: Identify actual bottlenecks
3. **Memoize appropriately**: Not everything needs `useMemo` or `useCallback`
4. **Depend arrays matter**: Include all dependencies to avoid bugs

## Common Pitfalls

### Stale Closures

```javascript
// Problem
useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1); // Always uses initial count value
  }, 1000);

  return () => clearInterval(timer);
}, []);

// Solution
useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1); // Uses current value
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

### Infinite Loops

```javascript
// Problem
useEffect(() => {
  setData(fetchData()); // Triggers re-render, which triggers effect again
});

// Solution
useEffect(() => {
  setData(fetchData());
}, []); // Empty dependency array
```

## Conclusion

React Hooks are powerful, but they require understanding their rules and patterns. Start with the basics (`useState`, `useEffect`), then gradually explore advanced hooks and create your own.

The functional programming model they enable leads to more maintainable, testable, and reusable code. Embrace them, and your React code will be better for it.
