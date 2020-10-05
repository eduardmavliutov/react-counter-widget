import React, { useState } from 'react';
import './App.css';
import { Counter } from './Counter';

function App() {
  const min = 0;
  const max = 55;
  const initialValue = 11;
  const [counter, setCounter] = useState(initialValue);

  return (
    <div className="App">
      <Counter
        min={min}
        max={max}
        counter={counter}
        setCounter={setCounter}
      />
    </div>
  );
}

export default App;
