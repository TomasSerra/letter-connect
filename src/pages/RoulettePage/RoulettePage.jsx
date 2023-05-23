import React, { useState } from 'react'
import './RoulettePage.scss'

import Roulette from '../../components/Roulette'

import Logo from '../../img/logoAzul.png'
import Icono from '../../img/icono.png'
import Button from '../../components/Button'
import Hand from '../../img/hand.png'

export default function RoulettePage(props) {

  const [text, setText] = useState(true);
  const [button, setButton] = useState(false);
  const [rotate, setRotate] = useState(false);

  const elements = ["Seguridad \n bancaria", "Educación financiera", "Cultura BNA", "Historia BNA"]
  const offsets = [-30, -10, 10, 20] //OFFSET en PX, cuanto mas grande el valor, mas se acerca al centro
  const textWidth = 270;


  function handleIndex(i){
    props.handleTheme(i);
    setText(false);
    nextPage();
  }

  async function nextPage(){
    await setTimeout(()=>{
        //setConfetti(true);
        setRotate(false);
        setButton(true);
    }, 5000)
  }

  return (
    <div className='Roulette Page' onMouseDown={()=>{if(!button) setRotate(true);}} /*onMouseUp={()=>{setRotate(false)}}*/>
        <img className='logo' src={Logo} alt="nacion logo" />
        <Roulette
            size="750px" 
            elements={elements}
            width={textWidth}
            offsets={offsets}
            turns={10} time={5} 
            handleIndex={handleIndex}
            logo={Icono}
            shouldRotate={rotate}
        />
        {text && <img className="hand" src={Hand}/>}
        {text && <h1 className="text">¡Toca para jugar!</h1>}
        {button && 
            <Button title="Continuar" handleRouter={props.handleRouter} route={2} />
        }
    </div>
  )
}
