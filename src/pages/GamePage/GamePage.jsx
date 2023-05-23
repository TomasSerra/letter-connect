import React, { useEffect, useState } from 'react'
import './GamePage.scss'
import LettersGrid from '../../components/LettersGrid'
import LettersMap from '../../components/LettersMap'

import logoAzul from "../../img/logoAzul.png"
import VioletBook from '../../img/violet_book.png'
import OpenBook from '../../img/open_book.png'
import Pen from '../../img/pen.png'
import Pencilcase from '../../img/pencilcase.png'
import Pencil from '../../img/Pencil.png'
import Clock from '../../img/time_icon.png'
import Border from '../../img/border.png'

export default function GamePage(props) {

  const [letters, setLetters] = useState({});
  const [selected, setSelected] = useState([]);
  const [prevSelected, setPrevSelected] = useState([]);
  const [queNumber, setQueNumber] = useState(0); 
  const [lettersArray, setLettersArray] = useState([]);
  const [move, setMove] = useState({target : {id : ''}});
  const [boxColor, setBoxColor] = useState("");
  const [end, setEnd] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [didChange, setDidChange] = useState(false);

  const maxTime = 35;

  const [time, setTime] = useState(maxTime);
  const [showedTime, setShowedTime] = useState(maxTime);
  const [stopTime, setStopTime] = useState(false);
  const [sliderColor, setSliderColor] = useState("rgb(66, 153, 63)");

  const handleLetters = (obj) =>{
    setLetters(obj);
  }

  const handleSelected = (arr) =>{
    setSelected(arr);
  }

  const handleEnd = (hasEnded) =>{
    setEnd(hasEnded);
  }

  const handleChange = (change) =>{
    setDidChange(change);
  }

  function timeFunction(){
    setTime(time => time-1)
  }

  useEffect(()=>{
    let selectedArray = [];
    selected.forEach(obj=>{
      selectedArray.push(obj.content)
    })
    if(selectedArray.join("") === props.questions[props.theme][queNumber].answer && props.questions[props.theme][queNumber].answer){
      setBoxColor("success");
      setStopTime(true)
      setTimeout(()=>{
        if(queNumber+1 === props.questions[props.theme].length){
          props.handleRouter(3);
          props.correctAnswers(correct+1)
        }
        else{
          setTime(maxTime)
          setStopTime(false)
          setQueNumber(queNumber+1)
          setBoxColor("");
          setCorrect(correct+1);
        }
      }, 3000)      
    }
    else if(selectedArray.join("") !== "" && end){
      setBoxColor("wrong")
    }
    else if(!end && didChange){
      setBoxColor("")
    }
    
    if(selected.join("") !== ""){
      setPrevSelected(selected);
    }

  }, [selected, end])

  useEffect(()=>{
    setLettersArray(props.questions[props.theme][queNumber].shuffle)
    setSelected([])
    setPrevSelected([])
    //PARA MODIFICAR EL TAMAÑO DE LAS BOX TRABAJA ACA
    // props.questions[props.theme][queNumber].answer.lenght te da la cantidad de letras
  }, [queNumber])

  useEffect(()=>{
    if(stopTime == false){
      if(time<=0){
        setTime(maxTime);
        if(queNumber+1 === props.questions[props.theme].length){
          props.correctAnswers(correct);
          props.handleRouter(3);
        }
        else{
          setQueNumber(queNumber => queNumber+1)
        }
        setBoxColor("");
        setSliderColor("rgb(66, 153, 63)")
      }
      if(time <= maxTime*0.3){ //Si llega al 30% del tiempo
        setSliderColor("rgb(160, 40, 40)")
      }
      else{
        setSliderColor("rgb(66, 153, 63)")
      }
    }
  }, [time])

  useEffect(()=>{
    if(stopTime){
      setShowedTime(time);
    }
  }, [stopTime])

  useEffect(()=>{
    setInterval(timeFunction, 1000);
  },[])

  let aux=0;

  return (
    <div className='Game'>
      <header>
        <div className='top-row'>
          <img src={logoAzul}/>
          <h3>Pregunta {queNumber+1}/{props.questions[props.theme].length}</h3>
          </div>
        <div className='bottom-row'>
          <div className='slider'>
            <div className='input' style={{width: stopTime ? `${showedTime*100/maxTime}%` : `${time*100/maxTime}%`, backgroundColor: sliderColor}}></div>
          </div>
          <img className="clock-icon" src={Clock}/>
        </div>
      </header>
      <img className="pencil" src={Pencil}/>
      <center>
        <div className="question">
          <div className='lines'>
            <hr/>
            <hr/>
            <hr/>
          </div>
          <h2>{props.questions[props.theme][queNumber].question}</h2>
        </div>
      </center>
      <div className='upper'>
        {lettersArray.map((letter)=>{
          const i=aux;
          aux = aux+1;
          return <input key={i} type="text" className={boxColor} value={prevSelected[i] ? prevSelected[i].content : ""} disabled/>
        })}
        <h2>{boxColor === "success" ? "¡Excelente!" : ""}</h2>
      </div>
      <div className='lower' onMouseMove={e=>{setMove(e)}}>
        <img className="border" src={Border}/>
        <div className="background"></div>
        <LettersMap height={0.42} letters={letters} lineColor='#ffffff' lineWidth='30' handleSelected={handleSelected} handleEnd={handleEnd} queNumber={queNumber} move={move} handleChange={handleChange}>
          <LettersGrid 
            height={0.42} 
            radius={lettersArray.length<6 ? 0.5 : (lettersArray.length<8 ? 0.6 : 0.7)} 
            lettersSize={150} 
            letters={lettersArray} 
            handleLetters={handleLetters}  
          />
        </LettersMap>
        <img className="violet-book" src={VioletBook}/>
        <img className="open-book" src={OpenBook}/>
        <img className="pen" src={Pen}/>
        <img className="pencilcase" src={Pencilcase}/>
      </div>
    </div>
  )
}
