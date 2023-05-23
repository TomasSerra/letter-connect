import React from 'react'
import './InitialPage.scss'

import LogoBlanco from '../../img/logoBlanco.png'
import Copa from '../../img/booksandcup.png'
import Button from '../../components/Button'

export default function InitialPage(props) {
  return (
    <div className='Initial'>
        <div className="inner">
            <div className="container">
                <img className='logo' src={LogoBlanco} alt="nacion logo" />
                <div className="welcome">¡Bienvenido!</div>
                <h3>¿Estás listo para demostrar cuánto sabes sobre <br/> el Banco Nación?</h3>
                <img className='cup' src={Copa} alt="cupandbooks" />
                <Button title={"EMPEZAR \t >"} handleRouter={props.handleRouter} route={1} />
            </div>
        </div>
    </div>
  )
}
