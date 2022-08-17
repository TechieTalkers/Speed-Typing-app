
import './App.css';
import React, { useEffect } from "react"

function App() {
  const DEFAULT_TIME=5
  const [word, setWords]= React.useState("");
  const [Timer,setTimer]=React.useState(DEFAULT_TIME);
  const [isTimeRunning, setIsTimeRunning] = React.useState(false)
  const [wordCount, setWordCount] = React.useState(0)
  const textBoxRef=React.useRef(null)
  function updateData(event){
      setWords(event.target.value)
  }

  function countWords(text){
    const arr = text.trim().split(" ");
    return arr.filter(textData => textData !=="" ).length
  }

  function startGame(){
    setIsTimeRunning(true)
    setTimer(DEFAULT_TIME)
    setWords("")
    textBoxRef.current.disabled=false
    textBoxRef.current.focus()
  }


  useEffect(()=>{
    if(isTimeRunning && Timer > 0){
      setTimeout(()=>{
        setTimer(time=> time-1)
      },1000)
    }else if(Timer === 0){
      setIsTimeRunning(false)
      setWordCount(countWords(word))
    }

  },[Timer,isTimeRunning])

  return (
    <div className="App">
      <h1>How fast do you type?</h1>
      <textarea 
            name="data"
            value={word}
            onChange={updateData}
            disabled={!isTimeRunning}
            ref={textBoxRef}
            />
      <h4>Time Reminaing : {Timer}</h4>
      <button onClick={startGame} disabled={isTimeRunning}>Start</button>
      <h1>Word count : {wordCount} </h1>
    </div>
  );
}

export default App;
