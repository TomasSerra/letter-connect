import React from 'react'
import './Button.scss'

export default function Button(props) {
  return (
    <button onClick={()=>{props.handleRouter(props.route)}} className='Button'>
        {props.title}
    </button>
  )
}
