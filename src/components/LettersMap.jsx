import React, { useEffect, useRef, useState } from 'react'

export default function LettersMap(props) {
  
  const [selectedChars, setSelectedChars] = useState([]);
  const [mouse, setMouse] = useState(false);
  const canvasRef = useRef(null);

  const styles = {
    canvas : {
        position : 'absolute',
        left : 0,
        top : 0
    },
    lineWidth : props.lineWidth || '10',
    lineColor : props.lineColor || 'white'
  }

  const start = e => {
    if(e.target.id){
      setSelectedChars([props.letters[e.target.id]])
      if(e.type.includes("mouse")){
        setMouse(true);
        e.preventDefault();
      }
      props.handleChange(true);
    }
    else{
      props.handleChange(false);
    }
    props.handleEnd(false);
  }

  const move = e => {
    if(e.target.id === '' && !mouse) return;
    const corX = e.type.includes("mouse") ? e.pageX : e.changedTouches[0].pageX;
    const corY = (e.type.includes("mouse") ? e.pageY : e.changedTouches[0].pageY)-window.innerHeight*(1-props.height);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight/2);
    ctx.beginPath();
    selectedChars.forEach(char=>{
      const i = selectedChars.indexOf(char);
      const nextChar = selectedChars[i+1];
      if(i !== selectedChars.length-1){
        ctx.moveTo(char.x, char.y);
        ctx.lineTo(nextChar.x, nextChar.y);
      }
    })
    if(selectedChars.join("") !== ""){
      ctx.moveTo(selectedChars[selectedChars.length-1].x, selectedChars[selectedChars.length-1].y);
      ctx.lineTo(corX, corY);
      ctx.closePath();
      ctx.strokeStyle = styles.lineColor;
      ctx.lineWidth = styles.lineWidth;
      ctx.stroke();
      props.letters.forEach(char=>{
        if(!selectedChars.includes(char) && ((e.type.includes("mouse") && mouse) || !e.type.includes("mouse")) && (char.x < corX+char.width/2 && char.x > corX-char.width/2) && (char.y < corY+char.width/2 && char.y > corY-char.width/2)){
          setSelectedChars([...selectedChars, props.letters[char.id]])
        }
      })
    }
  }

  const end = e => {
    setSelectedChars([])
    setMouse(false);
    props.handleChange(false);
    props.handleEnd(true);
  }
  
  useEffect(()=>{
    if(selectedChars.length === 0){
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight/2);
      ctx.stroke();
      ctx.closePath();
    }
    props.handleSelected(selectedChars)
  }, [selectedChars])

  useEffect(()=>{
    setSelectedChars([])
  }, [props.queNumber])

  useEffect(()=>{
    move(props.move)
  }, [props.move])

  return (
    <div
      onTouchStart={start} 
      onTouchMove={move} 
      onTouchEnd={end} 
      onTouchCancel={end}
      onMouseDown={start}
      onMouseMove={move}
      onMouseUp={end}
    >
        <canvas ref={canvasRef} style={styles.canvas} height={window.innerHeight*props.height} width={window.innerWidth}></canvas>
        {props.children}
    </div>
  )
}
