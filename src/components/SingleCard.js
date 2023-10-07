import React from 'react'
import frnt from '../frontimg.jpg'
import './SingleCard.css'


function SingleCard({ card , handleChoice, flipped, disabled }) {
  const handleClick = () =>{
    if(!disabled){
      handleChoice(card)
    }
  }
  return (
    <div>
         <div className='card' >
            <div className={flipped ? "flipped" : ""}>
              <img  className='front' src={card.src} alt="card front" />
              <img className='back' src={frnt} alt="card back" onClick={handleClick} />
            </div>
          </div>
    </div>
  )
}

export default SingleCard