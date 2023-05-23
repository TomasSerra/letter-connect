import React, { useEffect, useRef } from 'react'

export default function LettersGrid(props) {

  const gridRef = useRef(null);

  //IMPORTANTE: para disminuir la distancia entre letras, modificar
  const rad = (window.innerHeight * props.height * props.radius)/2;
  const letterSize = props.lettersSize;

  const styles = {
    container : {
      //backgroundColor : 'black',
      position : 'relative',
      width : rad*2+letterSize,
      height : rad*2+letterSize
    },
    letter : {
      position : 'absolute',
      fontFamily: 'arial',
      width : letterSize,
      height : letterSize,
      backgroundColor : 'white',
      fontSize : letterSize*0.6,
      borderRadius : '50%',
      display : 'flex',
      justifyContent : 'center',
      alignItems : 'center',
      boxShadow: '0 15px #D1D1D1',
      cursor: 'pointer',
      zIndex: 5
    }
  };

  const locateX = (i) => {
    return rad*(Math.sin((2*Math.PI/props.letters.length)*i)+1);
  }

  const locateY = (i) => {
    return rad*(-Math.cos((2*Math.PI/props.letters.length)*i)+1);
  }

  useEffect(()=>{
    const grid = [...gridRef.current.children];
    const objsChars = grid.map(char => {
      return {
        id: Number(char.id),
        content: char.innerHTML,
        width: char.offsetWidth, 
        x: char.offsetLeft + char.offsetWidth/2 + (window.innerWidth - gridRef.current.offsetWidth)/2,
        y:char.offsetTop + char.offsetHeight/2 + (window.innerHeight*props.height - gridRef.current.offsetHeight)/2
      }
    });
    props.handleLetters(objsChars);
  }, [props.letters])

  let aux=0;

  return (
    <div style={styles.container} ref={gridRef}>
      {props.letters.map((letter)=>{
        const i = aux;
        aux = aux+1;
        return(
          <div key={letter+i+'-'+props.queNumber} id={`${i}`} style={{...styles.letter, top : locateY(i), left : locateX(i)}}>{letter}</div>
        )
      })}
    </div>
  )
}
