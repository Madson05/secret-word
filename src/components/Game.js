import "./Game.css"

const Game = ({verifyLetter, pickedWord, pickedcategory, letters, guessedLetters, wrongLetters, guesses, score}) => {
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedcategory}</span>
        <p>você ainda tem {guesses} tentativa(s)</p>
      </h3>

      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className="letter" key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
        </div>


      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra: </p>
        <form>
          <input type="text" name="letter" maxLength={1} required/>
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas</p>
        {
          wrongLetters.map((letter, i )=>(
            <span key={i}>{letter}, </span>
          ))
        }
      </div>
    </div>
  )
}

export default Game