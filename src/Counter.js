import React, { useEffect, useRef } from 'react';
import classes from './Counter.module.css';

export const Counter = (props) => {
  const {min, max, counter, setCounter} = props;
  const inputRef = useRef(null);
  const options = {passive: false};

  const isValueInRange = (value) => {
    return value >= min && value <= max;
  }
  
  const increaseHandler = () => {
    const value = Number(counter) + 1;
    if(isValueInRange(value)) {
      setCounter(value);
    }
  }
  const decreaseHandler = () => {
    const value = Number(counter) - 1;
    if(isValueInRange(value)) {
      setCounter(value);
    }
  }

  const onChangeHandler = () => {
    const {value} = inputRef.current;
    if(isValueInRange(value)) {
      setCounter(value);
    }
  }

  const wheelInputHandler = (event) => {
    event.preventDefault();
    setCounter((prev) => {
      const value = Number(prev) + (event.wheelDelta > 0 ? 1 : -1);
      if(isValueInRange(value)) {
        return value;
      }
      return Number(prev);
    });
  }

  const onInputFocus = () => {
    document.addEventListener('wheel', wheelInputHandler, options);
  }

  const onInputBlur = () => {
    document.removeEventListener('wheel', wheelInputHandler, options);
  }

  useEffect(() => {
    inputRef.current.addEventListener('focus', onInputFocus);
    inputRef.current.addEventListener('blur', onInputBlur);

    return () => {
      inputRef.current.removeEventListener('focus', onInputFocus);
      inputRef.current.removeEventListener('blur', onInputBlur);
    }
  }, []);
  
  return (
    <div className={classes.Counter}>
      <button onClick={decreaseHandler}>-</button>
      <input 
        ref={inputRef} 
        value={counter} 
        type="number" 
        min={min} 
        max={max} 
        onChange={onChangeHandler}
      />
      <button onClick={increaseHandler}>+</button>
    </div>
  )
}