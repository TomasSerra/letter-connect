import React from 'react'
import './EndPage.scss'
import ConfettiGenerator from "confetti-js";

import LogoBlanco from '../../img/logoBlanco.png'
import Copa from '../../img/cup.png'
import Medal from '../../img/medal.png'
import Button from '../../components/Button'

export default function InitialPage(props) {
    React.useEffect(() => {
        const time = 8; //Tiempo en segundos para pasar a la siguiente pantalla

        const confettiSettings = { target: 'page', size: '3', clock: '50' };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        setTimeout(()=>{
            props.handleRouter(0);
        }, time*1000)
        return () => confetti.clear();
        }, [])

    return (
    <div className='end-page'>
        <canvas id="page"></canvas>
        <div className="inner">
            <div className="container">
                <img className='logo' src={LogoBlanco} alt="nacion logo" />
                {props.correct >= 3 && <div className="lose-title">¡Excelente, <br/> sigue así!</div>}
                {props.correct >= 3 && <img className='cup' src={Copa} alt="cup" />}
                {props.correct < 3 && <div className="win-title">Muchas gracias por participar</div>}
                {props.correct < 3 && <img className='medal' src={Medal} alt="medal" />}
            </div>
        </div>
    </div>
  )
}