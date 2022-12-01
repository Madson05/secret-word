// css
import './App.css';



// react
import {useCallback, useEffect, useState} from "react"

// data
import {wordsList} from "./data/Words";

// components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

function App() {

  const [gameStage, setGameStage] = useState((stages[0].name))
  const [words] = useState(wordsList)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    

    return { category, word };
  }, [words]);

 
  //starts the secret word
  const startGame = useCallback(()=> {

    // clear all letter
    clearLettersStates()

    // pick work and pick category
    const { category, word } = pickWordAndCategory();

    

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // console.log(category, word);

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);


  //process the letter input 
  const verifyLetter = (letter)=>{
    const normalizedLetter = letter.toLowerCase()


    // check if letter has already been utilized
  if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
    return;
  }

  // push guessed letter or remove a guess
  if(letters.includes(normalizedLetter)){
    setGuessedLetters((actualGuessedLetters) =>[
      ...actualGuessedLetters, normalizedLetter
    ])
  }else{
    setWrongLetters((actualWrongLetters) =>[
      ...actualWrongLetters, normalizedLetter
    ])
    setGuesses((actualGuesses)=> actualGuesses-1
    )
  }
  
  };

  
    
  

  //reload the game
  const retry = ()=> {
    setScore(0)
    setGuesses(3)
    setGameStage(stages[0].name)
  }

  const clearLettersStates = () =>{
    setGuessedLetters([])
    setWrongLetters([])
  }

  
  // check if guesses ended

  useEffect(() => {
    if (guesses === 0) {
      // game over and reset all states
      clearLettersStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

    // check win condition

    useEffect(()=>{
      const uniqueLetters = [...new Set(letters)]

      if(guessedLetters.length === uniqueLetters.length && guessedLetters.length>0){
        setScore((actualScore)=> actualScore+=100)
        startGame()
      }

    }, [guessedLetters, letters, startGame])
  

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame = {startGame}/>}

      {gameStage === "game" && <Game verifyLetter = {verifyLetter} pickedWord = {pickedWord} pickedCategory = {pickedCategory} letters = {letters} guessedLetters = {guessedLetters} wrongLetters = {wrongLetters} guesses = {guesses} score = {score}/>}

      {gameStage === "end" && <GameOver retry = {retry} score = {score}/>}

    </div>
  );
}

export default App;
