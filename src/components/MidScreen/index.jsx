import { useState, useRef } from 'react'
import './MidScreen.css'

const MidScreen = ({ verifyLetter, hint, selectedWord, letters, guessedLetters, wrongLetters, guesses, score }) => {

  const [letter, setLetter] = useState('');
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  }

  return (
    <div className='in-game-container'>
      <div className="game">
        <p className='points'>
          <span>Pontuação: {score}</span>
        </p>
      </div>
      <h1>Advinhe a palavra</h1>
      <h3 className='tip'>
        Dica: <span className='highlight'>{hint}</span>
      </h3>
      <p>Você ainda tem <span className="highlight">{guesses}</span> tentativa(s)</p>
      <div className="wordContainer">
        {letters.map((letter, i) => guessedLetters.includes(letter) ? ( //letter, i = letra e posicao
          <span className="letter" key={i}>{letter}</span>
        ) : (
          <span className="black-square" key={i}></span>
        )
        )}
      </div>
      <div className="letter-container">
        <p>Tente advinhar uma <span className="highlight">letra</span> da <span className="highlight">palavra</span></p>
        <form onSubmit={handleSubmit} className='letter-form'>
          <input
            type="text"
            name='letter'
            maxLength="1"
            required onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button className="check-letter">Tentar</button>
        </form>
      </div>
      <div className="wrong-letter-container">
        <p>Letras já utilizadas:</p>
        <div>
          <span>{guessedLetters}</span>
          {wrongLetters.map((letter, i) => (
            <span key={i}>{letter} - </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MidScreen
