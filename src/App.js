import './App.css';
import StartScreen from './components/StartScreen';
import MidScreen from './components/MidScreen';
import EndScreen from './components/EndScreen';
import { useCallback, useEffect, useState } from 'react';
import { wordsList } from './data/words';

const stages = [
  {
    id: 1, name: "start"
  },
  {
    id: 2, name: "mid"
  },
  {
    id: 3, name: "end"
  }
]


function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);  // hook puxando o primeiro estágio do jogo
  const [words] = useState(wordsList); // Busca as palavras no arquivo words
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3); //Número de tentativas.
  const [score, setScore] = useState(0); // Pontuação

  const pickWordAndCategory = useCallback(() => {
    // Pick a random category
    const categories = Object.keys(words); // chaves do array de objetos
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]; // Pegando uma categoria aleatórios pelas chaves do array e pegando o tamanho com base no tamanho do array

    // Pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]; // Pegando uma palavra aleatória com base nas palavras da categoria selecionada

    return { word, category };
  }, [words])

  const startGame = useCallback (() => { // Start the game
    clearLetterStates();
    // pick word and category
    const { word, category } = pickWordAndCategory();

    // create an array of letters 
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);
   
     // stages -> o array de objetos, 1 -> posição, name -> o dado dentro do objeto do array que está sendo alterado
  }, [pickWordAndCategory])

  const toChangeToMidGame = () => {
    setGameStage(stages[1].name);
  }
  const verifyLetter = (letter) => { // Checks if the word contains the mentioned letters
    // setGameStage(stages[2].name);


    const normalizeLetter = letter.toLowerCase();
    if (guessedLetters.includes(normalizeLetter) || wrongLetters.includes(normalizeLetter)) {
      return;
    }
    if (letters.includes(normalizeLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizeLetter
      ])
    }
    else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizeLetter
      ])
      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }


  //checa se as tentativas acabaram  
  useEffect(() => {
    if (guesses <= 0) {

      setGameStage(stages[2].name);
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)] // transforma cada letra repetida em unica ??

    //Condição de vitória
    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => actualScore += 100);
      startGame();
      setGuessedLetters([])

    }
  
  }, [guessedLetters, letters, startGame])

  const restartGame = () => { // Checks if the word contains the mentioned letters
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
    clearLetterStates();
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} toChangeToMidGame={toChangeToMidGame} />}
      {gameStage === 'mid' &&
        <MidScreen
          verifyLetter={verifyLetter}
          hint={pickedCategory}
          selectedWord={pickedWord}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
      {gameStage === 'end' && <EndScreen
        restartGame={restartGame}
        score={score}

      />}
    </div>
  );
}

export default App;
