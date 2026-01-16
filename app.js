import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return
  //complete code below 
  (
  <div>
      <h1>Counter App</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}

export default App;
