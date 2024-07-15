
import { useEffect, useReducer, useRef } from 'react';
import './App.css';

function reducer (state, action) {
  switch (action.type) {
    case "Start": 
    return { ...state, isTicking: true};
    case "Pause": 
    return { ...state, isTicking: false};
    case "Reset": 
    return {clock: 0, isTicking: false};
    case "Tick": 
    return{ ...state, clock: state.clock + 1}
    default: return state
  }
}
//Can be taken out of function or written in the first const in function App
//const initialState = {
//  clock: 0,
//  isTicking: false
//}
function App() {

  const [state, dispatch] = useReducer (reducer, { clock: 0, isTicking: false } );
  const myTimerRef = useRef(0);


  useEffect(() => {
    if (!state.isTicking) {
      return
    }
    myTimerRef.current = setInterval(() => dispatch ({type: "Tick"}), 1000);
    return () => {
      clearInterval(myTimerRef.current);
      myTimerRef.current = 0
    }
  },[state.isTicking])



  return (
    <div className="App">
   <p>{state.clock} s</p>
   <button onClick={() => dispatch ({type: "Start"})}>Start</button>
   <button onClick={() => dispatch ({type: "Pause"})}>Pause</button>
   <button onClick={() => dispatch ({type: "Reset"})}>Reset</button>


    </div>
  );
}

export default App;
