import React, { useState } from 'react';
import './App.scss';
import GamePage from './pages/GamePage/GamePage';
import InitialPage from './pages/InitialPage/InitialPage';
import RoulettePage from './pages/RoulettePage/RoulettePage';
import EndPage from './pages/EndPage/EndPage';

import Questions from './example.json'

export default function App() {
  const[router, setRouter] = useState(0);
  const[theme, setTheme] = useState(0);
  const[correct, setCorrect] = useState(0);

  function randomize(cant){
    let array = [];
    let i = 0;
    while(array.length<cant){
      const num = Math.floor(Math.random()*cant)
      if(!array.includes(num)){
        array.push(num)
      }
    }
    return(array)
  }

  function shuffleAnswer(ans){
    let shAns = [];
    const shOrd = randomize(ans.length);
    shOrd.forEach(pos=>{
      shAns.push(ans[pos]);
    })
    return(shAns);
  }

  function randomizeQuestions(json){
    let output = [];
    json.forEach(section=>{
      const qOrd = randomize(section.length)
      let newSection = [];
      qOrd.forEach(pos=>{
        newSection.push({...section[pos], 'shuffle': shuffleAnswer(section[pos].answer)})
      })
      output.push(newSection);
    })
    return output;
  }

  function handleRouter(i){
    setRouter(i);
  }
  function handleTheme(i){
    setTheme(i);
  }

  function correctAnswers(correct){
    setCorrect(correct);
  }


  return (
    <div className="App">
      {router===0 && <InitialPage handleRouter={handleRouter} />}
      {router===1 && <RoulettePage handleRouter={handleRouter} handleTheme={handleTheme} />}
      {router===2 && <GamePage handleRouter={handleRouter} questions={randomizeQuestions(Questions)} theme={theme} correctAnswers={correctAnswers}/>}
      {router===3 && <EndPage handleRouter={handleRouter} correct={correct}/>}
    </div>
  );
}

