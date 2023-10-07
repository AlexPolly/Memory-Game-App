import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';




const CardImages =[
  { "src":"/image/helmet.png", matched: false },
  { "src":"/image/axe.png", matched: false },
  { "src":"/image/love.webp" , matched: false},
  { "src":"/image/ring.jpg", matched: false },
  { "src":"/image/sword.jpg", matched: false },
  { "src":"/image/sheild.jpg" , matched: false}
]



function App() {
  const [cards,setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)



  // suhffle 
  const shuffleCards = ()=>{
    const shuffledCards =[...CardImages,...CardImages]
    .sort(()=> Math.random() -0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) =>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() =>{
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            } else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards);

  // reset choices & increase turn 
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1 )
    setDisabled(false)
  }

  // start a new game automaticallyy!!
  useEffect(() =>{
    shuffleCards()
  }, [])
  
     

  return (
    <div className='main'>
      <div className='head' >
        <div class="sign">
      <span class="fast-flicker">M</span>emory &nbsp;<span class="flicker"> G</span>ame
         </div>
        <button onClick={shuffleCards} className='btn ps-5 pe-5  ms-5'>New Game</button>
        <img className='imgs' height={'80px'} width={'160px'} src="https://s3-us-west-2.amazonaws.com/sportshub2-uploads-prod/files/sites/5698/2023/06/26153429/ezgif.com-video-to-gif-3.gif" alt="" />
      </div>
      <div className='card-grid '>
        {cards.map(card =>(
         <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} />
        ))}
      </div>
      <div className='hturn'>
        <p  className='turns'> Turns : {turns}</p>
      </div>
    </div>
  );
}

export default App;
