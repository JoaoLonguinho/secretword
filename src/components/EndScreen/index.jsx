import React from 'react'

const EndScreen = ({restartGame, score}) => {
  return (
    <div>
      <p>Fim de Jogo!</p>
      <h2>Pontuação: <span className='highlight'>{score}</span></h2>
      <button onClick={restartGame}>Reinicia o jogo</button>
    </div>
  )
}

export default EndScreen
